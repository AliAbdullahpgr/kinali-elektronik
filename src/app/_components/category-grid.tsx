import Link from "next/link";

type Category = {
  id: string;
  name: string;
  slug: string;
  imageUrl: string | null;
};

export function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <section className="px-3 sm:px-4">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/kategori/${category.slug}`}
            className="flex flex-col items-center gap-1.5 rounded-xl bg-white p-3 shadow-sm transition hover:shadow-md sm:gap-2 sm:p-4"
          >
            <div className="flex h-16 w-full items-center justify-center sm:h-20 md:h-24">
              <img
                src={category.imageUrl ?? "/placeholder-category.svg"}
                alt={category.name}
                className="h-full w-auto max-w-full object-contain"
                loading="lazy"
              />
            </div>
            <span className="text-center text-[11px] font-semibold leading-tight text-gray-800 sm:text-xs md:text-sm">
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
