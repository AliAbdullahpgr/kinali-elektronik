import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-surface-50 pt-16 pb-20 sm:pt-24 sm:pb-32 lg:pb-40">
      {/* Abstract Background Decoration */}
      <div className="absolute top-0 left-1/2 w-full -translate-x-1/2 transform">
        <div className="absolute -top-24 left-0 h-[500px] w-[500px] rounded-full bg-brand-gold/10 blur-[100px]" />
        <div className="absolute top-32 right-0 h-[300px] w-[300px] rounded-full bg-brand-dark/5 blur-[80px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex overflow-hidden rounded-full border border-brand-dark/10 bg-white/50 py-1.5 px-4 backdrop-blur-sm">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-brand-dark">
              Premium Elektronik Tamir & Parça
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-brand-dark sm:text-5xl md:text-6xl lg:text-7xl">
            Teknolojinize <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-yellow-600 relative">
              Profesyonel Dokunuş
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-brand-gold/30 -z-10" viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.00025 6.99997C25.0009 10.9999 71.0016 14.4999 87.0019 3.49997C103.002 -7.50001 106.002 12.9998 198.006 1.99997" stroke="currentColor" strokeWidth="3"/></svg>
            </span>
          </h1>

          {/* Subheading */}
          <p className="mx-auto mt-6 max-w-2xl text-base text-text-secondary sm:text-lg md:text-xl leading-relaxed">
            Telefon, tablet ve televizyon tamirinde 15 yıllık güven. 
            Orijinal yedek parça ve garantili işçilik ile cihazlarınızı ilk günkü performansına kavuşturuyoruz.
          </p>

          {/* Actions */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="#products"
              className="inline-flex items-center justify-center rounded-lg bg-brand-dark px-8 py-4 text-sm font-bold text-white transition-all hover:bg-black hover:shadow-lg shadow-brand-dark/20"
            >
              Ürünleri İncele
            </Link>
            <Link
              href="https://wa.me/905551234567"
              className="inline-flex items-center justify-center rounded-lg border border-brand-gray/20 bg-white px-8 py-4 text-sm font-bold text-brand-dark transition-all hover:bg-surface-50 hover:border-brand-gray/40"
            >
              WhatsApp'tan Yaz
            </Link>
          </div>

          {/* Stats / Trust Signals */}
          <div className="mt-16 sm:mt-24 grid grid-cols-2 gap-8 sm:grid-cols-4 border-t border-brand-gray/10 pt-8 w-full max-w-4xl">
            {[
              { label: "Mutlu Müşteri", value: "10K+" },
              { label: "Yıllık Tecrübe", value: "15+" },
              { label: "Garanti", value: "%100" },
              { label: "Hızlı Teslimat", value: "24s" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <span className="font-display text-2xl font-bold text-brand-dark sm:text-3xl">{stat.value}</span>
                <span className="text-xs font-medium uppercase tracking-wider text-text-secondary mt-1">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
