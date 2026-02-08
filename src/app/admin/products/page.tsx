"use client";

import Link from "next/link";
import { useState } from "react";

import { formatNumberTR } from "~/lib/formatters";
import { api } from "~/trpc/react";

export default function AdminProductsPage() {
  const { data: products, refetch } = api.product.adminList.useQuery();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const deleteProduct = api.product.remove.useMutation({
    onSuccess: () => {
      setDeletingId(null);
      setShowDeleteConfirm(null);
      refetch();
    },
    onError: () => {
      setDeletingId(null);
    },
  });

  const handleDelete = (id: string) => {
    setDeletingId(id);
    deleteProduct.mutate({ id });
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">Ürünler</h1>
        <Link
          href="/admin/products/new"
          className="shrink-0 rounded-xl bg-gray-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-gray-800 sm:px-4 sm:py-2.5"
        >
          Yeni Ürün
        </Link>
      </div>

      {!products || products.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-gray-200 bg-white py-12 shadow-sm sm:py-16">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 sm:h-16 sm:w-16">
            <svg
              className="h-7 w-7 text-gray-400 sm:h-8 sm:w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-900">Henüz ürün yok</p>
            <p className="text-xs text-gray-500">
              Yeni ürün ekleyerek başlayın
            </p>
          </div>
          <Link
            href="/admin/products/new"
            className="rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            İlk Ürün Ekle
          </Link>
        </div>
      ) : (
        <>
          {/* Mobile Card View */}
          <div className="flex flex-col gap-3 sm:hidden">
            {products.map((product) => (
              <div
                key={product.id}
                className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm"
              >
                <div className="flex gap-3">
                  <img
                    src={product.images?.[0]?.url ?? "/placeholder-product.svg"}
                    alt={product.title}
                    className="h-16 w-16 shrink-0 rounded-lg border border-gray-200 object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-gray-900">{product.title}</p>
                    <p className="text-xs text-gray-500">{product.productCode}</p>
                    <p className="mt-1 text-sm font-semibold text-gray-900">
                      {formatNumberTR(Number(product.price))} {product.currency ?? "TL"}
                    </p>
                  </div>
                  <span
                    className={`h-fit shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ${
                      product.isActive
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {product.isActive ? "Aktif" : "Pasif"}
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
                  <p className="text-xs text-gray-500">
                    {product.category?.name ?? "-"}
                  </p>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs text-gray-700 transition hover:bg-gray-50"
                    >
                      Düzenle
                    </Link>
                    {showDeleteConfirm === product.id ? (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleDelete(product.id)}
                          disabled={deletingId === product.id}
                          className="rounded-lg bg-red-50 px-3 py-1.5 text-xs text-red-600 transition hover:bg-red-100 disabled:opacity-50"
                        >
                          {deletingId === product.id ? "..." : "Evet"}
                        </button>
                        <button
                          onClick={() => setShowDeleteConfirm(null)}
                          className="rounded-lg border border-gray-300 bg-white px-2 py-1.5 text-xs text-gray-700 transition hover:bg-gray-50"
                        >
                          İptal
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setShowDeleteConfirm(product.id)}
                        className="rounded-lg bg-red-50 px-3 py-1.5 text-xs text-red-600 transition hover:bg-red-100"
                      >
                        Sil
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm sm:block">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-700">
                <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase text-gray-500">
                  <tr>
                    <th className="whitespace-nowrap px-4 py-3 font-medium">Ürün</th>
                    <th className="whitespace-nowrap px-4 py-3 font-medium">Kategori</th>
                    <th className="whitespace-nowrap px-4 py-3 font-medium">Fiyat</th>
                    <th className="whitespace-nowrap px-4 py-3 font-medium">Durum</th>
                    <th className="whitespace-nowrap px-4 py-3 text-right font-medium">lemler</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {products.map((product) => (
                    <tr key={product.id} className="transition hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.images?.[0]?.url ?? "/placeholder-product.svg"}
                            alt={product.title}
                            className="h-10 w-10 shrink-0 rounded-lg border border-gray-200 object-cover"
                          />
                          <div className="min-w-0">
                            <p className="truncate font-medium text-gray-900">{product.title}</p>
                            <p className="text-xs text-gray-500">
                              {product.productCode}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-gray-600">
                        {product.category?.name ?? "-"}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-gray-600">
                        {formatNumberTR(Number(product.price))}{" "}
                        {product.currency ?? "TL"}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium ${
                            product.isActive
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {product.isActive ? "Aktif" : "Pasif"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/products/${product.id}/edit`}
                            className="whitespace-nowrap rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs text-gray-700 transition hover:bg-gray-50"
                          >
                            Düzenle
                          </Link>
                          {showDeleteConfirm === product.id ? (
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleDelete(product.id)}
                                disabled={deletingId === product.id}
                                className="whitespace-nowrap rounded-lg bg-red-50 px-3 py-1.5 text-xs text-red-600 transition hover:bg-red-100 disabled:opacity-50"
                              >
                                {deletingId === product.id ? "..." : "Evet"}
                              </button>
                              <button
                                onClick={() => setShowDeleteConfirm(null)}
                                className="whitespace-nowrap rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs text-gray-700 transition hover:bg-gray-50"
                              >
                                İptal
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setShowDeleteConfirm(product.id)}
                              className="whitespace-nowrap rounded-lg bg-red-50 px-3 py-1.5 text-xs text-red-600 transition hover:bg-red-100"
                            >
                              Sil
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
