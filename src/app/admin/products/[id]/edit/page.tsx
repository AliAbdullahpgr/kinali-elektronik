import { notFound } from "next/navigation";
import { api } from "~/trpc/server";
import { ProductForm } from "../../new/product-form";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;
  const [product, categories] = await Promise.all([
    api.product.byId({ id }),
    api.category.list(),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-8">
      <h1 className="text-2xl font-semibold text-gray-900">Ürünü Düzenle</h1>
      <ProductForm categories={categories} product={product} />
    </main>
  );
}
