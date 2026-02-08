import slugify from "@sindresorhus/slugify";

const TR_LOCALE = "tr";

export function toRomanTurkishSlug(input: string): string {
  return slugify(input, {
    locale: TR_LOCALE,
    separator: "-",
    decamelize: false,
    lowercase: true,
  });
}

export function toTurkishSearchKey(input: string): string {
  return slugify(input, {
    locale: TR_LOCALE,
    separator: " ",
    decamelize: false,
    lowercase: true,
  })
    .replace(/\s+/g, " ")
    .trim();
}

export function toCompactTurkishSearchKey(input: string): string {
  return toTurkishSearchKey(input).replace(/[^a-z0-9]/g, "");
}

export function turkishIncludes(haystack: string, needle: string): boolean {
  const normalizedNeedle = toTurkishSearchKey(needle);
  if (!normalizedNeedle) return true;
  return toTurkishSearchKey(haystack).includes(normalizedNeedle);
}
