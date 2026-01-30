import Link from "next/link";

const phoneNumber = process.env.NEXT_PUBLIC_CALL_NUMBER ?? "+905551234567";

function formatPhoneDisplay(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("90")) {
    return `0${digits.slice(2, 5)} ${digits.slice(5, 8)} ${digits.slice(8, 10)} ${digits.slice(10)}`;
  }
  return phone;
}

"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const phoneNumber = process.env.NEXT_PUBLIC_CALL_NUMBER ?? "+905551234567";

function formatPhoneDisplay(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("90")) {
    return `0${digits.slice(2, 5)} ${digits.slice(5, 8)} ${digits.slice(8, 10)} ${digits.slice(10)}`;
  }
  return phone;
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Bar - Status Line */}
      <div className="bg-brand-dark text-white px-4 py-2 text-[10px] sm:text-xs font-medium tracking-wider flex justify-between items-center z-50 relative">
        <span className="opacity-80">GÜNGÖREN / İSTANBUL — HAFTANIN 7 GÜNÜ AÇIK</span>
        <a href={`tel:${phoneNumber}`} className="hover:text-brand-gold transition-colors">
          {formatPhoneDisplay(phoneNumber)}
        </a>
      </div>

      {/* Main Header */}
      <header 
        className={`sticky top-0 z-40 w-full transition-all duration-300 border-b ${
          scrolled 
            ? "border-brand-gray/10 bg-surface-50/80 backdrop-blur-xl shadow-lg shadow-black/5" 
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
          
          {/* Brand */}
          <Link href="/" className="group flex flex-col justify-center">
            <h1 className={`font-display text-2xl font-bold tracking-tight transition-colors duration-300 ${scrolled ? 'text-brand-dark' : 'text-brand-dark'}`}>
              KINALI<span className="text-brand-gold">.</span>
            </h1>
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {['Anasayfa', 'Kategoriler', 'Hakkımızda', 'İletişim'].map((item) => (
              <a 
                key={item} 
                href="#" 
                className="text-sm font-medium text-text-secondary hover:text-brand-gold transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-brand-gold after:transition-all hover:after:w-full"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Action Area */}
          <div className="flex items-center gap-3">
            <button 
              className="rounded-full p-2 text-text-secondary hover:bg-surface-200 transition-colors"
              aria-label="Search"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <Link
              href={`tel:${phoneNumber}`}
              className="hidden sm:flex items-center gap-2 rounded-full bg-brand-dark px-5 py-2.5 text-xs font-bold text-white transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-brand-dark/20"
            >
              <span>HEMEN ARA</span>
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" /></svg>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
