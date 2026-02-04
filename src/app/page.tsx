import { api, HydrateClient } from "~/trpc/server";
import { CategoryGrid } from "./_components/category-grid";
import { FeaturedProducts } from "./_components/featured-products";
import { Header } from "./_components/header";
import { Hero } from "./_components/hero";
import { Footer } from "./_components/footer";
import { StickyCta } from "./_components/sticky-cta";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://kinali-elektronik.vercel.app";
const contactPhone =
  process.env.NEXT_PUBLIC_CALL_NUMBER ?? "+90 555 993 77 07";

export const metadata = {
  title:
    "K\u0131nal\u0131 Elektronik | \u0130stanbul Elektronik Servis ve Uygun Fiyat",
  description:
    "\u0130stanbul G\u00fcng\u00f6ren'de uygun fiyatl\u0131 elektronik servis, tamir, yedek par\u00e7a ve aksesuarlar. Telefon, tablet ve TV onar\u0131m\u0131nda h\u0131zl\u0131 hizmet.",
  alternates: { canonical: siteUrl },
  openGraph: {
    title: "K\u0131nal\u0131 Elektronik | \u0130stanbul Elektronik Servis",
    description:
      "\u0130stanbul G\u00fcng\u00f6ren'de uygun fiyatl\u0131 elektronik servis, tamir, yedek par\u00e7a ve aksesuarlar.",
    url: siteUrl,
    siteName: "K\u0131nal\u0131 Elektronik",
    locale: "tr_TR",
    type: "website",
  },
};

export default async function Home() {
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "ElectronicsStore",
    name: "K\u0131nal\u0131 Elektronik",
    url: siteUrl,
    telephone: contactPhone.replace(/\s/g, ""),
    priceRange: "\u20ba\u20ba",
    areaServed: "\u0130stanbul",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Merkez Mah. Fevzi \u00c7akmak Cad. No:12/A",
      addressLocality: "G\u00fcng\u00f6ren",
      addressRegion: "\u0130stanbul",
      addressCountry: "TR",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "11:00",
        closes: "18:00",
      },
    ],
  };

  const [categories, featured] = await Promise.all([
    api.category.list(),
    api.product.featured(),
  ]);

  return (
    <HydrateClient>
      <main className="min-h-screen bg-surface-50">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
        />
        <Header />

        <Hero />

        <CategoryGrid categories={categories} />

        <FeaturedProducts products={featured} />

        {/* Info Section / Value Prop */}
        <section className="relative overflow-hidden bg-brand-dark py-24 sm:py-32">
          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:max-w-none">
              <div className="text-center">
                <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Neden K\u0131nal\u0131 Elektronik?
                </h2>
                <p className="mt-4 text-lg leading-8 text-gray-300">
                  Sadece bir tamirci de\u011fil, teknolojinizin g\u00fcvenilir orta\u011f\u0131n\u0131z.
                </p>
              </div>
              <dl className="mt-16 grid grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                <div className="flex flex-col items-center text-center">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-brand-gold">
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    Orijinal Par\u00e7a Garantisi
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-400">
                    <p className="flex-auto">
                      T\u00fcm onar\u0131mlarda ve sat\u0131\u015flarda %100 orijinal veya A kalite sertifikal\u0131 yedek par\u00e7alar kullan\u0131yoruz.
                    </p>
                  </dd>
                </div>
                <div className="flex flex-col items-center text-center">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-brand-gold">
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    H\u0131zl\u0131 Teknik Servis
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-400">
                    <p className="flex-auto">
                      Cihazlar\u0131n\u0131z\u0131 bekletmiyoruz. Ekran de\u011fi\u015fimi ve batarya yenileme gibi i\u015flemleri 30 dakikada tamam\u0131yoruz.
                    </p>
                  </dd>
                </div>
                <div className="flex flex-col items-center text-center">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-brand-gold">
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>
                    Uygun Fiyat Politikas\u0131
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-400">
                    <p className="flex-auto">
                      Kaliteli hizmeti, b\u00fct\u00e7e dostu fiyatlarla sunuyoruz. S\u00fcrpriz maliyetler yok, \u015feffaf fiyatland\u0131rma var.
                    </p>
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
