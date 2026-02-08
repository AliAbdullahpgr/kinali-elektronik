import { z } from "zod";
import { RedirectEntityType } from "@prisma/client";

import { adminProcedure, createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { env } from "~/env";
import { placeholderCategories } from "~/server/utils/placeholders";
import { toRomanTurkishSlug } from "~/lib/turkish";

const usePlaceholderData = env.USE_PLACEHOLDERS;

const ensureUniqueCategorySlug = async (
  db: {
    category: {
      findFirst: (...args: any[]) => Promise<{ id: string } | null>;
    };
  },
  desiredSlug: string,
  excludeId?: string
) => {
  const baseSlug = toRomanTurkishSlug(desiredSlug || "kategori") || "kategori";
  let candidate = baseSlug;
  let suffix = 2;

  while (
    await db.category.findFirst({
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

export const categoryRouter = createTRPCRouter({
  list: publicProcedure.query(async ({ ctx }) => {
    if (usePlaceholderData) {
      return placeholderCategories;
    }
    return ctx.db.category.findMany({
      orderBy: { name: "asc" },
    });
  }),
  bySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      if (usePlaceholderData) {
        return (
          placeholderCategories.find((category) => category.slug === input.slug) ??
          null
        );
      }
      return ctx.db.category.findUnique({
        where: { slug: input.slug },
      });
    }),
  resolveBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      if (usePlaceholderData) {
        return {
          category:
            placeholderCategories.find((category) => category.slug === input.slug) ??
            null,
          redirectTo: null as string | null,
        };
      }

      const directCategory = await ctx.db.category.findUnique({
        where: { slug: input.slug },
      });
      if (directCategory) {
        return { category: directCategory, redirectTo: null as string | null };
      }

      const redirect = await ctx.db.slugRedirect.findUnique({
        where: {
          entityType_fromSlug: {
            entityType: RedirectEntityType.CATEGORY,
            fromSlug: input.slug,
          },
        },
      });
      if (!redirect) {
        return { category: null, redirectTo: null as string | null };
      }

      const redirectedCategory = await ctx.db.category.findUnique({
        where: { slug: redirect.toSlug },
      });
      return {
        category: redirectedCategory,
        redirectTo: redirectedCategory ? redirect.toSlug : null,
      };
    }),
  create: adminProcedure
    .input(
      z.object({
        name: z.string().min(2),
        slug: z.string().min(2),
        imageUrl: z.string().url().optional().nullable(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const slug = await ensureUniqueCategorySlug(ctx.db, input.slug);
      return ctx.db.category.create({
        data: {
          name: input.name,
          slug,
          imageUrl: input.imageUrl ?? null,
        },
      });
    }),
  update: adminProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(2),
        slug: z.string().min(2),
        imageUrl: z.string().url().optional().nullable(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const previous = await ctx.db.category.findUnique({
        where: { id: input.id },
        select: { slug: true },
      });
      const slug = await ensureUniqueCategorySlug(ctx.db, input.slug, input.id);
      const updated = await ctx.db.category.update({
        where: { id: input.id },
        data: {
          name: input.name,
          slug,
          imageUrl: input.imageUrl ?? null,
        },
      });

      if (previous && previous.slug !== slug) {
        await ctx.db.slugRedirect.upsert({
          where: {
            entityType_fromSlug: {
              entityType: RedirectEntityType.CATEGORY,
              fromSlug: previous.slug,
            },
          },
          update: { toSlug: slug },
          create: {
            entityType: RedirectEntityType.CATEGORY,
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
      return ctx.db.category.delete({
        where: { id: input.id },
      });
    }),
});
