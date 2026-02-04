import Link from "next/link";

import { api } from "~/trpc/server";

export default async function AdminDashboardPage() {
  const stats = await api.admin.stats();

  const quickActions = [
    {
      label: "Yeni rn Ekle",
      href: "/admin/products/new",
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      ),
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      label: "Kategorileri Ynet",
      href: "/admin/categories",
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
      ),
      color: "bg-purple-500 hover:bg-purple-600",
    },
    {
      label: "ne kanlar Dzenle",
      href: "/admin/featured",
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
      color: "bg-amber-500 hover:bg-amber-600",
    },
    {
      label: "Siteyi Grntle",
      href: "/",
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      ),
      color: "bg-gray-900 hover:bg-gray-800",
      external: true,
    },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ho geldiniz!</h1>
          <p className="text-sm text-gray-500 mt-1">
            Maazanzn genel durumunu buradan takip edebilirsiniz.
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Yeni rn Ekle
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          {
            label: "Toplam rn",
            value: stats.productCount,
            icon: (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            ),
            bgColor: "bg-blue-50",
            iconColor: "text-blue-600",
            href: "/admin/products",
          },
          {
            label: "Kategori",
            value: stats.categoryCount,
            icon: (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            ),
            bgColor: "bg-purple-50",
            iconColor: "text-purple-600",
            href: "/admin/categories",
          },
          {
            label: "ne kan",
            value: stats.featuredCount,
            icon: (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            ),
            bgColor: "bg-amber-50",
            iconColor: "text-amber-600",
            href: "/admin/featured",
          },
          {
            label: "Aktif rn",
            value: stats.productCount,
            icon: (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ),
            bgColor: "bg-green-50",
            iconColor: "text-green-600",
            href: "/admin/products",
          },
        ].map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md hover:border-gray-300"
          >
            <div className="flex items-center justify-between">
              <div className={`rounded-xl ${stat.bgColor} p-3`}>
                <span className={stat.iconColor}>{stat.icon}</span>
              </div>
              <svg className="h-5 w-5 text-gray-300 transition group-hover:text-gray-400 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Hzl lemler</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              target={action.external ? "_blank" : undefined}
              className={`flex flex-col items-center gap-2 rounded-xl ${action.color} p-4 text-white transition`}
            >
              {action.icon}
              <span className="text-xs font-medium text-center">{action.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity & Tips */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Updates */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Son Gncellemeler</h2>
          <div className="space-y-4">
            {[
              { action: "Sistem gncellendi", time: "Bugn", icon: "" },
              { action: "Yeni zellikler eklendi", time: "Dn", icon: "" },
              { action: "Performans iyiletirmeleri", time: "2 gn nce", icon: "" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                <span className="text-xl">{item.icon}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{item.action}</p>
                  <p className="text-xs text-gray-500">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">pular</h2>
          <div className="space-y-4">
            {[
              { tip: "rnlerinize birden fazla fotoraf ekleyin", desc: "Daha fazla sat iin" },
              { tip: "Kategorileri dzenli tutun", desc: "Mteri deneyimini iyiletirir" },
              { tip: "ne kan rnleri gncel tutun", desc: "Ana sayfada grnr" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-gray-600">{i + 1}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{item.tip}</p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
