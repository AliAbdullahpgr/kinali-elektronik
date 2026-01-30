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
    <header className="bg-gradient-to-b from-[#4A3728] to-[#2D1F15] px-3 py-3 sm:px-4 sm:py-4">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-2">
        {/* Left: Location + Brand */}
        <div className="flex min-w-0 flex-col">
          <span className="text-[10px] font-medium text-kinali-gold sm:text-xs">
            Güngören / İstanbul
          </span>
          <Link href="/" className="mt-0.5 sm:mt-1">
            <h1 className="font-display text-lg font-bold tracking-wide text-kinali-gold sm:text-2xl md:text-3xl">
              KINALI ELEKTRONİK
            </h1>
          </Link>
          <p className="mt-0.5 text-[10px] text-kinali-gold-light/80 sm:text-xs md:text-sm">
            Telefon - Tablet - TV Tamiri & Parça Satışı
          </p>
        </div>

        {/* Right: Phone */}
        <Link
          href={`tel:${phoneNumber}`}
          className="flex shrink-0 items-center gap-1.5 rounded-lg bg-white/10 px-2 py-1.5 text-white transition hover:bg-white/20 sm:gap-2 sm:px-3 sm:py-2"
          aria-label="Telefon ile ara"
        >
          <svg
            className="h-4 w-4 text-[#7CB342] sm:h-5 sm:w-5"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
          </svg>
          <span className="text-xs font-semibold sm:text-sm md:text-base">
            {formatPhoneDisplay(phoneNumber)}
          </span>
        </Link>
      </div>
    </header>
  );
}
