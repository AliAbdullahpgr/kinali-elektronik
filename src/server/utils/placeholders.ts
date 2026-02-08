import { Prisma } from "@prisma/client";
import type { Category, Product, ProductImage } from "@prisma/client";

import { toCompactTurkishSearchKey, toTurkishSearchKey } from "~/lib/turkish";

type ProductWithImages = Product & { images: ProductImage[] };
type ProductWithCategoryAndImages = Product & {
  images: ProductImage[];
  category: Category;
};

const now = new Date();

const createSearchNormalized = (
  title: string,
  productCode: string,
  brand?: string | null
) => toCompactTurkishSearchKey(`${title} ${productCode} ${brand ?? ""}`);

export const placeholderCategories: Category[] = [
  {
    id: "cat-1",
    name: "Anakart",
    slug: "anakart",
    imageUrl: "/placeholder-category.svg",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "cat-2",
    name: "Güç Kartları",
    slug: "guc-kartlari",
    imageUrl: "/placeholder-category.svg",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "cat-3",
    name: "Panel",
    slug: "panel",
    imageUrl: "/placeholder-category.svg",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "cat-4",
    name: "Backlight",
    slug: "backlight",
    imageUrl: "/placeholder-category.svg",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "cat-5",
    name: "Hoparlör",
    slug: "hoparlor",
    imageUrl: "/placeholder-category.svg",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "cat-6",
    name: "Kablolar",
    slug: "kablolar",
    imageUrl: "/placeholder-category.svg",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "cat-7",
    name: "Adaptör",
    slug: "adaptor",
    imageUrl: "/placeholder-category.svg",
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "cat-8",
    name: "Aksesuar",
    slug: "aksesuar",
    imageUrl: "/placeholder-category.svg",
    createdAt: now,
    updatedAt: now,
  },
];

const makeImage = (
  id: string,
  productId: string,
  position: number
): ProductImage => ({
  id,
  productId,
  url: "/placeholder-product.svg",
  alt: "Örnek ürün",
  position,
  width: null,
  height: null,
  createdAt: now,
});

export const placeholderProducts: ProductWithCategoryAndImages[] = [
  {
    id: "prod-1",
    title: "Samsung TV Anakart BN94",
    slug: "samsung-tv-anakart-bn94",
    description: "Örnek ürün açıklaması.",
    price: new Prisma.Decimal(2750),
    currency: "TRY",
    productCode: "BN94-14352A",
    normalizedProductCode: "bn9414352a",
    searchNormalized: createSearchNormalized(
      "Samsung TV Anakart BN94",
      "BN94-14352A",
      "Samsung"
    ),
    brand: "Samsung",
    condition: "Yeni",
    isFeatured: true,
    isActive: true,
    categoryId: "cat-1",
    createdAt: now,
    updatedAt: now,
    images: [makeImage("img-1", "prod-1", 0)],
    category: placeholderCategories[0]!,
  },
  {
    id: "prod-2",
    title: "Vestel Güç Kartı 17IPS20",
    slug: "vestel-guc-karti-17ips20",
    description: "Örnek ürün açıklaması.",
    price: new Prisma.Decimal(1450),
    currency: "TRY",
    productCode: "17IPS20",
    normalizedProductCode: "17ips20",
    searchNormalized: createSearchNormalized(
      "Vestel Güç Kartı 17IPS20",
      "17IPS20",
      "Vestel"
    ),
    brand: "Vestel",
    condition: "Yeni",
    isFeatured: true,
    isActive: true,
    categoryId: "cat-2",
    createdAt: now,
    updatedAt: now,
    images: [makeImage("img-2", "prod-2", 0)],
    category: placeholderCategories[1]!,
  },
  {
    id: "prod-3",
    title: 'LG Panel 43"',
    slug: "lg-panel-43",
    description: "Örnek ürün açıklaması.",
    price: new Prisma.Decimal(4200),
    currency: "TRY",
    productCode: "LC430DUH",
    normalizedProductCode: "lc430duh",
    searchNormalized: createSearchNormalized(
      'LG Panel 43"',
      "LC430DUH",
      "LG"
    ),
    brand: "LG",
    condition: "Çıkma",
    isFeatured: false,
    isActive: true,
    categoryId: "cat-3",
    createdAt: now,
    updatedAt: now,
    images: [makeImage("img-3", "prod-3", 0)],
    category: placeholderCategories[2]!,
  },
  {
    id: "prod-4",
    title: 'Backlight Set 55"',
    slug: "backlight-set-55",
    description: "Örnek ürün açıklaması.",
    price: new Prisma.Decimal(980),
    currency: "TRY",
    productCode: "BL-55-SET",
    normalizedProductCode: "bl55set",
    searchNormalized: createSearchNormalized(
      'Backlight Set 55"',
      "BL-55-SET",
      "Universal"
    ),
    brand: "Universal",
    condition: "Yeni",
    isFeatured: true,
    isActive: true,
    categoryId: "cat-4",
    createdAt: now,
    updatedAt: now,
    images: [makeImage("img-4", "prod-4", 0)],
    category: placeholderCategories[3]!,
  },
];

export const placeholderFeaturedProducts = placeholderProducts.filter(
  (product) => product.isFeatured && product.isActive
);

export const placeholderProductsByCategory = (
  slug: string
): ProductWithImages[] => {
  return placeholderProducts
    .filter((product) => product.category.slug === slug)
    .map(stripCategory);
};

export const placeholderProductBySlug = (slug: string) =>
  placeholderProducts.find((product) => product.slug === slug) ?? null;

export const placeholderSearchProducts = (query: string, categorySlug?: string) => {
  const normalized = toCompactTurkishSearchKey(query);
  const normalizedQuery = toTurkishSearchKey(query);
  if (!normalized && !normalizedQuery) {
    return [];
  }

  return placeholderProducts.filter((product) => {
    if (categorySlug && product.category.slug !== categorySlug) {
      return false;
    }

    const matchesTitle = normalizedQuery
      ? toTurkishSearchKey(product.title).includes(normalizedQuery)
      : false;
    const matchesCode = normalizedQuery
      ? toTurkishSearchKey(product.productCode).includes(normalizedQuery)
      : false;
    const matchesNormalized = normalized
      ? product.searchNormalized.includes(normalized)
      : false;

    return matchesTitle || matchesCode || matchesNormalized;
  });
};

export const placeholderAdminProducts = () => placeholderProducts;

const stripCategory = (product: ProductWithCategoryAndImages): ProductWithImages => {
  const { category, ...rest } = product;
  return rest;
};
