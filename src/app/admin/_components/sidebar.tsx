"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    title: "Ana Men",
    items: [
      {
        label: "Dashboard",
        href: "/admin",
        icon: (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        ),
      },
    ],
  },
  {
    title: "rn Ynetimi",
    items: [
      {
        label: "Tm rnler",
        href: "/admin/products",
        icon: (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        ),
      },
      {
        label: "Yeni rn Ekle",
        href: "/admin/products/new",
        icon: (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
          </svg>
        ),
      },
      {
        label: "Kategoriler",
        href: "/admin/categories",
        icon: (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
        ),
      },
    ],
  },
  {
    title: "erik",
    items: [
      {
        label: "ne kanlar",
        href: "/admin/featured",
        icon: (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        ),
      },
      {
        label: "Medya Ktphanesi",
        href: "/admin/media",
        icon: (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        ),
      },
    ],
  },
  {
    title: "Sistem",
    items: [
      {
        label: "Ayarlar",
        href: "/admin/settings",
        icon: (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        ),
      },
      {
        label: "Site nizleme",
        href: "/",
        icon: (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        ),
        external: true,
      },
    ],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-white border-r border-gray-200">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b border-gray-200 px-6">
        <div className="h-8 w-8 rounded-lg bg-gray-900 flex items-center justify-center">
          <span className="text-sm font-bold text-white">K</span>
        </div>
        <div>
          <h1 className="text-sm font-bold text-gray-900">KINALI</h1>
          <p className="text-[10px] text-gray-500">Admin Panel</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-4">
        {menuItems.map((section) => (
          <div key={section.title} className="mb-6">
            <h2 className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
              {section.title}
            </h2>
            <ul className="space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href ||
                  (item.href !== "/admin" && pathname.startsWith(item.href));

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-gray-900 text-white"
                          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                    >
                      <span className={isActive ? "text-white" : "text-gray-400"}>
                        {item.icon}
                      </span>
                      {item.label}
                      {item.external && (
                        <svg className="ml-auto h-4 w-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

    </aside>
  );
}

export function MobileHeader({ email }: { email: string }) {
  return (
    <header className="lg:hidden flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-lg bg-gray-900 flex items-center justify-center">
          <span className="text-sm font-bold text-white">K</span>
        </div>
        <span className="text-sm font-bold text-gray-900">Admin</span>
      </div>
      <MobileMenu email={email} />
    </header>
  );
}

function MobileMenu({ email }: { email: string }) {
  const pathname = usePathname();

  return (
    <div className="relative">
      <input type="checkbox" id="mobile-menu" className="peer hidden" />
      <label
        htmlFor="mobile-menu"
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg hover:bg-gray-100"
      >
        <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </label>

      {/* Backdrop */}
      <label
        htmlFor="mobile-menu"
        className="fixed inset-0 z-40 bg-black/50 opacity-0 pointer-events-none peer-checked:opacity-100 peer-checked:pointer-events-auto transition-opacity"
      />

      {/* Menu */}
      <div className="fixed inset-y-0 right-0 z-50 w-72 translate-x-full bg-white shadow-xl transition-transform peer-checked:translate-x-0">
        <div className="flex items-center justify-between border-b border-gray-200 p-4">
          <span className="text-sm font-semibold text-gray-900">Men</span>
          <label
            htmlFor="mobile-menu"
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg hover:bg-gray-100"
          >
            <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </label>
        </div>

        <nav className="overflow-y-auto p-4">
          {menuItems.map((section) => (
            <div key={section.title} className="mb-6">
              <h2 className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                {section.title}
              </h2>
              <ul className="space-y-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.href ||
                    (item.href !== "/admin" && pathname.startsWith(item.href));

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        target={item.external ? "_blank" : undefined}
                        className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                          isActive
                            ? "bg-gray-900 text-white"
                            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        }`}
                      >
                        <span className={isActive ? "text-white" : "text-gray-400"}>
                          {item.icon}
                        </span>
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className="absolute inset-x-0 bottom-0 border-t border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-sm font-semibold text-gray-600">A</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{email}</p>
              <p className="text-xs text-gray-500">Ynetici</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
