import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-surface-50 pb-20 pt-16 sm:pb-32 sm:pt-24 lg:pb-40">
      {/* Abstract Background Decoration */}
      <div className="absolute left-1/2 top-0 w-full -translate-x-1/2 transform">
        <div className="absolute -top-24 left-0 h-[500px] w-[500px] rounded-full bg-brand-gold/10 blur-[100px]" />
        <div className="absolute right-0 top-32 h-[300px] w-[300px] rounded-full bg-brand-dark/5 blur-[80px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex overflow-hidden rounded-full border border-brand-dark/10 bg-white/50 px-4 py-1.5 backdrop-blur-sm">
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-dark sm:text-xs">
              Premium Elektronik Tamir & Parça
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-brand-dark sm:text-5xl md:text-6xl lg:text-7xl">
            Teknolojinize <br className="hidden sm:block" />
            <span className="relative bg-gradient-to-r from-brand-gold to-yellow-600 bg-clip-text text-transparent">
              Profesyonel Dokunuş
              <svg
                className="absolute -bottom-1 left-0 h-3 w-full text-brand-gold/30 -z-10"
                viewBox="0 0 200 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.00025 6.99997C25.0009 10.9999 71.0016 14.4999 87.0019 3.49997C103.002 -7.50001 106.002 12.9998 198.006 1.99997"
                  stroke="currentColor"
                  strokeWidth="3"
                />
              </svg>
            </span>
          </h1>

          {/* Subheading */}
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg md:text-xl">
            Telefon, tablet ve televizyon tamirinde 15 yıllık güven.
            Orijinal yedek parça ve garantili işçilik ile cihazlarınızı ilk günkü performansına kavuşturuyoruz.
          </p>

          {/* Actions */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="#products"
              className="inline-flex items-center justify-center rounded-lg bg-brand-dark px-8 py-4 text-sm font-bold text-white shadow-brand-dark/20 transition-all hover:bg-black hover:shadow-lg"
            >
              Ürünleri İncele
            </Link>
            <Link
              href={`https://wa.me/${(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "+90 555 993 77 07").replace(/\D/g, "")}`}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#22C55E] px-8 py-4 text-sm font-bold text-white shadow-lg shadow-[#22C55E]/30 transition-all hover:bg-[#1FB456]"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M20.52 3.48A11.9 11.9 0 0012.06 0 11.95 11.95 0 00.11 11.94c0 2.1.55 4.15 1.6 5.96L0 24l6.25-1.64a11.94 11.94 0 005.8 1.48h.01A11.95 11.95 0 0024 11.9c0-3.18-1.24-6.17-3.48-8.42zM12.06 21.5h-.01a9.57 9.57 0 01-4.88-1.34l-.35-.2-3.71.97.99-3.62-.23-.36a9.58 9.58 0 01-1.47-5.11A9.65 9.65 0 0112.06 2.4c2.57 0 4.99 1 6.8 2.82a9.6 9.6 0 012.82 6.79c0 5.32-4.33 9.49-9.62 9.49zm5.29-7.17c-.29-.15-1.7-.84-1.97-.93-.26-.1-.46-.15-.65.15-.19.29-.75.93-.92 1.12-.17.2-.34.22-.63.07-.29-.15-1.23-.45-2.35-1.43-.87-.78-1.46-1.74-1.63-2.03-.17-.29-.02-.45.13-.6.13-.13.29-.34.43-.52.15-.17.2-.29.3-.49.1-.19.05-.36-.02-.52-.08-.15-.67-1.58-.92-2.16-.24-.56-.49-.48-.67-.49l-.57-.01c-.19 0-.51.07-.78.36-.27.29-1.02 1-1.02 2.42s1.04 2.79 1.19 2.98c.15.19 2.05 3.12 4.98 4.37.7.3 1.24.48 1.67.62.7.22 1.34.19 1.84.12.56-.08 1.7-.7 1.94-1.39.24-.68.24-1.27.17-1.39-.07-.12-.26-.19-.55-.34z" />
              </svg>
              WhatsApp'tan Yaz
            </Link>
          </div>

          {/* Stats / Trust Signals */}
          <div className="mt-16 grid w-full max-w-4xl grid-cols-2 gap-8 border-t border-brand-gray/10 pt-8 sm:mt-24 sm:grid-cols-4">
            {[
              { label: "Mutlu Müşteri", value: "10K+" },
              { label: "Yıllık Tecrübe", value: "15+" },
              { label: "Garanti", value: "%100" },
              { label: "Hızlı Teslimat", value: "24s" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <span className="font-display text-2xl font-bold text-brand-dark sm:text-3xl">
                  {stat.value}
                </span>
                <span className="mt-1 text-xs font-medium uppercase tracking-wider text-text-secondary">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
