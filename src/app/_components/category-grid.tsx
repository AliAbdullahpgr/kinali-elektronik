import Link from "next/link";

type Category = {
  id: string;
  name: string;
  slug: string;
  imageUrl: string | null;
};

export function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <section className="px-4 py-6 sm:px-6">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/kategori/${category.slug}`}
            className="group flex flex-col items-center gap-4 rounded-2xl bg-white p-4 text-center shadow-sm ring-1 ring-gray-100 transition-all hover:scale-105 hover:shadow-lg sm:p-6"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-50 p-4 transition-colors group-hover:bg-kinali-bg sm:h-24 sm:w-24">
              <img
                src={category.imageUrl ?? "/placeholder-category.svg"}
                alt={category.name}
                className="h-full w-full object-contain opacity-80 group-hover:opacity-100"
                loading="lazy"
              />
            </div>
            <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 sm:text-base">
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
