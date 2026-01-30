import { ProductCard } from "./product-card";

type FeaturedProduct = {
  id: string;
  title: string;
  slug: string;
  price: number | string | { toString(): string };
  currency: string;
  productCode: string;
  images: { url: string | null }[];
};

export function FeaturedProducts({
  products,
}: {
  products: FeaturedProduct[];
}) {
  if (products.length === 0) return null;

  return (
    <section className="px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-5xl">
        {/* Section Header */}
        <div className="mb-8 flex items-center justify-between">
          <h2 className="font-display text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Öne Çıkan Ürünler
          </h2>
          <div className="hidden h-px flex-1 bg-gradient-to-r from-gray-200 to-transparent ml-6 sm:block" />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
