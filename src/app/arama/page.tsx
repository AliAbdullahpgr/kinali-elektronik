export const metadata = {
  title: "Arama Sonu\u00e7lar\u0131 | K\u0131nal\u0131 Elektronik",
  description: "K\u0131nal\u0131 Elektronik \u00fcr\u00fcn arama sonu\u00e7lar\u0131.",
  robots: { index: false, follow: true },
};

import { api } from "~/trpc/server";
import { ProductCard } from "~/app/_components/product-card";
import { Header } from "~/app/_components/header";
import { StickyCta } from "~/app/_components/sticky-cta";

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function SearchPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const query = typeof params?.q === "string" ? params.q : "";
  const category =
    typeof params?.category === "string" ? params.category : undefined;

  const results = query
    ? await api.product.search({ query, categorySlug: category })
    : category
    ? await api.product.listByCategory({ slug: category })
    : [];

  return (
    <main className="min-h-screen bg-kinali-bg pb-24">
      {/* Header */}
      <Header />

      {/* Search Results */}
      <section className="px-3 py-4 sm:px-4 sm:py-6">
        <div className="mx-auto max-w-5xl">
          {/* Section Header */}
          <div className="mb-3 flex items-center gap-3 sm:mb-4 sm:gap-4">
            <h1 className="whitespace-nowrap font-display text-base font-semibold text-gray-900 sm:text-lg">
              Arama Sonu\u00e7lar\u0131
            </h1>
            <div className="h-px flex-1 bg-gray-300" />
          </div>

          <p className="mb-3 text-xs text-gray-600 sm:mb-4 sm:text-sm">
            {query
              ? `"${query}" i\u00e7in ${results.length} \u00fcr\u00fcn bulundu`
              : category
              ? `${category} kategorisinde ${results.length} \u00fcr\u00fcn bulundu`
              : "Arama yapmak i\u00e7in \u00fcstteki men\u00fcden arama yap\u0131n."}
          </p>

          {/* Results Grid */}
          {results.length > 0 ? (
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4">
              {results.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : query || category ? (
            <div className="rounded-xl bg-white p-6 text-center shadow-sm sm:p-8">
              <p className="text-sm text-gray-500">
                Araman\u0131zla e\u015fle\u015fen \u00fcr\u00fcn bulunamad\u0131.
              </p>
            </div>
          ) : null}
        </div>
      </section>

      {/* Sticky CTA */}
      <StickyCta />
    </main>
  );
}
