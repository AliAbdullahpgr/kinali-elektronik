import { toCompactTurkishSearchKey } from "~/lib/turkish";

export function normalizeProductCode(input: string) {
  return toCompactTurkishSearchKey(input);
}

export function normalizeSearchText(input: string) {
  return toCompactTurkishSearchKey(input);
}
