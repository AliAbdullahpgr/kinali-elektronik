import Link from "next/link";

type Category = {
  id: string;
  name: string;
  slug: string;
  imageUrl: string | null;
};

export function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <section className="px-4 py-16 sm:px-6 bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <h2 className="font-display text-3xl font-bold text-brand-dark sm:text-4xl">Hizmetlerimiz ve Ürünler</h2>
          <p className="mt-4 text-text-secondary max-w-2xl mx-auto">
            İhtiyacınız olan çözüm için kategorilerimize göz atın.
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/kategori/${category.slug}`}
              className="group relative flex flex-col items-center overflow-hidden rounded-2xl bg-surface-50 p-6 transition-all duration-300 hover:bg-white hover:shadow-xl hover:shadow-brand-dark/5 hover:-translate-y-1 ring-1 ring-black/5 hover:ring-brand-gold/20"
            >
              <div className="relative mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-white p-4 shadow-sm ring-1 ring-gray-100 transition-transform duration-500 group-hover:scale-110 group-hover:ring-brand-gold/30">
                <img
                  src={category.imageUrl ?? "/placeholder-category.svg"}
                  alt={category.name}
                  className="h-full w-full object-contain p-2"
                  loading="lazy"
                />
              </div>
              
              <h3 className="text-center font-display text-sm font-bold text-brand-dark group-hover:text-brand-gold transition-colors">
                {category.name}
              </h3>
              
              <span className="mt-2 text-[10px] font-medium uppercase tracking-wider text-text-secondary opacity-0 transform translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 text-brand-gold">
                İncele &rarr;
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
