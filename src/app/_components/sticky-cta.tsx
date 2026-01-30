export function StickyCta() {
  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "+905551234567";
  const callNumber = process.env.NEXT_PUBLIC_CALL_NUMBER ?? "+905551234567";

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 bg-white px-3 pb-[max(1rem,env(safe-area-inset-bottom))] pt-2 shadow-[0_-10px_30px_rgba(15,23,42,0.08)] sm:px-4">
      <div className="mx-auto flex w-full max-w-5xl gap-2 sm:gap-3">
        {/* WhatsApp Button */}
        <a
          href={`https://wa.me/${whatsappNumber.replace(/\D/g, "")}`}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#22C55E] px-3 py-3 text-sm font-bold text-white shadow-lg shadow-[#22C55E]/30 transition hover:bg-[#1FB456] sm:gap-2 sm:px-4 sm:py-3.5 sm:text-base"
          aria-label="WhatsApp ile sor"
        >
          <svg className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20.52 3.48A11.9 11.9 0 0012.06 0 11.95 11.95 0 00.11 11.94c0 2.1.55 4.15 1.6 5.96L0 24l6.25-1.64a11.94 11.94 0 005.8 1.48h.01A11.95 11.95 0 0024 11.9c0-3.18-1.24-6.17-3.48-8.42zM12.06 21.5h-.01a9.57 9.57 0 01-4.88-1.34l-.35-.2-3.71.97.99-3.62-.23-.36a9.58 9.58 0 01-1.47-5.11A9.65 9.65 0 0112.06 2.4c2.57 0 4.99 1 6.8 2.82a9.6 9.6 0 012.82 6.79c0 5.32-4.33 9.49-9.62 9.49zm5.29-7.17c-.29-.15-1.7-.84-1.97-.93-.26-.1-.46-.15-.65.15-.19.29-.75.93-.92 1.12-.17.2-.34.22-.63.07-.29-.15-1.23-.45-2.35-1.43-.87-.78-1.46-1.74-1.63-2.03-.17-.29-.02-.45.13-.6.13-.13.29-.34.43-.52.15-.17.2-.29.3-.49.1-.19.05-.36-.02-.52-.08-.15-.67-1.58-.92-2.16-.24-.56-.49-.48-.67-.49l-.57-.01c-.19 0-.51.07-.78.36-.27.29-1.02 1-1.02 2.42s1.04 2.79 1.19 2.98c.15.19 2.05 3.12 4.98 4.37.7.3 1.24.48 1.67.62.7.22 1.34.19 1.84.12.56-.08 1.7-.7 1.94-1.39.24-.68.24-1.27.17-1.39-.07-.12-.26-.19-.55-.34z" />
          </svg>
          <span>WhatsApp ile Sor</span>
        </a>

        {/* Call Button */}
        <a
          href={`tel:${callNumber}`}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#2196F3] px-3 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-[#1B7FD6] sm:gap-2 sm:px-4 sm:py-3.5 sm:text-base"
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
