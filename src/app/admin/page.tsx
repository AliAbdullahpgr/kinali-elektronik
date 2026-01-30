import Link from "next/link";

import { api } from "~/trpc/server";

export default async function AdminDashboardPage() {
  const stats = await api.admin.stats();

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-3 py-4 sm:gap-6 sm:px-4 sm:py-8">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">Admin Panel</h1>
        <Link
          href="/admin/products/new"
          className="shrink-0 rounded-xl bg-gray-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-gray-800 sm:px-4 sm:py-2.5"
        >
          Yeni Ürün
        </Link>
      </div>
      <section className="grid grid-cols-3 gap-2 sm:gap-4">
        {[
          { label: "Toplam Ürün", value: stats.productCount },
          { label: "Kategori", value: stats.categoryCount },
          { label: "Öne Çıkan", value: stats.featuredCount },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm sm:rounded-2xl sm:p-4"
          >
            <p className="text-[10px] font-medium uppercase tracking-wide text-gray-500 sm:text-xs">
              {item.label}
            </p>
            <p className="text-lg font-semibold text-gray-900 sm:text-2xl">{item.value}</p>
          </div>
        ))}
      </section>
      <Link
        href="/admin/products"
        className="w-fit rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-50 sm:px-4 sm:py-2.5"
      >
        Ürünleri Yönet
      </Link>
    </main>
  );
}
