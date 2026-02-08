import { PrismaClient, RedirectEntityType } from "@prisma/client";
import slugify from "@sindresorhus/slugify";

const prisma = new PrismaClient();

function toRomanTurkishSlug(input) {
  return slugify(input, {
    locale: "tr",
    separator: "-",
    decamelize: false,
    lowercase: true,
  });
}

function toCompactTurkishSearchKey(input) {
  return slugify(input ?? "", {
    locale: "tr",
    separator: " ",
    decamelize: false,
    lowercase: true,
  }).replace(/[^a-z0-9]/g, "");
}

function ensureUniqueSlug(baseSlug, usedSlugs) {
  const safeBase = baseSlug || "kayit";
  if (!usedSlugs.has(safeBase)) return safeBase;
  let index = 2;
  while (usedSlugs.has(`${safeBase}-${index}`)) {
    index += 1;
  }
  return `${safeBase}-${index}`;
}

async function upsertRedirect(entityType, fromSlug, toSlug) {
  if (!fromSlug || !toSlug || fromSlug === toSlug) return;
  await prisma.slugRedirect.upsert({
    where: {
      entityType_fromSlug: {
        entityType,
        fromSlug,
      },
    },
    update: {
      toSlug,
    },
    create: {
      entityType,
      fromSlug,
      toSlug,
    },
  });
}

async function backfillCategories() {
  const categories = await prisma.category.findMany({
    select: { id: true, slug: true, name: true },
    orderBy: { createdAt: "asc" },
  });
  const usedSlugs = new Set(categories.map((category) => category.slug));

  for (const category of categories) {
    const normalizedBase =
      toRomanTurkishSlug(category.slug || category.name) || "kategori";
    usedSlugs.delete(category.slug);
    const finalSlug = ensureUniqueSlug(normalizedBase, usedSlugs);
    usedSlugs.add(finalSlug);

    if (category.slug !== finalSlug) {
      await prisma.category.update({
        where: { id: category.id },
        data: { slug: finalSlug },
      });
      await upsertRedirect(
        RedirectEntityType.CATEGORY,
        category.slug,
        finalSlug
      );
    }
  }
}

async function backfillProducts() {
  const products = await prisma.product.findMany({
    select: {
      id: true,
      title: true,
      slug: true,
      productCode: true,
      brand: true,
    },
    orderBy: { createdAt: "asc" },
  });
  const usedSlugs = new Set(products.map((product) => product.slug));

  for (const product of products) {
    const normalizedBase = toRomanTurkishSlug(product.slug || product.title) || "urun";
    usedSlugs.delete(product.slug);
    const finalSlug = ensureUniqueSlug(normalizedBase, usedSlugs);
    usedSlugs.add(finalSlug);

    const normalizedProductCode = toCompactTurkishSearchKey(product.productCode);
    const searchNormalized = toCompactTurkishSearchKey(
      `${product.title} ${product.productCode} ${product.brand ?? ""}`
    );

    await prisma.product.update({
      where: { id: product.id },
      data: {
        slug: finalSlug,
        normalizedProductCode,
        searchNormalized,
      },
    });

    if (product.slug !== finalSlug) {
      await upsertRedirect(RedirectEntityType.PRODUCT, product.slug, finalSlug);
    }
  }
}

async function main() {
  console.log("Türkçe normalizasyon backfill başlatıldı...");
  await backfillCategories();
  await backfillProducts();
  console.log("Türkçe normalizasyon backfill tamamlandı.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
