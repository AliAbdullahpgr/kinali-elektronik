import { api, HydrateClient } from "~/trpc/server";
import { CategoryGrid } from "./_components/category-grid";
import { FeaturedProducts } from "./_components/featured-products";
import { Header } from "./_components/header";
import { Hero } from "./_components/hero";
import { Footer } from "./_components/footer";
import { StickyCta } from "./_components/sticky-cta";

export default async function Home() {
  const [categories, featured] = await Promise.all([
    api.category.list(),
    api.product.featured(),
  ]);

  return (
    <HydrateClient>
      <main className="min-h-screen bg-surface-50">
        <Header />
        
        <Hero />

        <CategoryGrid categories={categories} />

        <FeaturedProducts products={featured} />

        {/* Info Section / Value Prop */}
        <section className="bg-brand-dark py-24 sm:py-32 relative overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
                <div className="mx-auto max-w-2xl lg:max-w-none">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl font-display">
                            Neden Kınalı Elektronik?
                        </h2>
                        <p className="mt-4 text-lg leading-8 text-gray-300">
                            Sadece bir tamirci değil, teknolojinizin güvenilir ortağıyız.
                        </p>
                    </div>
                    <dl className="mt-16 grid grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                        <div className="flex flex-col items-center text-center">
                            <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                                <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-white/10 text-brand-gold">
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </div>
                                Orijinal Parça Garantisi
                            </dt>
                            <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-400">
                                <p className="flex-auto">Tüm onarımlarda ve satışlarda %100 orijinal veya A kalite sertifikalı yedek parçalar kullanıyoruz.</p>
                            </dd>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                                <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-white/10 text-brand-gold">
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </div>
                                Hızlı Teknik Servis
                            </dt>
                            <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-400">
                                <p className="flex-auto">Cihazlarınızı bekletmiyoruz. Ekran değişimi ve batarya yenileme gibi işlemleri 30 dakikada tamamlıyoruz.</p>
                            </dd>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                                <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-white/10 text-brand-gold">
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                </div>
                                Uygun Fiyat Politikası
                            </dt>
                            <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-400">
                                <p className="flex-auto">Kaliteli hizmeti, bütçe dostu fiyatlarla sunuyoruz. Sürpriz maliyetler yok, şeffaf fiyatlandırma var.</p>
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </section>

        <Footer />
        <StickyCta />
      </main>
    </HydrateClient>
  );
}
