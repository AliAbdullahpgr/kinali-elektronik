import { Prisma } from "@prisma/client";
import type { Category, Product, ProductImage } from "@prisma/client";

type ProductWithImages = Product & { images: ProductImage[] };
type ProductWithCategoryAndImages = Product & {
  images: ProductImage[];
  category: Category;
};

const now = new Date();

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
    name: "Guc Kartlari",
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
    name: "Hoparlor",
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
    name: "Adaptor",
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
  alt: "Ornek urun",
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
    description: "Ornek urun aciklamasi.",
    price: new Prisma.Decimal(2750),
    currency: "TL",
    productCode: "BN94-14352A",
    normalizedProductCode: "bn9414352a",
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
    title: "Vestel Guc Karti 17IPS20",
    slug: "vestel-guc-karti-17ips20",
    description: "Ornek urun aciklamasi.",
    price: new Prisma.Decimal(1450),
    currency: "TL",
    productCode: "17IPS20",
    normalizedProductCode: "17ips20",
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
    title: "LG Panel 43\"",
    slug: "lg-panel-43",
    description: "Ornek urun aciklamasi.",
    price: new Prisma.Decimal(4200),
    currency: "TL",
    productCode: "LC430DUH",
    normalizedProductCode: "lc430duh",
    brand: "LG",
    condition: "Cikma",
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
    title: "Backlight Set 55\"",
    slug: "backlight-set-55",
    description: "Ornek urun aciklamasi.",
    price: new Prisma.Decimal(980),
    currency: "TL",
    productCode: "BL-55-SET",
    normalizedProductCode: "bl55set",
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

export const placeholderProductsByCategory = (slug: string): ProductWithImages[] => {
  return placeholderProducts
    .filter((product) => product.category.slug === slug)
    .map(stripCategory);
};

export const placeholderProductBySlug = (slug: string) =>
  placeholderProducts.find((product) => product.slug === slug) ?? null;

export const placeholderSearchProducts = (query: string, categorySlug?: string) => {
  const normalized = query.replace(/[-_\s]+/g, "").toLowerCase().trim();
  return placeholderProducts.filter((product) => {
    if (categorySlug && product.category.slug !== categorySlug) {
      return false;
    }
    const matchesQuery =
      product.title.toLowerCase().includes(query.toLowerCase()) ||
      product.productCode.toLowerCase().includes(query.toLowerCase()) ||
      product.normalizedProductCode.includes(normalized);
    return matchesQuery;
  });
};

export const placeholderAdminProducts = () => placeholderProducts;

const stripCategory = (product: ProductWithCategoryAndImages): ProductWithImages => {
  const { category, ...rest } = product;
  return rest;
};
