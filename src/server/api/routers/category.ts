import { z } from "zod";

import { adminProcedure, createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { env } from "~/env";
import { placeholderCategories } from "~/server/utils/placeholders";

const usePlaceholderData = env.USE_PLACEHOLDERS;

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
  create: adminProcedure
    .input(
      z.object({
        name: z.string().min(2),
        slug: z.string().min(2),
        imageUrl: z.string().url().optional().nullable(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.category.create({
        data: {
          name: input.name,
          slug: input.slug,
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
      return ctx.db.category.update({
        where: { id: input.id },
        data: {
          name: input.name,
          slug: input.slug,
          imageUrl: input.imageUrl ?? null,
        },
      });
    }),
  remove: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.category.delete({
        where: { id: input.id },
      });
    }),
});
