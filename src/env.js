import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const isProd = process.env.NODE_ENV === "production";
const defaultPlaceholders = isProd ? "false" : "true";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    AUTH_SECRET:
      process.env.NODE_ENV === "production"
        ? z.string()
        : z.string().optional(),
    AUTH_TRUST_HOST: z
      .enum(["true", "false"])
      .optional()
      .transform((value) => value === "true"),
    DATABASE_URL: isProd
      ? z.string().url()
      : z
          .string()
          .url()
          .default(
            "postgresql://user:password@localhost:5432/kinali-placeholder?schema=public"
          ),
    DATABASE_DIRECT_URL: isProd
      ? z.string().url()
      : z
          .string()
          .url()
          .default(
            "postgresql://user:password@localhost:5432/kinali-placeholder?schema=public"
          ),
    UPLOADTHING_TOKEN: isProd
      ? z.string().min(1)
      : z.string().optional(),
    USE_PLACEHOLDERS: z
      .enum(["true", "false"])
      .default(defaultPlaceholders)
      .transform((value) => value === "true"),
    ADMIN_SEED_EMAIL: z.string().email().optional(),
    ADMIN_SEED_PASSWORD: z.string().min(8).optional(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_WHATSAPP_NUMBER: z.string().optional(),
    NEXT_PUBLIC_CALL_NUMBER: z.string().optional(),
    NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    AUTH_SECRET: process.env.AUTH_SECRET,
    AUTH_TRUST_HOST: process.env.AUTH_TRUST_HOST,
    DATABASE_URL: process.env.DATABASE_URL,
    DATABASE_DIRECT_URL:
      process.env.DATABASE_DIRECT_URL ?? process.env.DATABASE_URL,
    UPLOADTHING_TOKEN: process.env.UPLOADTHING_TOKEN,
    USE_PLACEHOLDERS: process.env.USE_PLACEHOLDERS ?? defaultPlaceholders,
    ADMIN_SEED_EMAIL: process.env.ADMIN_SEED_EMAIL,
    ADMIN_SEED_PASSWORD: process.env.ADMIN_SEED_PASSWORD,
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_WHATSAPP_NUMBER: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
    NEXT_PUBLIC_CALL_NUMBER: process.env.NEXT_PUBLIC_CALL_NUMBER,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});
