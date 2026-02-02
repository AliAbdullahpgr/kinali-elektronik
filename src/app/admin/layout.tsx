import Link from "next/link";
import { cookies } from "next/headers";

import { ADMIN_COOKIE_NAME, ADMIN_EMAIL, isAdminCookieValid } from "~/server/admin-auth";
import { LogoutButton } from "./_components/logout-button";

export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  const isAdmin = isAdminCookieValid(cookieValue);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {isAdmin && (
        <header className="border-b border-gray-200 bg-white">
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-2 px-3 py-3 sm:px-4 sm:py-4">
            <div className="flex items-center gap-3 sm:gap-6">
              <Link href="/admin" className="text-base font-semibold text-gray-900 sm:text-lg">
                Admin Panel
              </Link>
              <nav className="flex gap-3 sm:gap-4">
                <Link
                  href="/admin/products"
                  className="text-sm text-gray-600 transition hover:text-gray-900"
                >
                  Ürünler
                </Link>
              </nav>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <span className="hidden text-sm text-gray-500 sm:inline">
                {ADMIN_EMAIL}
              </span>
              <LogoutButton />
            </div>
          </div>
        </header>
      )}
      {children}
    </div>
  );
}
