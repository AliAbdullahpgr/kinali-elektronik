"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";

const phoneNumber = process.env.NEXT_PUBLIC_CALL_NUMBER ?? "+90 555 993 77 07";

function formatPhoneDisplay(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("90")) {
    return `0${digits.slice(2, 5)} ${digits.slice(5, 8)} ${digits.slice(
      8,
      10
    )} ${digits.slice(10)}`;
  }
  return phone;
}

export function Header() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setSearchQuery(searchParams.get("q") ?? "");
  }, [searchParams]);

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = searchQuery.trim();
    if (!trimmed) return;
    setIsSearchOpen(false);
    router.push(`/arama?q=${encodeURIComponent(trimmed)}`);
  };

  return (
    <>
      <div className="bg-brand-dark text-white px-4 py-2 text-[10px] sm:text-xs font-medium tracking-wider flex justify-between items-center z-50 relative">
        <span className="opacity-80">
          GÜNGÖREN / İSTANBUL - HAFTANIN 7 GÜNÜ AÇIK
        </span>
        <a
          href={`tel:${phoneNumber}`}
          className="hover:text-brand-gold transition-colors"
        >
          {formatPhoneDisplay(phoneNumber)}
        </a>
      </div>

      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 border-b ${
          scrolled
            ? "border-brand-gray/10 bg-surface-50/80 backdrop-blur-xl shadow-lg shadow-black/5"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="group flex flex-col justify-center">
            <h1
              className={`font-display text-2xl font-bold tracking-tight transition-colors duration-300 ${
                scrolled ? "text-brand-dark" : "text-brand-dark"
              }`}
            >
              KINALI<span className="text-brand-gold">.</span>
            </h1>
          </Link>

          <div className="flex items-center gap-3">
            <form
              onSubmit={handleSearchSubmit}
              className="hidden lg:flex items-center gap-2 rounded-full bg-surface-100 px-3 py-2 ring-1 ring-black/5"
              role="search"
            >
              <svg
                className="h-4 w-4 text-text-secondary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Ürün ara..."
                className="w-48 bg-transparent text-xs text-brand-dark placeholder:text-text-secondary focus:outline-none"
                aria-label="Ürün ara"
              />
              <button
                type="submit"
                className="rounded-full bg-brand-dark px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white transition hover:bg-black"
              >
                Ara
              </button>
            </form>

            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="rounded-full p-2 text-text-secondary hover:bg-surface-200 transition-colors lg:hidden"
              aria-label="Ara"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
            <Link
              href={`tel:${phoneNumber}`}
              className="hidden sm:flex items-center gap-2 rounded-full bg-brand-dark px-5 py-2.5 text-xs font-bold text-white transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-brand-dark/20"
            >
              <span>HEMEN ARA</span>
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
            </Link>
          </div>
        </div>
      </header>

      {isSearchOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 px-4 pt-24 lg:hidden"
          onClick={() => setIsSearchOpen(false)}
        >
          <div
            className="mx-auto w-full max-w-lg"
            onClick={(event) => event.stopPropagation()}
          >
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center gap-2 rounded-2xl bg-white p-4 shadow-xl"
              role="search"
            >
              <svg
                className="h-5 w-5 text-text-secondary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Ürün ara..."
                className="flex-1 text-sm text-brand-dark placeholder:text-text-secondary focus:outline-none"
                aria-label="Ürün ara"
                autoFocus
              />
              <button
                type="submit"
                className="rounded-full bg-brand-dark px-4 py-2 text-xs font-bold uppercase tracking-wide text-white"
              >
                Ara
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
