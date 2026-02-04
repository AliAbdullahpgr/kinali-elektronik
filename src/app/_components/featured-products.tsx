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
    <section id="products" className="bg-surface-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Header with centered layout */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl">
            \u00c7ok Satanlar & F\u0131rsatlar
          </h2>
          <p className="mt-4 text-base leading-7 text-text-secondary">
            En \u00e7ok tercih edilen yedek par\u00e7a ve aksesuarlar\u0131 sizin i\u00e7in se\u00e7tik.
          </p>
        </div>

        {/* Products Grid - Larger grid for immersive feel */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="h-full">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* 'View All' Link */}
        <div className="mt-16 text-center">
          <a
            href="/tum-urunler"
            className="inline-flex items-center gap-1 text-sm font-semibold text-brand-gold transition-colors hover:text-brand-dark group"
          >
            T\u00fcm \u00dcr\u00fcnleri G\u00f6r
            <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
}
