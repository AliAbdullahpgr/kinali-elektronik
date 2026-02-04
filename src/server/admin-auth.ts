export const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "";
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "";
export const ADMIN_COOKIE_NAME = "kinali_admin_session";
export const ADMIN_COOKIE_VALUE = "kinali_admin_ok";

export function verifyAdminCredentials(email: string, password: string) {
  return email === ADMIN_EMAIL && password === ADMIN_PASSWORD;
}

export function isAdminCookieValid(value?: string) {
  return value === ADMIN_COOKIE_VALUE;
}

export function getAdminCookieFromHeader(cookieHeader: string | null) {
  if (!cookieHeader) return undefined;
  const parts = cookieHeader.split(";").map((part) => part.trim());
  const match = parts.find((part) => part.startsWith(`${ADMIN_COOKIE_NAME}=`));
  if (!match) return undefined;
  return match.slice(ADMIN_COOKIE_NAME.length + 1);
}
