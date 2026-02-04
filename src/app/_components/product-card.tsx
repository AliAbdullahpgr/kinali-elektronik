import Link from "next/link";

type Product = {
  id: string;
  title: string;
  slug: string;
  price: number | string | { toString(): string };
  currency: string | null;
  productCode: string;
  images: { url: string | null }[];
};

const whatsappNumber =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "+90 555 993 77 07";

export function ProductCard({ product }: { product: Product }) {
  const imageUrl = product.images?.[0]?.url ?? "/placeholder-product.svg";
  const priceValue =
    typeof product.price === "number"
      ? product.price
      : Number(product.price.toString());
  const currencyLabel = product.currency ?? "TL";

  const whatsappMessage = encodeURIComponent(
    `Merhaba, "${product.title}" (Kod: ${product.productCode}) \u00fcr\u00fcn\u00fc hakk\u0131nda bilgi almak istiyorum.`
  );

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl bg-white border border-gray-100 transition-all duration-500 hover:shadow-2xl hover:shadow-black/5 hover:border-brand-gold/30 h-full">
      {/* Product Image Area */}
      <div className="relative aspect-square overflow-hidden bg-surface-50">
        <Link href={`/urun/${product.slug}`} className="block h-full w-full">
          <img
            src={imageUrl}
            alt={product.title}
            className="h-full w-full object-contain p-8 transition-transform duration-700 group-hover:scale-110 will-change-transform"
            loading="lazy"
          />
        </Link>

        {/* Hover Actions Overlay (Desktop) */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full px-4 pb-4 transition-transform duration-300 group-hover:translate-y-0 hidden sm:block">
          <a
            href={`https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full rounded-lg bg-brand-dark py-3 text-center text-xs font-bold text-white shadow-lg backdrop-blur-md transition-colors hover:bg-black"
          >
            WhatsApp'tan Sor
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-gold">
            Stok Kodu: {product.productCode}
          </span>
        </div>

        <Link
          href={`/urun/${product.slug}`}
          className="block flex-1 transition-colors group-hover:text-brand-dark"
        >
          <h3 className="font-display text-base font-medium leading-snug text-brand-gray line-clamp-2 min-h-[2.5rem]">
            {product.title}
          </h3>
        </Link>

        <div className="mt-4 flex items-end justify-between border-t border-gray-50 pt-3">
          <div className="flex flex-col">
            <span className="text-xs text-text-secondary">Fiyat</span>
            <div className="flex items-baseline gap-1">
              <span className="font-display text-lg font-bold text-brand-dark">
                {priceValue.toLocaleString("tr-TR")}
              </span>
              <span className="text-xs font-medium text-text-secondary">
                {currencyLabel}
              </span>
            </div>
          </div>

          {/* Mobile Only Action Button (Icon) */}
          <a
            href={`https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${whatsappMessage}`}
            className="sm:hidden flex h-10 w-10 items-center justify-center rounded-full bg-brand-gold/10 text-brand-gold hover:bg-brand-gold hover:text-white transition-colors"
            aria-label="WhatsApp"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
