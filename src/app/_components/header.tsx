import Link from "next/link";

const phoneNumber = process.env.NEXT_PUBLIC_CALL_NUMBER ?? "+905551234567";

function formatPhoneDisplay(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("90")) {
    return `0${digits.slice(2, 5)} ${digits.slice(5, 8)} ${digits.slice(8, 10)} ${digits.slice(10)}`;
  }
  return phone;
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#2D1F15]/95 backdrop-blur-md supports-[backdrop-filter]:bg-[#2D1F15]/80">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-3 sm:px-6 md:py-4">
        {/* Brand Area */}
        <div className="flex flex-col">
          <Link href="/" className="group flex flex-col">
            <h1 className="font-display text-xl font-bold tracking-tight text-white transition-colors group-hover:text-kinali-gold sm:text-2xl md:text-3xl">
              KINALI <span className="text-kinali-gold">ELEKTRONİK</span>
            </h1>
            <span className="text-[10px] font-medium tracking-wide text-gray-400 sm:text-xs">
              GÜNGÖREN / İSTANBUL
            </span>
          </Link>
        </div>

        {/* Action Area */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            href={`tel:${phoneNumber}`}
            className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-white/20 hover:ring-1 hover:ring-white/20 active:scale-95"
          >
            <div className="flex items-center justify-center rounded-full bg-green-500/20 p-1">
              <svg
                className="h-3.5 w-3.5 text-green-500 sm:h-4 sm:w-4"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
            </div>
            <span className="hidden sm:inline">{formatPhoneDisplay(phoneNumber)}</span>
            <span className="sm:hidden">Ara</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
