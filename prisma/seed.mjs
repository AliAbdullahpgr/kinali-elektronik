import pkg from "bcryptjs";
const { hash } = pkg;
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const categorySeed = [
  { name: "Anakart", slug: "anakart", imageUrl: "https://picsum.photos/seed/anakart/200/200" },
  { name: "Güç Kartları", slug: "guc-kartlari", imageUrl: "https://picsum.photos/seed/guckart/200/200" },
  { name: "Panel", slug: "panel", imageUrl: "https://picsum.photos/seed/panel/200/200" },
  { name: "Backlight", slug: "backlight", imageUrl: "https://picsum.photos/seed/backlight/200/200" },
  { name: "Hoparlör", slug: "hoparlor", imageUrl: "https://picsum.photos/seed/hoparlor/200/200" },
  { name: "Kablolar", slug: "kablolar", imageUrl: "https://picsum.photos/seed/kablo/200/200" },
  { name: "Adaptör", slug: "adaptor", imageUrl: "https://picsum.photos/seed/adaptor/200/200" },
  { name: "Aksesuar", slug: "aksesuar", imageUrl: "https://picsum.photos/seed/aksesuar/200/200" },
];

const productsSeed = [
  // Anakart products
  {
    title: "Samsung TV Anakart BN94-14352A",
    slug: "samsung-tv-anakart-bn94-14352a",
    description: "Samsung LED TV için orijinal anakart. 55 inç modellere uyumludur. Test edilmiş ve çalışır durumda.",
    price: 2750,
    productCode: "BN94-14352A",
    brand: "Samsung",
    condition: "Yeni",
    isFeatured: true,
    categorySlug: "anakart",
    images: ["https://picsum.photos/seed/sam1/400/400", "https://picsum.photos/seed/sam1b/400/400"],
  },
  {
    title: "LG TV Anakart EBT65293301",
    slug: "lg-tv-anakart-ebt65293301",
    description: "LG OLED TV için anakart. 65 inç modeller için uygundur.",
    price: 3200,
    productCode: "EBT65293301",
    brand: "LG",
    condition: "Yeni",
    isFeatured: true,
    categorySlug: "anakart",
    images: ["https://picsum.photos/seed/lg1/400/400"],
  },
  {
    title: "Sony Bravia Anakart 1-983-249-21",
    slug: "sony-bravia-anakart-1-983-249-21",
    description: "Sony Bravia 4K TV için ana kart. 55-65 inç modellere uygun.",
    price: 4100,
    productCode: "1-983-249-21",
    brand: "Sony",
    condition: "Yeni",
    isFeatured: false,
    categorySlug: "anakart",
    images: ["https://picsum.photos/seed/sony1/400/400"],
  },
  {
    title: "Vestel Anakart 17MB211S",
    slug: "vestel-anakart-17mb211s",
    description: "Vestel ve Regal TV modelleri için uyumlu anakart.",
    price: 1450,
    productCode: "17MB211S",
    brand: "Vestel",
    condition: "Çıkma",
    isFeatured: false,
    categorySlug: "anakart",
    images: ["https://picsum.photos/seed/vestel1/400/400"],
  },

  // Güç Kartları
  {
    title: "Samsung Güç Kartı BN44-00932B",
    slug: "samsung-guc-karti-bn44-00932b",
    description: "Samsung QLED TV için güç kaynağı kartı. Orijinal yedek parça.",
    price: 1850,
    productCode: "BN44-00932B",
    brand: "Samsung",
    condition: "Yeni",
    isFeatured: true,
    categorySlug: "guc-kartlari",
    images: ["https://picsum.photos/seed/guc1/400/400", "https://picsum.photos/seed/guc1b/400/400"],
  },
  {
    title: "LG Güç Kartı EAY64908601",
    slug: "lg-guc-karti-eay64908601",
    description: "LG NanoCell TV serisi için güç kartı.",
    price: 2100,
    productCode: "EAY64908601",
    brand: "LG",
    condition: "Yeni",
    isFeatured: true,
    categorySlug: "guc-kartlari",
    images: ["https://picsum.photos/seed/guc2/400/400"],
  },
  {
    title: "Philips Güç Kartı 715G9309",
    slug: "philips-guc-karti-715g9309",
    description: "Philips LED TV modelleri için güç kaynağı.",
    price: 1350,
    productCode: "715G9309",
    brand: "Philips",
    condition: "Çıkma",
    isFeatured: false,
    categorySlug: "guc-kartlari",
    images: ["https://picsum.photos/seed/guc3/400/400"],
  },

  // Panel
  {
    title: "Samsung 55\" LED Panel LC550EGY",
    slug: "samsung-55-led-panel-lc550egy",
    description: "Samsung 55 inç TV için yedek LED panel. Full HD çözünürlük.",
    price: 8500,
    productCode: "LC550EGY-SKM2",
    brand: "Samsung",
    condition: "Yeni",
    isFeatured: true,
    categorySlug: "panel",
    images: ["https://picsum.photos/seed/panel1/400/400"],
  },
  {
    title: "LG 43\" IPS Panel LC430DUY",
    slug: "lg-43-ips-panel-lc430duy",
    description: "LG 43 inç TV için IPS panel. 4K UHD destekli.",
    price: 6200,
    productCode: "LC430DUY-SHA1",
    brand: "LG",
    condition: "Yeni",
    isFeatured: false,
    categorySlug: "panel",
    images: ["https://picsum.photos/seed/panel2/400/400"],
  },

  // Backlight
  {
    title: "Samsung 55\" LED Bar Seti",
    slug: "samsung-55-led-bar-seti",
    description: "Samsung 55 inç TV için 12 parça LED bar aydınlatma seti.",
    price: 950,
    productCode: "BN96-45913A",
    brand: "Samsung",
    condition: "Yeni",
    isFeatured: true,
    categorySlug: "backlight",
    images: ["https://picsum.photos/seed/back1/400/400", "https://picsum.photos/seed/back1b/400/400"],
  },
  {
    title: "LG 49\" LED Strip Kit",
    slug: "lg-49-led-strip-kit",
    description: "LG 49 inç TV modelleri için LED aydınlatma kiti.",
    price: 750,
    productCode: "AGF79045601",
    brand: "LG",
    condition: "Yeni",
    isFeatured: false,
    categorySlug: "backlight",
    images: ["https://picsum.photos/seed/back2/400/400"],
  },
  {
    title: "Universal 32\" LED Bar",
    slug: "universal-32-led-bar",
    description: "32 inç TV'ler için universal LED aydınlatma çubuğu.",
    price: 350,
    productCode: "UNI-32-LED",
    brand: "Universal",
    condition: "Yeni",
    isFeatured: false,
    categorySlug: "backlight",
    images: ["https://picsum.photos/seed/back3/400/400"],
  },

  // Hoparlör
  {
    title: "Samsung Soundbar Hoparlör Seti",
    slug: "samsung-soundbar-hoparlor-seti",
    description: "Samsung TV için dahili hoparlör seti. Stereo ses.",
    price: 450,
    productCode: "BN96-39820B",
    brand: "Samsung",
    condition: "Yeni",
    isFeatured: false,
    categorySlug: "hoparlor",
    images: ["https://picsum.photos/seed/hop1/400/400"],
  },
  {
    title: "LG TV Hoparlör Çifti",
    slug: "lg-tv-hoparlor-cifti",
    description: "LG LED TV için orijinal hoparlör seti.",
    price: 380,
    productCode: "EAB64028302",
    brand: "LG",
    condition: "Çıkma",
    isFeatured: false,
    categorySlug: "hoparlor",
    images: ["https://picsum.photos/seed/hop2/400/400"],
  },

  // Kablolar
  {
    title: "LVDS Kablo Seti 51 Pin",
    slug: "lvds-kablo-seti-51-pin",
    description: "TV anakart-panel bağlantısı için 51 pin LVDS kablo.",
    price: 120,
    productCode: "LVDS-51P",
    brand: "Universal",
    condition: "Yeni",
    isFeatured: false,
    categorySlug: "kablolar",
    images: ["https://picsum.photos/seed/kablo1/400/400"],
  },
  {
    title: "T-Con Flex Kablo",
    slug: "t-con-flex-kablo",
    description: "T-Con kart bağlantısı için flex kablo.",
    price: 85,
    productCode: "TCON-FLEX",
    brand: "Universal",
    condition: "Yeni",
    isFeatured: false,
    categorySlug: "kablolar",
    images: ["https://picsum.photos/seed/kablo2/400/400"],
  },
  {
    title: "IR Sensör Kablosu",
    slug: "ir-sensor-kablosu",
    description: "TV IR sensör modülü bağlantı kablosu.",
    price: 45,
    productCode: "IR-CABLE",
    brand: "Universal",
    condition: "Yeni",
    isFeatured: false,
    categorySlug: "kablolar",
    images: ["https://picsum.photos/seed/kablo3/400/400"],
  },

  // Adaptör
  {
    title: "Samsung 19V 4.74A Adaptör",
    slug: "samsung-19v-474a-adaptor",
    description: "Samsung monitör ve TV için güç adaptörü.",
    price: 280,
    productCode: "AD-9019S",
    brand: "Samsung",
    condition: "Yeni",
    isFeatured: true,
    categorySlug: "adaptor",
    images: ["https://picsum.photos/seed/adap1/400/400"],
  },
  {
    title: "LG 24V 2.5A Adaptör",
    slug: "lg-24v-25a-adaptor",
    description: "LG TV ve monitör için orijinal güç adaptörü.",
    price: 320,
    productCode: "LCAP45",
    brand: "LG",
    condition: "Yeni",
    isFeatured: false,
    categorySlug: "adaptor",
    images: ["https://picsum.photos/seed/adap2/400/400"],
  },
  {
    title: "Universal 12V 5A Adaptör",
    slug: "universal-12v-5a-adaptor",
    description: "LED strip ve küçük cihazlar için universal adaptör.",
    price: 150,
    productCode: "UNI-12V5A",
    brand: "Universal",
    condition: "Yeni",
    isFeatured: false,
    categorySlug: "adaptor",
    images: ["https://picsum.photos/seed/adap3/400/400"],
  },

  // Aksesuar
  {
    title: "TV Duvar Askı Aparatı 32-65\"",
    slug: "tv-duvar-aski-aparati-32-65",
    description: "32-65 inç TV'ler için universal duvar montaj aparatı.",
    price: 180,
    productCode: "WALL-3265",
    brand: "Universal",
    condition: "Yeni",
    isFeatured: true,
    categorySlug: "aksesuar",
    images: ["https://picsum.photos/seed/aks1/400/400"],
  },
  {
    title: "HDMI Kablo 2m 4K",
    slug: "hdmi-kablo-2m-4k",
    description: "4K HDR destekli 2 metre HDMI 2.1 kablo.",
    price: 95,
    productCode: "HDMI-2M-4K",
    brand: "Universal",
    condition: "Yeni",
    isFeatured: false,
    categorySlug: "aksesuar",
    images: ["https://picsum.photos/seed/aks2/400/400"],
  },
  {
    title: "Uzaktan Kumanda Samsung Smart TV",
    slug: "uzaktan-kumanda-samsung-smart-tv",
    description: "Samsung Smart TV serisi için uyumlu uzaktan kumanda.",
    price: 125,
    productCode: "BN59-01312A",
    brand: "Samsung",
    condition: "Yeni",
    isFeatured: false,
    categorySlug: "aksesuar",
    images: ["https://picsum.photos/seed/aks3/400/400"],
  },
  {
    title: "LG Magic Remote Kumanda",
    slug: "lg-magic-remote-kumanda",
    description: "LG WebOS TV için Magic Remote kumanda.",
    price: 350,
    productCode: "AN-MR20GA",
    brand: "LG",
    condition: "Yeni",
    isFeatured: true,
    categorySlug: "aksesuar",
    images: ["https://picsum.photos/seed/aks4/400/400"],
  },
];

function normalizeProductCode(code) {
  return code.toLowerCase().replace(/[^a-z0-9]/g, "");
}

async function main() {
  console.log("Seeding database...");

  // Seed categories
  const existingCategories = await prisma.category.count();
  if (existingCategories === 0) {
    console.log("Creating categories...");
    await prisma.category.createMany({
      data: categorySeed,
    });
  }

  // Get all categories for reference
  const categories = await prisma.category.findMany();
  const categoryMap = new Map(categories.map((c) => [c.slug, c.id]));

  // Seed admin user
  const adminEmail = process.env.ADMIN_SEED_EMAIL ?? "admin@kinali.local";
  const adminPassword = process.env.ADMIN_SEED_PASSWORD ?? "admin1234";

  const admin = await prisma.adminUser.findUnique({
    where: { email: adminEmail },
  });

  if (!admin) {
    console.log("Creating admin user...");
    const passwordHash = await hash(adminPassword, 10);
    await prisma.adminUser.create({
      data: {
        email: adminEmail,
        name: "Kınalı Admin",
        passwordHash,
      },
    });
    console.log(`Admin created: ${adminEmail} / ${adminPassword}`);
  }

  // Seed products
  const existingProducts = await prisma.product.count();
  if (existingProducts === 0) {
    console.log("Creating products...");
    for (const product of productsSeed) {
      const categoryId = categoryMap.get(product.categorySlug);
      if (!categoryId) {
        console.warn(`Category not found: ${product.categorySlug}`);
        continue;
      }

      await prisma.product.create({
        data: {
          title: product.title,
          slug: product.slug,
          description: product.description,
          price: product.price,
          productCode: product.productCode,
          normalizedProductCode: normalizeProductCode(product.productCode),
          brand: product.brand,
          condition: product.condition,
          isFeatured: product.isFeatured,
          isActive: true,
          categoryId,
          images: {
            create: product.images.map((url, index) => ({
              url,
              alt: product.title,
              position: index,
            })),
          },
        },
      });
    }
    console.log(`Created ${productsSeed.length} products`);
  }

  console.log("Seeding complete!");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
