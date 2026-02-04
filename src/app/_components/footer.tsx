import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-dark text-white pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <h2 className="font-display text-2xl font-bold tracking-tight text-white">
              KINALI<span className="text-brand-gold">.</span>
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              Güngören'in en güvenilir elektronik teknik servisi. Apple, Samsung, Xiaomi ve tüm markalarda uzman onarım.
            </p>
            <div className="flex gap-4 pt-2">
              {/* Social Icons (Placeholders) */}
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-gold hover:text-brand-dark transition-colors cursor-pointer"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3 8h6v1h-6v-1zm3 8c-2.347 0-4.48-1.034-5.918-2.657l1.378-1.528c1.071 1.206 2.655 1.968 4.408 1.968 1.769 0 3.368-.778 4.444-2l1.328 1.554c-1.428 1.671-3.602 2.748-5.969 2.748l.329.006z" />
                  </svg>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-brand-gold mb-6">
              Hızlı Erişim
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              {[
                "Telefon Tamiri",
                "Tablet Servisi",
                "TV Onarım",
                "Aksesuar",
                "Yedek Parça",
              ].map((item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-brand-gold mb-6">
              İletişim
            </h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <svg
                  className="h-5 w-5 text-gray-500 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>
                  Merkez Mah. Fevzi Çakmak Cad. No:12/A
                  <br />
                  Güngören / İstanbul
                </span>
              </li>
              <li className="flex items-center gap-3">
                <svg
                  className="h-5 w-5 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span>+90 555 993 77 07</span>
              </li>
              <li className="flex items-center gap-3">
                <svg
                  className="h-5 w-5 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>info@kinalielektronik.com</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Hours */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-brand-gold mb-6">
              Çalışma Saatleri
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex justify-between">
                <span>Hafta İçi</span>
                <span className="text-white">09:00 - 20:00</span>
              </li>
              <li className="flex justify-between">
                <span>Cumartesi</span>
                <span className="text-white">09:00 - 20:00</span>
              </li>
              <li className="flex justify-between">
                <span>Pazar</span>
                <span className="text-white">11:00 - 18:00</span>
              </li>
            </ul>
            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="bg-white/5 rounded p-3 text-center text-xs text-gray-500">
                15 Yıllık Tecrübe ile Hizmetinizdeyiz
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8 flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-xs text-slate-200">
            &copy; {currentYear} Kınalı Elektronik. Tüm hakları saklıdır.
          </p>
          <div className="flex gap-4 text-xs text-slate-200">
            <Link href="#" className="hover:text-white transition-colors">
              Gizlilik Politikası
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Kullanım Şartları
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
