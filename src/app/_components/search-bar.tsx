"use client";

import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";

type Category = {
  id: string;
  name: string;
  slug: string;
};

export function SearchBar({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "+90 555 993 77 07";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    const params = new URLSearchParams({ q: trimmed });
    if (category !== "all") {
      params.set("category", category);
    }
    router.push(`/arama?${params.toString()}`);
  };

  const selectedCategory = categories.find((c) => c.slug === category);

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-2 bg-kinali-bg px-3 py-2.5 sm:flex-row sm:items-center sm:gap-3 sm:px-4 sm:py-3"
    >
      {/* Category Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-kinali-teal px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-kinali-teal/90 sm:w-auto sm:px-4"
          aria-expanded={isDropdownOpen}
          aria-haspopup="listbox"
        >
          <svg
            className="h-4 w-4 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <span className="truncate">
            {selectedCategory?.name ?? "Kategoriler"}
          </span>
        </button>

        {isDropdownOpen && (
          <div
            className="absolute left-0 top-full z-50 mt-1 max-h-64 w-56 overflow-y-auto rounded-lg bg-white py-1 shadow-lg"
            role="listbox"
          >
            <button
              type="button"
              onClick={() => {
                setCategory("all");
                setIsDropdownOpen(false);
              }}
              className={`w-full px-4 py-2.5 text-left text-sm ${
                category === "all"
                  ? "bg-kinali-teal/10 font-semibold text-kinali-teal"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
              role="option"
              aria-selected={category === "all"}
            >
              Tüm Kategoriler
            </button>
            {categories.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setCategory(item.slug);
                  setIsDropdownOpen(false);
                }}
                className={`w-full px-4 py-2.5 text-left text-sm ${
                  category === item.slug
                    ? "bg-kinali-teal/10 font-semibold text-kinali-teal"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
                role="option"
                aria-selected={category === item.slug}
              >
                {item.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Search Input */}
      <div className="relative flex-1">
        <svg
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
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
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Ürün arayın..."
          className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 focus:border-kinali-teal focus:outline-none focus:ring-1 focus:ring-kinali-teal"
          aria-label="Ürün ara"
        />
      </div>

      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${whatsappNumber.replace(/\D/g, "")}`}
        className="flex items-center justify-center gap-2 rounded-lg bg-kinali-whatsapp px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-kinali-whatsapp/90 sm:px-4"
        aria-label="WhatsApp ile iletişime geç"
      >
        <svg
          className="h-4 w-4 shrink-0"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        <span className="hidden sm:inline">WhatsApp ile İletişime Geç</span>
        <span className="sm:hidden">WhatsApp</span>
      </a>
    </form>
  );
}
