import { env } from "~/env";
import { db } from "~/server/db";
import { placeholderCategories, placeholderProducts } from "~/server/utils/placeholders";

export default async function sitemap() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://kinali-elektronik.vercel.app";

  const usePlaceholderData = env.USE_PLACEHOLDERS;
  const [categories, products] = usePlaceholderData
    ? [placeholderCategories, placeholderProducts]
    : await Promise.all([
        db.category.findMany({ select: { slug: true, updatedAt: true } }),
        db.product.findMany({ select: { slug: true, updatedAt: true } }),
      ]);

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
    },
    ...categories.map((category) => ({
      url: `${baseUrl}/kategori/${category.slug}`,
      lastModified: category.updatedAt,
    })),
    ...products.map((product) => ({
      url: `${baseUrl}/urun/${product.slug}`,
      lastModified: product.updatedAt,
    })),
  ];
}
