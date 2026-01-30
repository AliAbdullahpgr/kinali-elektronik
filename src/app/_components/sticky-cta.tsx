export function StickyCta() {
  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "+905551234567";
  const callNumber = process.env.NEXT_PUBLIC_CALL_NUMBER ?? "+905551234567";

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 bg-kinali-bg px-3 pb-[max(1rem,env(safe-area-inset-bottom))] pt-2 sm:px-4">
      <div className="mx-auto flex w-full max-w-5xl gap-2 sm:gap-3">
        {/* WhatsApp Button */}
        <a
          href={`https://wa.me/${whatsappNumber.replace(/\D/g, "")}`}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-kinali-whatsapp px-3 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-kinali-whatsapp/90 sm:gap-2 sm:px-4 sm:py-3.5 sm:text-base"
          aria-label="WhatsApp ile sor"
        >
          <svg className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          <span>WhatsApp ile Sor</span>
        </a>

        {/* Call Button */}
        <a
          href={`tel:${callNumber}`}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-kinali-call px-3 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-kinali-call/90 sm:gap-2 sm:px-4 sm:py-3.5 sm:text-base"
          aria-label="Hemen ara"
        >
          <svg
            className="h-4 w-4 shrink-0 sm:h-5 sm:w-5"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
          </svg>
          <span>Hemen Ara</span>
        </a>
      </div>
    </div>
  );
}
