export function normalizeProductCode(input: string) {
  return input.replace(/[-_\s]+/g, "").toLowerCase().trim();
}
