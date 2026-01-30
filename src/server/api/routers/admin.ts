import { createTRPCRouter, adminProcedure } from "~/server/api/trpc";
import { env } from "~/env";
import { placeholderCategories, placeholderFeaturedProducts, placeholderProducts } from "~/server/utils/placeholders";

const usePlaceholderData = env.USE_PLACEHOLDERS;

export const adminRouter = createTRPCRouter({
  stats: adminProcedure.query(async ({ ctx }) => {
    if (usePlaceholderData) {
      return {
        productCount: placeholderProducts.length,
        categoryCount: placeholderCategories.length,
        featuredCount: placeholderFeaturedProducts.length,
      };
    }
    const [productCount, categoryCount, featuredCount] = await Promise.all([
      ctx.db.product.count(),
      ctx.db.category.count(),
      ctx.db.product.count({ where: { isFeatured: true } }),
    ]);

    return {
      productCount,
      categoryCount,
      featuredCount,
    };
  }),
});
