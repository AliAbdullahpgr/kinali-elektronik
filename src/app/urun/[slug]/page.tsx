import { notFound } from "next/navigation";
import Link from "next/link";

import { api } from "~/trpc/server";
import { Header } from "~/app/_components/header";
import { StickyCta } from "~/app/_components/sticky-cta";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await api.product.bySlug({ slug });
  if (!product) return notFound();

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://kinali-elektronik.vercel.app";
  const productUrl = `${baseUrl}/urun/${product.slug}`;
  const categoryUrl = product.category
    ? `${baseUrl}/kategori/${product.category.slug}`
    : undefined;

  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "+90 555 993 77 07";
  const callNumber = process.env.NEXT_PUBLIC_CALL_NUMBER ?? "+90 555 993 77 07";

  const productDescription =
    product.description ??
    `Kınalı Elektronik'te ${product.title} ürününü uygun fiyat ve hızlı iletişimle keşfedin.`;

  const whatsappMessage = encodeURIComponent(
    `Merhaba, "${product.title}" (Kod: ${product.productCode}) ürünü hakkında bilgi almak istiyorum.`
  );

  const mainImage = product.images?.[0]?.url ?? "/placeholder-product.svg";
  const imageUrls = (product.images ?? [])
    .map((image) => image.url)
    .filter((url): url is string => Boolean(url))
    .map((url) =>
      url.startsWith("http")
        ? url
        : `${baseUrl}${url.startsWith("/") ? "" : "/"}${url}`
    );

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: productDescription,
    image: imageUrls.length
      ? imageUrls
      : [`${baseUrl}/placeholder-product.svg`],
    sku: product.productCode,
    ...(product.brand
      ? {
          brand: {
            "@type": "Brand",
            name: product.brand,
          },
        }
      : {}),
    offers: {
      "@type": "Offer",
      priceCurrency: product.currency ?? "TRY",
      price: Number(product.price),
      url: productUrl,
    },
  };

  const breadcrumbItems = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Ana Sayfa",
      item: baseUrl,
    },
    ...(product.category && categoryUrl
      ? [
          {
            "@type": "ListItem",
            position: 2,
            name: product.category.name,
            item: categoryUrl,
          },
        ]
      : []),
    {
      "@type": "ListItem",
      position: product.category ? 3 : 2,
      name: product.title,
      item: productUrl,
    },
  ];

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems,
  };

  return (
    <main className="min-h-screen bg-kinali-bg pb-24">
      {/* Header */}
      <Header />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Product Content */}
      <section className="px-4 py-6">
        <div className="mx-auto max-w-5xl">
          {/* Breadcrumb */}
          <nav className="mb-4 flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-kinali-teal">
              Ana Sayfa
            </Link>
            <span>/</span>
            {product.category && (
              <>
                <Link
                  href={`/kategori/${product.category.slug}`}
                  className="hover:text-kinali-teal"
                >
                  {product.category.name}
                </Link>
                <span>/</span>
              </>
            )}
            <span className="text-gray-700">{product.title}</span>
          </nav>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Image Gallery */}
            <div className="flex flex-col gap-3">
              <div className="flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-white p-4 shadow-sm">
                <img
                  src={mainImage}
                  alt={product.title}
                  className="h-full w-full object-contain"
                />
              </div>
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((image) => (
                    <div
                      key={image.id}
                      className="flex aspect-square items-center justify-center overflow-hidden rounded-lg bg-white p-2 shadow-sm"
                    >
                      <img
                        src={image.url ?? "/placeholder-product.svg"}
                        alt={image.alt ?? product.title}
                        className="h-full w-full object-contain"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="flex flex-col gap-4 rounded-xl bg-white p-5 shadow-sm">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-kinali-teal">
                  {product.category?.name}
                </p>
                <h1 className="mt-1 font-display text-xl font-bold text-gray-900 sm:text-2xl">
                  {product.title}
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                  Ürün Kodu: <span className="font-medium">{product.productCode}</span>
                </p>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-kinali-price">
                  {Number(product.price).toLocaleString("tr-TR")}
                </span>
                <span className="text-xl font-semibold text-kinali-price">
                  {product.currency ?? "TL"}
                </span>
              </div>

              {/* Details */}
              <div className="flex flex-wrap gap-2">
                {product.brand && (
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                    {product.brand}
                  </span>
                )}
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                  {product.condition ?? "Yeni"}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm leading-relaxed text-gray-600">
                {product.description ??
                  "Ürün bilgileri kısa sürede güncellenecektir. Detaylı bilgi için bizimle iletişime geçin."}
              </p>

              {/* CTA Buttons */}
              <div className="mt-auto flex gap-3 pt-4">
                <a
                  href={`https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${whatsappMessage}`}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-kinali-whatsapp px-4 py-3 text-sm font-bold text-white"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp ile Sor
                </a>
                <a
                  href={`tel:${callNumber}`}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-kinali-call px-4 py-3 text-sm font-bold text-white"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                  </svg>
                  Hemen Ara
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky CTA */}
      <StickyCta />
    </main>
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const product = await api.product.bySlug({ slug });
  if (!product) return {};

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://kinali-elektronik.vercel.app";
  const canonical = `${baseUrl}/urun/${product.slug}`;

  return {
    title: `${product.title} | Kınalı Elektronik`,
    description:
      product.description ?? `${product.title} ürünü için fiyat ve detaylı bilgi alın.`,
    alternates: { canonical },
  };
}
