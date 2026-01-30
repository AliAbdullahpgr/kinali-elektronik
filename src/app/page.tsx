import { api, HydrateClient } from "~/trpc/server";
import { CategoryGrid } from "./_components/category-grid";
import { FeaturedProducts } from "./_components/featured-products";
import { Header } from "./_components/header";
import { SearchBar } from "./_components/search-bar";
import { StickyCta } from "./_components/sticky-cta";

export default async function Home() {
  const [categories, featured] = await Promise.all([
    api.category.list(),
    api.product.featured(),
  ]);

  return (
    <HydrateClient>
      <main className="min-h-screen bg-kinali-bg pb-24">
        {/* Header */}
        <Header />

        {/* Search Bar */}
        <SearchBar categories={categories} />

        {/* Categories */}
        <div className="py-4">
          <CategoryGrid categories={categories} />
        </div>

        {/* Featured Products */}
        <div className="py-4">
          <FeaturedProducts products={featured} />
        </div>

        {/* Sticky CTA */}
        <StickyCta />
      </main>
    </HydrateClient>
  );
}
