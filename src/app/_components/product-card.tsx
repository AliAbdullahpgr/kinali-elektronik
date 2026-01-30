import Link from "next/link";

type Product = {
  id: string;
  title: string;
  slug: string;
  price: number | string | { toString(): string };
  currency: string;
  productCode: string;
  images: { url: string | null }[];
};

const whatsappNumber =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "+905551234567";

export function ProductCard({ product }: { product: Product }) {
  const imageUrl = product.images?.[0]?.url ?? "/placeholder-product.svg";
  const priceValue =
    typeof product.price === "number"
      ? product.price
      : Number(product.price.toString());

  const whatsappMessage = encodeURIComponent(
    `Merhaba, "${product.title}" (Kod: ${product.productCode}) ürünü hakkında bilgi almak istiyorum.`
  );

  return (
    <div className="flex flex-col rounded-xl bg-white shadow-sm transition hover:shadow-md">
      {/* Product Image */}
      <Link href={`/urun/${product.slug}`} className="block">
        <div className="flex h-28 items-center justify-center overflow-hidden rounded-t-xl bg-gray-50 p-2 sm:h-32 md:h-40">
          <img
            src={imageUrl}
            alt={product.title}
            className="h-full w-auto max-w-full object-contain"
            loading="lazy"
          />
        </div>
      </Link>

      {/* Product Info */}
      <div className="flex flex-1 flex-col p-2.5 sm:p-3">
        <Link href={`/urun/${product.slug}`} className="block">
          <h3 className="line-clamp-2 text-xs font-semibold text-gray-900 sm:text-sm">
            {product.title}
          </h3>
        </Link>

        {/* Price */}
        <p className="mt-1.5 text-base font-bold text-kinali-price sm:mt-2 sm:text-lg md:text-xl">
          {priceValue.toLocaleString("tr-TR")}{" "}
          <span className="text-sm font-semibold sm:text-base">
            {product.currency ?? "TL"}
          </span>
        </p>

        {/* WhatsApp Button */}
        <a
          href={`https://wa.me/${whatsappNumber.replace(/\D/g, "")}?text=${whatsappMessage}`}
          className="mt-2 flex items-center justify-center gap-1.5 rounded-lg bg-kinali-whatsapp px-2 py-1.5 text-xs font-semibold text-white transition hover:bg-kinali-whatsapp/90 sm:mt-3 sm:gap-2 sm:px-3 sm:py-2 sm:text-sm"
          aria-label={`${product.title} için WhatsApp'tan sor`}
        >
          <svg className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          <span>WhatsApp'tan Sor</span>
        </a>
      </div>
    </div>
  );
}
