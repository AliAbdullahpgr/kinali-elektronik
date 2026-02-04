"use client";

import { useState } from "react";
import { api } from "~/trpc/react";

export default function FeaturedProductsPage() {
  const utils = api.useUtils();
  const { data: products, isLoading } = api.product.adminList.useQuery();
  const [searchQuery, setSearchQuery] = useState("");

  const updateMutation = api.product.update.useMutation({
    onSuccess: () => {
      utils.product.adminList.invalidate();
    },
  });

  const featuredProducts = products?.filter((p) => p.isFeatured) ? [];
  const nonFeaturedProducts = products?.filter((p) => !p.isFeatured) ? [];

  const filteredNonFeatured = nonFeaturedProducts.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.productCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFeatured = (productId: string, currentStatus: boolean) => {
    const product = products?.find((p) => p.id === productId);
    if (!product) return;

    updateMutation.mutate({
      id: productId,
      title: product.title,
      description: product.description ? "",
      price: Number(product.price),
      productCode: product.productCode,
      categoryId: product.categoryId,
      isFeatured: !currentStatus,
      isActive: product.isActive,
      images: product.images.map((img) => ({
        url: img.url,
        alt: img.alt ? undefined,
      })),
    });
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900" />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">ne kan rnler</h1>
        <p className="text-sm text-gray-500 mt-1">
          Ana sayfada grnecek rnleri sein. ne kan rnler ana sayfada vurgulanr.
        </p>
      </div>

      {/* Currently Featured */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            u Anda ne kan ({featuredProducts.length})
          </h2>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            Maksimum 8 rn nerilir
          </span>
        </div>

        {featuredProducts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <svg className="h-12 w-12 mx-auto text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            <p className="text-sm">Henz ne kan rn yok.</p>
            <p className="text-xs mt-1">Aadan rn seerek ne karabilirsiniz.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="group flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 p-3 transition"
              >
                <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-white">
                  {product.images[0]?.url ? (
                    <img
                      src={product.images[0].url}
                      alt={product.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-gray-300">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {product.title}
                  </p>
                  <p className="text-xs text-gray-500">{product.productCode}</p>
                </div>
                <button
                  onClick={() => toggleFeatured(product.id, true)}
                  disabled={updateMutation.isPending}
                  className="shrink-0 rounded-lg p-2 text-amber-600 transition hover:bg-amber-100"
                  title="ne karmay kaldr"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Available Products */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Tm rnler ({nonFeaturedProducts.length})
          </h2>
          <div className="relative">
            <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="rn ara..."
              className="w-full sm:w-64 rounded-lg border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm placeholder:text-gray-400 focus:border-gray-300 focus:bg-white focus:outline-none focus:ring-1 focus:ring-gray-300"
            />
          </div>
        </div>

        {filteredNonFeatured.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p className="text-sm">
              {searchQuery ? "Arama sonucu bulunamad." : "Tm rnler zaten ne karlm."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filteredNonFeatured.map((product) => (
              <div
                key={product.id}
                className="group flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3 transition hover:border-gray-300 hover:shadow-sm"
              >
                <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                  {product.images[0]?.url ? (
                    <img
                      src={product.images[0].url}
                      alt={product.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-gray-300">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {product.title}
                  </p>
                  <p className="text-xs text-gray-500">{product.productCode}</p>
                </div>
                <button
                  onClick={() => toggleFeatured(product.id, false)}
                  disabled={updateMutation.isPending}
                  className="shrink-0 rounded-lg p-2 text-gray-400 transition hover:bg-amber-50 hover:text-amber-600"
                  title="ne kar"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
