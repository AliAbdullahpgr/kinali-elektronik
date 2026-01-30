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
    <section className="px-3 sm:px-4">
      <div className="mx-auto max-w-5xl">
        {/* Section Header */}
        <div className="mb-3 flex items-center gap-3 sm:mb-4 sm:gap-4">
          <h2 className="whitespace-nowrap font-display text-base font-semibold text-gray-900 sm:text-lg">
            Öne Çıkan Ürünler
          </h2>
          <div className="h-px flex-1 bg-gray-300" />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
