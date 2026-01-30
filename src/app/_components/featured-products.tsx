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
    <section id="products" className="py-24 sm:py-32 bg-surface-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        
        {/* Section Header with centered layout */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl font-display">
            Çok Satanlar & Fırsatlar
          </h2>
          <p className="mt-4 text-base leading-7 text-text-secondary">
             En çok tercih edilen yedek parça ve aksesuarları sizin için seçtik.
          </p>
        </div>

        {/* Products Grid - Larger grid for immersive feel */}
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="h-full">
                <ProductCard product={product} />
            </div>
          ))}
        </div>
        
        {/* 'View All' Link */}
        <div className="mt-16 text-center">
            <a href="/tum-urunler" className="text-sm font-semibold text-brand-gold hover:text-brand-dark transition-colors inline-flex items-center gap-1 group">
                Tüm Ürünleri Gör
                <span className="transform transition-transform group-hover:translate-x-1">&rarr;</span>
            </a>
        </div>
      </div>
    </section>
  );
}
