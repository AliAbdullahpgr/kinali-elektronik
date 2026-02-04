import { api } from "~/trpc/server";
import { ProductForm } from "./product-form";

export default async function NewProductPage() {
  const categories = await api.category.list();
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-8">
      <h1 className="text-2xl font-semibold text-gray-900">Yeni rn</h1>
      <ProductForm categories={categories} />
    </main>
  );
}
