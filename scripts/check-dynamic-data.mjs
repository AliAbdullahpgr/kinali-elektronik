import { PrismaClient, RedirectEntityType } from "@prisma/client";
import slugify from "@sindresorhus/slugify";

const prisma = new PrismaClient();

function toRomanTurkishSlug(input = "") {
  return slugify(input, {
    locale: "tr",
    separator: "-",
    decamelize: false,
    lowercase: true,
  });
}

function toCompactTurkishSearchKey(input = "") {
  return slugify(input, {
    locale: "tr",
    separator: " ",
    decamelize: false,
    lowercase: true,
  }).replace(/[^a-z0-9]/g, "");
}

function isBlank(value) {
  return !value || value.trim().length === 0;
}

function isValidHttpUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function createIssueCollector() {
  const issues = [];

  return {
    all: issues,
    error(code, message, details = {}) {
      issues.push({ level: "ERROR", code, message, details });
    },
    warning(code, message, details = {}) {
      issues.push({ level: "WARN", code, message, details });
    },
  };
}

function formatDetails(details) {
  const parts = Object.entries(details)
    .filter(([, value]) => value !== undefined && value !== null && value !== "")
    .map(([key, value]) => `${key}=${String(value)}`);
  return parts.length > 0 ? ` (${parts.join(", ")})` : "";
}

function printIssue(issue) {
  console.log(
    `[${issue.level}] ${issue.code}: ${issue.message}${formatDetails(issue.details)}`
  );
}

function detectRedirectCycles(entityType, redirects, addIssue) {
  const graph = new Map();
  for (const redirect of redirects) {
    if (redirect.entityType !== entityType) continue;
    graph.set(redirect.fromSlug, redirect.toSlug);
  }

  const visiting = new Set();
  const visited = new Set();

  function walk(node, path) {
    if (visiting.has(node)) {
      const cycleStart = path.indexOf(node);
      const cyclePath = cycleStart >= 0 ? path.slice(cycleStart).concat(node) : [node];
      addIssue(
        "REDIRECT_CYCLE",
        `${entityType} redirect cycle found`,
        { path: cyclePath.join(" -> ") }
      );
      return;
    }

    if (visited.has(node)) return;
    visiting.add(node);

    const next = graph.get(node);
    if (next) walk(next, [...path, next]);

    visiting.delete(node);
    visited.add(node);
  }

  for (const fromSlug of graph.keys()) {
    walk(fromSlug, [fromSlug]);
  }
}

function detectRedirectChains(entityType, redirects, addIssue) {
  const graph = new Map();
  for (const redirect of redirects) {
    if (redirect.entityType !== entityType) continue;
    graph.set(redirect.fromSlug, redirect.toSlug);
  }

  for (const [fromSlug, toSlug] of graph.entries()) {
    const secondHop = graph.get(toSlug);
    if (secondHop) {
      addIssue(
        "REDIRECT_CHAIN",
        `${entityType} redirect chain detected`,
        { fromSlug, toSlug, nextHop: secondHop }
      );
    }
  }
}

async function main() {
  const issues = createIssueCollector();

  const [adminUsers, categories, products, images, redirects] = await Promise.all([
    prisma.adminUser.findMany({
      select: { id: true, email: true, name: true },
    }),
    prisma.category.findMany({
      select: { id: true, name: true, slug: true },
    }),
    prisma.product.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        price: true,
        currency: true,
        productCode: true,
        normalizedProductCode: true,
        searchNormalized: true,
        brand: true,
        categoryId: true,
      },
    }),
    prisma.productImage.findMany({
      select: { id: true, productId: true, url: true, position: true },
    }),
    prisma.slugRedirect.findMany({
      select: {
        id: true,
        entityType: true,
        fromSlug: true,
        toSlug: true,
      },
    }),
  ]);

  const categoryIds = new Set(categories.map((category) => category.id));
  const productIds = new Set(products.map((product) => product.id));
  const categorySlugs = new Set(categories.map((category) => category.slug));
  const productSlugs = new Set(products.map((product) => product.slug));
  const productCodeCounts = new Map();

  for (const admin of adminUsers) {
    if (isBlank(admin.name)) {
      issues.error("ADMIN_NAME_EMPTY", "Admin user has empty name", { id: admin.id });
    }
    if (isBlank(admin.email) || !admin.email.includes("@")) {
      issues.error("ADMIN_EMAIL_INVALID", "Admin user has invalid email", {
        id: admin.id,
        email: admin.email,
      });
    }
  }

  for (const category of categories) {
    if (isBlank(category.name)) {
      issues.error("CATEGORY_NAME_EMPTY", "Category name is empty", { id: category.id });
    }
    if (isBlank(category.slug)) {
      issues.error("CATEGORY_SLUG_EMPTY", "Category slug is empty", { id: category.id });
      continue;
    }

    const expectedSlug = toRomanTurkishSlug(category.slug);
    if (expectedSlug !== category.slug) {
      issues.warning("CATEGORY_SLUG_NON_CANONICAL", "Category slug is not canonical", {
        id: category.id,
        slug: category.slug,
        expected: expectedSlug,
      });
    }
  }

  for (const product of products) {
    if (isBlank(product.title)) {
      issues.error("PRODUCT_TITLE_EMPTY", "Product title is empty", { id: product.id });
    }
    if (isBlank(product.slug)) {
      issues.error("PRODUCT_SLUG_EMPTY", "Product slug is empty", { id: product.id });
      continue;
    }

    const expectedSlug = toRomanTurkishSlug(product.slug);
    if (expectedSlug !== product.slug) {
      issues.warning("PRODUCT_SLUG_NON_CANONICAL", "Product slug is not canonical", {
        id: product.id,
        slug: product.slug,
        expected: expectedSlug,
      });
    }

    const expectedCode = toCompactTurkishSearchKey(product.productCode);
    if (product.normalizedProductCode !== expectedCode) {
      issues.error(
        "PRODUCT_CODE_NORMALIZATION_MISMATCH",
        "normalizedProductCode does not match normalized productCode",
        {
          id: product.id,
          actual: product.normalizedProductCode,
          expected: expectedCode,
        }
      );
    }

    const expectedSearch = toCompactTurkishSearchKey(
      `${product.title} ${product.productCode} ${product.brand ?? ""}`
    );
    if (product.searchNormalized !== expectedSearch) {
      issues.error(
        "PRODUCT_SEARCH_NORMALIZATION_MISMATCH",
        "searchNormalized does not match expected normalized search content",
        {
          id: product.id,
          actual: product.searchNormalized,
          expected: expectedSearch,
        }
      );
    }

    const normalizedCode = product.normalizedProductCode || "";
    productCodeCounts.set(normalizedCode, (productCodeCounts.get(normalizedCode) ?? 0) + 1);

    if (!categoryIds.has(product.categoryId)) {
      issues.error("PRODUCT_ORPHAN_CATEGORY", "Product references missing category", {
        id: product.id,
        categoryId: product.categoryId,
      });
    }

    const numericPrice = Number(product.price);
    if (!Number.isFinite(numericPrice) || numericPrice < 0) {
      issues.error("PRODUCT_PRICE_INVALID", "Product has invalid price", {
        id: product.id,
        price: String(product.price),
      });
    }

    if (isBlank(product.currency)) {
      issues.warning("PRODUCT_CURRENCY_EMPTY", "Product currency is empty", { id: product.id });
    }
  }

  for (const [normalizedCode, count] of productCodeCounts.entries()) {
    if (normalizedCode && count > 1) {
      issues.warning("PRODUCT_CODE_DUPLICATE_NORMALIZED", "Duplicate normalized product code", {
        normalizedCode,
        count,
      });
    }
  }

  for (const image of images) {
    if (!productIds.has(image.productId)) {
      issues.error("IMAGE_ORPHAN_PRODUCT", "Product image references missing product", {
        id: image.id,
        productId: image.productId,
      });
    }

    if (isBlank(image.url)) {
      issues.error("IMAGE_URL_EMPTY", "Product image URL is empty", { id: image.id });
      continue;
    }

    if (!isValidHttpUrl(image.url)) {
      issues.warning("IMAGE_URL_NOT_HTTP", "Product image URL is not HTTP/HTTPS", {
        id: image.id,
        url: image.url,
      });
    }
  }

  for (const redirect of redirects) {
    if (isBlank(redirect.fromSlug) || isBlank(redirect.toSlug)) {
      issues.error("REDIRECT_SLUG_EMPTY", "Redirect has empty slug values", {
        id: redirect.id,
      });
      continue;
    }

    if (redirect.fromSlug === redirect.toSlug) {
      issues.error("REDIRECT_SELF_LOOP", "Redirect fromSlug and toSlug are identical", {
        id: redirect.id,
        slug: redirect.fromSlug,
      });
    }

    const canonicalFrom = toRomanTurkishSlug(redirect.fromSlug);
    if (canonicalFrom !== redirect.fromSlug) {
      issues.warning("REDIRECT_FROM_NON_CANONICAL", "Redirect fromSlug is not canonical", {
        id: redirect.id,
        fromSlug: redirect.fromSlug,
        expected: canonicalFrom,
      });
    }

    const canonicalTo = toRomanTurkishSlug(redirect.toSlug);
    if (canonicalTo !== redirect.toSlug) {
      issues.warning("REDIRECT_TO_NON_CANONICAL", "Redirect toSlug is not canonical", {
        id: redirect.id,
        toSlug: redirect.toSlug,
        expected: canonicalTo,
      });
    }

    const slugSet =
      redirect.entityType === RedirectEntityType.PRODUCT ? productSlugs : categorySlugs;
    if (!slugSet.has(redirect.toSlug)) {
      issues.error("REDIRECT_TARGET_MISSING", "Redirect target slug does not exist", {
        id: redirect.id,
        entityType: redirect.entityType,
        toSlug: redirect.toSlug,
      });
    }
  }

  detectRedirectCycles(RedirectEntityType.PRODUCT, redirects, (code, message, details) =>
    issues.error(code, message, details)
  );
  detectRedirectCycles(RedirectEntityType.CATEGORY, redirects, (code, message, details) =>
    issues.error(code, message, details)
  );
  detectRedirectChains(RedirectEntityType.PRODUCT, redirects, (code, message, details) =>
    issues.warning(code, message, details)
  );
  detectRedirectChains(RedirectEntityType.CATEGORY, redirects, (code, message, details) =>
    issues.warning(code, message, details)
  );

  console.log("Dynamic data check summary");
  console.log("--------------------------");
  console.log(`Admin users: ${adminUsers.length}`);
  console.log(`Categories: ${categories.length}`);
  console.log(`Products: ${products.length}`);
  console.log(`Product images: ${images.length}`);
  console.log(`Slug redirects: ${redirects.length}`);
  console.log("");

  const errors = issues.all.filter((issue) => issue.level === "ERROR");
  const warnings = issues.all.filter((issue) => issue.level === "WARN");

  if (issues.all.length === 0) {
    console.log("No issues found.");
    return;
  }

  if (errors.length > 0) {
    console.log("Errors:");
    for (const issue of errors) printIssue(issue);
    console.log("");
  }

  if (warnings.length > 0) {
    console.log("Warnings:");
    for (const issue of warnings) printIssue(issue);
    console.log("");
  }

  console.log(`Total issues: ${issues.all.length} (errors: ${errors.length}, warnings: ${warnings.length})`);

  if (errors.length > 0) {
    process.exitCode = 1;
  }
}

main()
  .catch((error) => {
    console.error("Dynamic data check failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
