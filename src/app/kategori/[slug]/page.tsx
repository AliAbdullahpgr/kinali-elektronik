import { notFound } from "next/navigation";

import { api } from "~/trpc/server";
import { ProductCard } from "~/app/_components/product-card";
import { Header } from "~/app/_components/header";
import { SearchBar } from "~/app/_components/search-bar";
import { StickyCta } from "~/app/_components/sticky-cta";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function CategoryPage({
  params,
  searchParams,
}: PageProps) {
  const { slug } = await params;
  const category = await api.category.bySlug({ slug });
  if (!category) return notFound();

  const searchParamsResolved = await searchParams;
  const brand =
    typeof searchParamsResolved?.brand === "string"
      ? searchParamsResolved.brand
      : undefined;
  const condition =
    typeof searchParamsResolved?.condition === "string"
      ? searchParamsResolved.condition
      : undefined;
  const minCandidate =
    typeof searchParamsResolved?.min === "string"
      ? Number(searchParamsResolved.min)
      : undefined;
  const maxCandidate =
    typeof searchParamsResolved?.max === "string"
      ? Number(searchParamsResolved.max)
      : undefined;
  const minPrice = Number.isNaN(minCandidate ?? NaN) ? undefined : minCandidate;
  const maxPrice = Number.isNaN(maxCandidate ?? NaN) ? undefined : maxCandidate;

  const [products, categories] = await Promise.all([
    api.product.listByCategory({
      slug,
      brand,
      condition,
      minPrice,
      maxPrice,
    }),
    api.category.list(),
  ]);

  return (
    <main className="min-h-screen bg-kinali-bg pb-24">
      {/* Header */}
      <Header />

      {/* Search Bar */}
      <SearchBar categories={categories} />

      {/* Category Content */}
      <section className="px-3 py-4 sm:px-4 sm:py-6">
        <div className="mx-auto max-w-5xl">
          {/* Section Header */}
          <div className="mb-3 flex items-center gap-3 sm:mb-4 sm:gap-4">
            <h1 className="whitespace-nowrap font-display text-base font-semibold text-gray-900 sm:text-lg">
              {category.name}
            </h1>
            <div className="h-px flex-1 bg-gray-300" />
          </div>

          <p className="mb-3 text-xs text-gray-600 sm:mb-4 sm:text-sm">
            {products.length} ürün bulundu
          </p>

          {/* Products Grid */}
          {products.length > 0 ? (
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl bg-white p-6 text-center shadow-sm sm:p-8">
              <p className="text-sm text-gray-500">
                Bu kategoride henüz ürün bulunmuyor.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Sticky CTA */}
      <StickyCta />
    </main>
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const category = await api.category.bySlug({ slug });
  if (!category) return {};

  return {
    title: `${category.name} | Kınalı Elektronik`,
    description: `${category.name} kategorisindeki ürünleri inceleyin.`,
  };
}
