import { api } from "~/trpc/server";
import { ProductCard } from "~/app/_components/product-card";
import { Header } from "~/app/_components/header";
import { StickyCta } from "~/app/_components/sticky-cta";

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://kinali-elektronik.vercel.app";

export const metadata = {
  title: "T\u00fcm \u00dcr\u00fcnler | K\u0131nal\u0131 Elektronik",
  description:
    "K\u0131nal\u0131 Elektronik \u00fcr\u00fcn katalo\u011fundaki t\u00fcm \u00fcr\u00fcnleri inceleyin.",
  alternates: { canonical: `${baseUrl}/tum-urunler` },
};

export default async function AllProductsPage() {
  const products = await api.product.listAll();

  return (
    <main className="min-h-screen bg-kinali-bg pb-24">
      {/* Header */}
      <Header />

      {/* Products */}
      <section className="px-3 py-4 sm:px-4 sm:py-6">
        <div className="mx-auto max-w-5xl">
          {/* Section Header */}
          <div className="mb-3 flex items-center gap-3 sm:mb-4 sm:gap-4">
            <h1 className="whitespace-nowrap font-display text-base font-semibold text-gray-900 sm:text-lg">
              T\u00fcm \u00dcr\u00fcnler
            </h1>
            <div className="h-px flex-1 bg-gray-300" />
          </div>

          <p className="mb-3 text-xs text-gray-600 sm:mb-4 sm:text-sm">
            {products.length} \u00fcr\u00fcn bulundu
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
              <p className="text-sm text-gray-500">Hen\u00fcz \u00fcr\u00fcn bulunmuyor.</p>
            </div>
          )}
        </div>
      </section>

      {/* Sticky CTA */}
      <StickyCta />
    </main>
  );
}
