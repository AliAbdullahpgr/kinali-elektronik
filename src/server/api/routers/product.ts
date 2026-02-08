import { z } from "zod";
import { RedirectEntityType } from "@prisma/client";

import { adminProcedure, createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { toRomanTurkishSlug } from "~/lib/turkish";
import { normalizeProductCode, normalizeSearchText } from "~/server/utils/normalize";
import { env } from "~/env";
import {
  placeholderAdminProducts,
  placeholderFeaturedProducts,
  placeholderProducts,
  placeholderProductBySlug,
  placeholderProductsByCategory,
  placeholderSearchProducts,
} from "~/server/utils/placeholders";

const usePlaceholderData = env.USE_PLACEHOLDERS;

const ensureUniqueProductSlug = async (
  db: {
    product: {
      findFirst: (...args: any[]) => Promise<{ id: string } | null>;
    };
  },
  desiredSlug: string,
  excludeId?: string
) => {
  const baseSlug = toRomanTurkishSlug(desiredSlug || "urun") || "urun";
  let candidate = baseSlug;
  let suffix = 2;

  while (
    await db.product.findFirst({
      where: {
        slug: candidate,
        ...(excludeId ? { NOT: { id: excludeId } } : {}),
      },
      select: { id: true },
    })
  ) {
    candidate = `${baseSlug}-${suffix}`;
    suffix += 1;
  }

  return candidate;
};

const productSelect = {
  id: true,
  title: true,
  slug: true,
  description: true,
  price: true,
  currency: true,
  productCode: true,
  normalizedProductCode: true,
  searchNormalized: true,
  brand: true,
  condition: true,
  isFeatured: true,
  isActive: true,
  categoryId: true,
  createdAt: true,
  updatedAt: true,
};

export const productRouter = createTRPCRouter({
  featured: publicProcedure.query(async ({ ctx }) => {
    if (usePlaceholderData) {
      return placeholderFeaturedProducts;
    }
    return ctx.db.product.findMany({
      where: { isFeatured: true, isActive: true },
      orderBy: { updatedAt: "desc" },
      include: {
        images: { orderBy: { position: "asc" }, take: 1 },
        category: true,
      },
      take: 8,
    });
  }),
  listAll: publicProcedure.query(async ({ ctx }) => {
    if (usePlaceholderData) {
      return placeholderProducts.filter((product) => product.isActive);
    }
    return ctx.db.product.findMany({
      where: { isActive: true },
      include: {
        images: { orderBy: { position: "asc" }, take: 1 },
        category: true,
      },
      orderBy: { updatedAt: "desc" },
    });
  }),
  listByCategory: publicProcedure
    .input(
      z.object({
        slug: z.string(),
        brand: z.string().optional(),
        condition: z.string().optional(),
        minPrice: z.number().optional(),
        maxPrice: z.number().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      if (usePlaceholderData) {
        return placeholderProductsByCategory(input.slug);
      }
      return ctx.db.product.findMany({
        where: {
          isActive: true,
          category: { slug: input.slug },
          brand: input.brand ? { equals: input.brand } : undefined,
          condition: input.condition ? { equals: input.condition } : undefined,
          price: {
            gte: input.minPrice,
            lte: input.maxPrice,
          },
        },
        include: {
          images: { orderBy: { position: "asc" }, take: 1 },
        },
        orderBy: { updatedAt: "desc" },
      });
    }),
  bySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      if (usePlaceholderData) {
        return placeholderProductBySlug(input.slug);
      }
      return ctx.db.product.findUnique({
        where: { slug: input.slug },
        include: {
          images: { orderBy: { position: "asc" } },
          category: true,
        },
      });
    }),
  resolveBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      if (usePlaceholderData) {
        return {
          product: placeholderProductBySlug(input.slug),
          redirectTo: null as string | null,
        };
      }

      const directProduct = await ctx.db.product.findUnique({
        where: { slug: input.slug },
        include: {
          images: { orderBy: { position: "asc" } },
          category: true,
        },
      });
      if (directProduct) {
        return { product: directProduct, redirectTo: null as string | null };
      }

      const redirect = await ctx.db.slugRedirect.findUnique({
        where: {
          entityType_fromSlug: {
            entityType: RedirectEntityType.PRODUCT,
            fromSlug: input.slug,
          },
        },
      });
      if (!redirect) {
        return { product: null, redirectTo: null as string | null };
      }

      const redirectedProduct = await ctx.db.product.findUnique({
        where: { slug: redirect.toSlug },
        include: {
          images: { orderBy: { position: "asc" } },
          category: true,
        },
      });
      return {
        product: redirectedProduct,
        redirectTo: redirectedProduct ? redirect.toSlug : null,
      };
    }),
  search: publicProcedure
    .input(
      z.object({
        query: z.string().min(1),
        categorySlug: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const normalizedCode = normalizeProductCode(input.query);
      const normalizedSearch = normalizeSearchText(input.query);
      const searchClauses = [];
      if (normalizedSearch) {
        searchClauses.push({ searchNormalized: { contains: normalizedSearch } });
      }
      if (normalizedCode) {
        searchClauses.push({ normalizedProductCode: { contains: normalizedCode } });
      }

      if (usePlaceholderData) {
        return placeholderSearchProducts(input.query, input.categorySlug);
      }

      return ctx.db.product.findMany({
        where: {
          isActive: true,
          category: input.categorySlug
            ? { slug: input.categorySlug }
            : undefined,
          OR: searchClauses.length
            ? searchClauses
            : [{ title: { contains: input.query, mode: "insensitive" } }],
        },
        include: {
          images: { orderBy: { position: "asc" }, take: 1 },
          category: true,
        },
        orderBy: { updatedAt: "desc" },
        take: 24,
      });
    }),
  adminList: adminProcedure.query(async ({ ctx }) => {
    if (usePlaceholderData) {
      return placeholderAdminProducts();
    }
    return ctx.db.product.findMany({
      include: {
        images: { orderBy: { position: "asc" }, take: 1 },
        category: true,
      },
      orderBy: { updatedAt: "desc" },
    });
  }),
  byId: adminProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.product.findUnique({
        where: { id: input.id },
        include: {
          images: { orderBy: { position: "asc" } },
          category: true,
        },
      });
    }),
  create: adminProcedure
    .input(
      z.object({
        title: z.string().min(2),
        slug: z.string().min(2),
        description: z.string().optional().nullable(),
        price: z.number().min(0),
        productCode: z.string().min(2),
        brand: z.string().optional().nullable(),
        condition: z.string().optional().nullable(),
        isFeatured: z.boolean().optional(),
        isActive: z.boolean().optional(),
        categoryId: z.string(),
        images: z
          .array(
            z.object({
              url: z.string().url(),
              alt: z.string().optional().nullable(),
              position: z.number().int(),
              width: z.number().int().optional().nullable(),
              height: z.number().int().optional().nullable(),
            })
          )
          .optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const normalized = normalizeProductCode(input.productCode);
      const searchNormalized = normalizeSearchText(
        `${input.title} ${input.productCode} ${input.brand ?? ""}`
      );
      const slug = await ensureUniqueProductSlug(ctx.db, input.slug);
      return ctx.db.product.create({
        data: {
          title: input.title,
          slug,
          description: input.description ?? null,
          price: input.price,
          productCode: input.productCode,
          normalizedProductCode: normalized,
          searchNormalized,
          brand: input.brand ?? null,
          condition: input.condition ?? null,
          isFeatured: input.isFeatured ?? false,
          isActive: input.isActive ?? true,
          categoryId: input.categoryId,
          images: input.images
            ? {
                create: input.images.map((image) => ({
                  url: image.url,
                  alt: image.alt ?? null,
                  position: image.position,
                  width: image.width ?? null,
                  height: image.height ?? null,
                })),
              }
            : undefined,
        },
        select: productSelect,
      });
    }),
  update: adminProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().min(2),
        slug: z.string().min(2),
        description: z.string().optional().nullable(),
        price: z.number().min(0),
        productCode: z.string().min(2),
        brand: z.string().optional().nullable(),
        condition: z.string().optional().nullable(),
        isFeatured: z.boolean().optional(),
        isActive: z.boolean().optional(),
        categoryId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const normalized = normalizeProductCode(input.productCode);
      const searchNormalized = normalizeSearchText(
        `${input.title} ${input.productCode} ${input.brand ?? ""}`
      );
      const slug = await ensureUniqueProductSlug(ctx.db, input.slug, input.id);
      const previous = await ctx.db.product.findUnique({
        where: { id: input.id },
        select: { slug: true },
      });

      const updated = await ctx.db.product.update({
        where: { id: input.id },
        data: {
          title: input.title,
          slug,
          description: input.description ?? null,
          price: input.price,
          productCode: input.productCode,
          normalizedProductCode: normalized,
          searchNormalized,
          brand: input.brand ?? null,
          condition: input.condition ?? null,
          isFeatured: input.isFeatured ?? false,
          isActive: input.isActive ?? true,
          categoryId: input.categoryId,
        },
        select: productSelect,
      });

      if (previous && previous.slug !== slug) {
        await ctx.db.slugRedirect.upsert({
          where: {
            entityType_fromSlug: {
              entityType: RedirectEntityType.PRODUCT,
              fromSlug: previous.slug,
            },
          },
          update: { toSlug: slug },
          create: {
            entityType: RedirectEntityType.PRODUCT,
            fromSlug: previous.slug,
            toSlug: slug,
          },
        });
      }

      return updated;
    }),
  remove: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.product.delete({ where: { id: input.id } });
    }),
  reorderImages: adminProcedure
    .input(
      z.object({
        productId: z.string(),
        images: z.array(
          z.object({
            id: z.string(),
            position: z.number().int(),
          })
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await Promise.all(
        input.images.map((image) =>
          ctx.db.productImage.update({
            where: { id: image.id },
            data: { position: image.position },
          })
        )
      );

      return { ok: true };
    }),
});
