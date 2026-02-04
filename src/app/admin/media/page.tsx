"use client";

import { useState } from "react";
import { api } from "~/trpc/react";

export default function MediaLibraryPage() {
  const { data: products, isLoading } = api.product.adminList.useQuery();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");

  // Collect all images from products
  const allImages = products?.flatMap((product) =>
    product.images.map((img) => ({
      ...img,
      productTitle: product.title,
      productId: product.id,
      productCode: product.productCode,
    }))
  ) ? [];

  const filteredImages = allImages.filter(
    (img) =>
      img.productTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      img.productCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900" />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Medya Ktphanesi</h1>
          <p className="text-sm text-gray-500 mt-1">
            Tm rn grselleriniz burada. Toplam {allImages.length} grsel.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode("grid")}
            className={`rounded-lg p-2 transition ${
              viewMode === "grid"
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`rounded-lg p-2 transition ${
              viewMode === "list"
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <svg className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="rn ad veya kodu ile ara..."
          className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-12 pr-4 text-sm placeholder:text-gray-400 focus:border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-300"
        />
      </div>

      {/* Content */}
      {filteredImages.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center">
          <svg className="h-16 w-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h3 className="text-lg font-semibold text-gray-900">Grsel Bulunamad</h3>
          <p className="text-sm text-gray-500 mt-1">
            {searchQuery
              ? "Arama kriterlerinize uygun grsel bulunamad."
              : "Henz hi grsel yklenmemi."}
          </p>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {filteredImages.map((image, index) => (
            <div
              key={`${image.productId}-${index}`}
              className="group relative aspect-square overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
            >
              <img
                src={image.url}
                alt={image.alt ? image.productTitle}
                className="h-full w-full object-cover transition group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition group-hover:opacity-100">
                <div className="absolute inset-x-0 bottom-0 p-3">
                  <p className="text-xs font-medium text-white truncate">
                    {image.productTitle}
                  </p>
                  <p className="text-[10px] text-white/70">{image.productCode}</p>
                </div>
              </div>
              <a
                href={image.url}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-2 right-2 rounded-lg bg-white/90 p-1.5 opacity-0 transition group-hover:opacity-100 hover:bg-white"
              >
                <svg className="h-4 w-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Grsel
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  rn
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Kod
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                  lem
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredImages.map((image, index) => (
                <tr key={`${image.productId}-${index}`} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="h-12 w-12 overflow-hidden rounded-lg bg-gray-100">
                      <img
                        src={image.url}
                        alt={image.alt ? image.productTitle}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-900">{image.productTitle}</p>
                  </td>
                  <td className="px-6 py-4">
                    <code className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-600">
                      {image.productCode}
                    </code>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <a
                      href={image.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Grntle
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-xl border border-gray-200 bg-white p-4 text-center">
          <p className="text-2xl font-bold text-gray-900">{allImages.length}</p>
          <p className="text-xs text-gray-500">Toplam Grsel</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 text-center">
          <p className="text-2xl font-bold text-gray-900">{products?.length ? 0}</p>
          <p className="text-xs text-gray-500">rn Says</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 text-center">
          <p className="text-2xl font-bold text-gray-900">
            {products?.length ? (allImages.length / products.length).toFixed(1) : 0}
          </p>
          <p className="text-xs text-gray-500">Ortalama/rn</p>
        </div>
      </div>
    </div>
  );
}
