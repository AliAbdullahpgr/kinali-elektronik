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
              Arama Sonuçları
            </h1>
            <div className="h-px flex-1 bg-gray-300" />
          </div>

          <p className="mb-3 text-xs text-gray-600 sm:mb-4 sm:text-sm">
            {query
              ? `"${query}" icin ${results.length} urun bulundu`
              : category
              ? `${category} kategorisinde ${results.length} urun bulundu`
              : "Arama yapmak icin ustteki menuden arama yapin."}
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
                Aramanızla eşleşen ürün bulunamadı.
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
