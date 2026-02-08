"use client";

import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { UploadDropzone } from "~/app/_components/uploadthing";
import { toRomanTurkishSlug } from "~/lib/turkish";
import { api } from "~/trpc/react";

type Category = {
  id: string;
  name: string;
};

type UploadImage = {
  id: string;
  url: string;
  name: string;
  width?: number;
  height?: number;
};

type Product = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  price: number | { toString(): string };
  productCode: string;
  brand: string | null;
  condition: string | null;
  isFeatured: boolean;
  isActive: boolean;
  categoryId: string | null;
  images: { id: string; url: string; alt: string | null }[];
};

function SortableImage({
  image,
  onRemove,
}: {
  image: UploadImage;
  onRemove: (id: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: image.id });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className="group flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3 transition-all duration-200 hover:border-gray-300 hover:shadow-md"
    >
      <button
        type="button"
        {...attributes}
        {...listeners}
        className="flex h-8 w-8 cursor-grab items-center justify-center rounded-lg bg-gray-100 text-gray-400 transition-all duration-200 hover:bg-gray-200 hover:text-gray-600 active:cursor-grabbing active:scale-95"
      >
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M7 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM7 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM7 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM13 14a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
        </svg>
      </button>
      <div className="relative h-14 w-14 overflow-hidden rounded-lg border border-gray-200 bg-gray-50 transition-transform duration-200 group-hover:scale-105">
        <img
          src={image.url}
          alt={image.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex-1 truncate text-sm text-gray-700">{image.name}</div>
      <button
        type="button"
        onClick={() => onRemove(image.id)}
        className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 transition-all duration-200 hover:bg-red-100 hover:scale-105 hover:shadow-sm"
      >
        Sil
      </button>
    </div>
  );
}

type FormErrors = {
  title?: string;
  price?: string;
  productCode?: string;
  categoryId?: string;
};

export function ProductForm({
  categories,
  product,
}: {
  categories: Category[];
  product?: Product;
}) {
  const router = useRouter();
  const isEditing = !!product;

  const [title, setTitle] = useState(product?.title ?? "");
  const [slug, setSlug] = useState(product?.slug ?? "");
  const [description, setDescription] = useState(product?.description ?? "");
  const [price, setPrice] = useState(product?.price?.toString() ?? "");
  const [productCode, setProductCode] = useState(product?.productCode ?? "");
  const [brand, setBrand] = useState(product?.brand ?? "");
  const [condition, setCondition] = useState(product?.condition ?? "Yeni");
  const [categoryId, setCategoryId] = useState(
    product?.categoryId ?? categories[0]?.id ?? ""
  );
  const [isFeatured, setIsFeatured] = useState(product?.isFeatured ?? false);
  const [isActive, setIsActive] = useState(product?.isActive ?? true);
  const [images, setImages] = useState<UploadImage[]>(
    product?.images?.map((img) => ({
      id: img.id,
      url: img.url,
      name: img.alt ?? "image",
    })) ?? []
  );
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isUploading, setIsUploading] = useState(false);

  const createProduct = api.product.create.useMutation({
    onSuccess: () => {
      setMessage({ type: "success", text: "Ürün başarıyla kaydedildi." });
      setTitle("");
      setSlug("");
      setDescription("");
      setPrice("");
      setProductCode("");
      setBrand("");
      setCondition("Yeni");
      setImages([]);
      setErrors({});
    },
    onError: (error) => {
      setMessage({
        type: "error",
        text: error.message || "Kayıt sırasında hata oluştu.",
      });
    },
  });

  const updateProduct = api.product.update.useMutation({
    onSuccess: () => {
      setMessage({ type: "success", text: "Ürün başarıyla güncellendi." });
      setErrors({});
      router.refresh();
    },
    onError: (error) => {
      setMessage({
        type: "error",
        text: error.message || "Güncelleme sırasında hata oluştu.",
      });
    },
  });

  const handleDragEnd = (event: DragEndEvent) => {
    if (!event.over || event.active.id === event.over.id) return;
    setImages((items) => {
      const oldIndex = items.findIndex((item) => item.id === event.active.id);
      const newIndex = items.findIndex((item) => item.id === event.over?.id);
      return arrayMove(items, oldIndex, newIndex);
    });
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!title.trim()) {
      newErrors.title = "Ürün adı zorunludur";
    }

    if (!price.trim()) {
      newErrors.price = "Fiyat zorunludur";
    } else if (isNaN(Number(price)) || Number(price) < 0) {
      newErrors.price = "Geçerli bir fiyat giriniz";
    }

    if (!productCode.trim()) {
      newErrors.productCode = "Ürün kodu zorunludur";
    }

    if (!categoryId) {
      newErrors.categoryId = "Kategori seçiniz";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null);

    if (!validateForm()) {
      return;
    }

    const data = {
      title,
      slug: slug || toRomanTurkishSlug(title),
      description: description || null,
      price: Number(price),
      productCode,
      brand: brand || null,
      condition: condition || null,
      isFeatured,
      isActive,
      categoryId,
    };

    if (isEditing && product) {
      updateProduct.mutate({ id: product.id, ...data });
    } else {
      createProduct.mutate({
        ...data,
        images: images.map((image, index) => ({
          url: image.url,
          alt: image.name,
          position: index,
          width: image.width,
          height: image.height,
        })),
      });
    }
  };

  const isPending = createProduct.isPending || updateProduct.isPending;

  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="title" className="text-xs font-medium text-gray-600">
            Ürün Adı <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            placeholder="Ürün adını giriniz"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
            className={`rounded-xl border bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 ${
              errors.title
                ? "border-red-300 focus:border-red-400 focus:ring-red-400"
                : "border-gray-300 focus:border-gray-400 focus:ring-gray-400"
            }`}
          />
          {errors.title && (
            <p className="text-xs text-red-500">{errors.title}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="slug" className="text-xs font-medium text-gray-600">
            URL Kısa Adı (opsiyonel)
          </label>
          <input
            id="slug"
            placeholder="otomatik-oluşturulur"
            value={slug}
            onChange={(event) => setSlug(event.target.value)}
            className="rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="price" className="text-xs font-medium text-gray-600">
            Fiyat <span className="text-red-500">*</span>
          </label>
          <input
            id="price"
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            required
            className={`rounded-xl border bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 ${
              errors.price
                ? "border-red-300 focus:border-red-400 focus:ring-red-400"
                : "border-gray-300 focus:border-gray-400 focus:ring-gray-400"
            }`}
          />
          {errors.price && (
            <p className="text-xs text-red-500">{errors.price}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="productCode"
            className="text-xs font-medium text-gray-600"
          >
            Ürün Kodu <span className="text-red-500">*</span>
          </label>
          <input
            id="productCode"
            placeholder="ABC-123"
            value={productCode}
            onChange={(event) => setProductCode(event.target.value)}
            required
            className={`rounded-xl border bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 ${
              errors.productCode
                ? "border-red-300 focus:border-red-400 focus:ring-red-400"
                : "border-gray-300 focus:border-gray-400 focus:ring-gray-400"
            }`}
          />
          {errors.productCode && (
            <p className="text-xs text-red-500">{errors.productCode}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="brand" className="text-xs font-medium text-gray-600">
            Marka
          </label>
          <input
            id="brand"
            placeholder="Marka adı"
            value={brand}
            onChange={(event) => setBrand(event.target.value)}
            className="rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="condition"
            className="text-xs font-medium text-gray-600"
          >
            Durum
          </label>
          <select
            id="condition"
            value={condition}
            onChange={(event) => setCondition(event.target.value)}
            className="rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
          >
            <option value="Yeni">Yeni</option>
            <option value="Çıkma">Çıkma</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label
            htmlFor="categoryId"
            className="text-xs font-medium text-gray-600"
          >
            Kategori <span className="text-red-500">*</span>
          </label>
          <select
            id="categoryId"
            value={categoryId}
            onChange={(event) => setCategoryId(event.target.value)}
            required
            className={`rounded-xl border bg-white px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-1 ${
              errors.categoryId
                ? "border-red-300 focus:border-red-400 focus:ring-red-400"
                : "border-gray-300 focus:border-gray-400 focus:ring-gray-400"
            }`}
          >
            <option value="">Kategori seçiniz</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.categoryId && (
            <p className="text-xs text-red-500">{errors.categoryId}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="description"
          className="text-xs font-medium text-gray-600"
        >
          Ürün Açıklaması
        </label>
        <textarea
          id="description"
          placeholder="Ürün hakkında detaylı bilgi..."
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className="min-h-[120px] rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
        />
      </div>

      <div className="flex flex-wrap gap-4 text-xs text-gray-600">
        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            checked={isFeatured}
            onChange={(event) => setIsFeatured(event.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-400"
          />
          Öne çıkan
        </label>
        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(event) => setIsActive(event.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-400"
          />
          Aktif
        </label>
      </div>

      {!isEditing && (
        <div className="flex flex-col gap-3">
          <label className="text-xs font-medium text-gray-600">
            Ürün Görselleri
          </label>

          <UploadDropzone
            endpoint="productImages"
            onUploadBegin={() => setIsUploading(true)}
            onClientUploadComplete={(files) => {
              setIsUploading(false);
              const mapped = files.map((file) => ({
                id: file.key,
                url: file.ufsUrl ?? file.url,
                name: file.name,
              }));
              setImages((prev) => [...prev, ...mapped]);
              setMessage({
                type: "success",
                text: `${files.length} görsel yüklendi.`,
              });
            }}
            onUploadError={(error) => {
              setIsUploading(false);
              setMessage({ type: "error", text: error.message });
            }}
            config={{ mode: "auto" }}
            appearance={{
              container: `group relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 cursor-pointer transition-all duration-300 ease-out ${
                isUploading
                  ? "border-blue-400 bg-blue-50 scale-[1.02] shadow-lg shadow-blue-100"
                  : "border-gray-300 bg-gray-50 hover:border-gray-900 hover:bg-white hover:shadow-xl hover:shadow-gray-200/50 hover:scale-[1.01]"
              }`,
              uploadIcon: `h-12 w-12 mb-3 transition-all duration-300 ${
                isUploading
                  ? "text-blue-500 animate-pulse"
                  : "text-gray-400 group-hover:text-gray-900 group-hover:scale-110"
              }`,
              label: `text-sm font-medium text-center transition-colors duration-300 ${
                isUploading ? "text-blue-600" : "text-gray-600 group-hover:text-gray-900"
              }`,
              allowedContent: "text-xs text-gray-400 mt-2 text-center",
              button: `mt-4 rounded-xl px-6 py-2.5 text-sm font-semibold transition-all duration-300 ${
                isUploading
                  ? "bg-blue-600 text-white cursor-wait scale-95"
                  : "bg-gray-900 text-white hover:bg-gray-800 hover:scale-105 hover:shadow-lg"
              }`,
            }}
            content={{
              label: isUploading
                ? "Yükleniyor..."
                : "Görsel yüklemek için tıklayın veya sürükleyin",
              allowedContent: "PNG, JPG, WEBP  Maks. 4MB  En fazla 8 görsel",
              button: isUploading ? "Yükleniyor..." : "Dosya Seç",
            }}
          />

          {images.length > 0 && (
            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={images.map((item) => item.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="grid gap-2">
                  {images.map((image) => (
                    <SortableImage
                      key={image.id}
                      image={image}
                      onRemove={(id) =>
                        setImages((items) => items.filter((item) => item.id !== id))
                      }
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          )}
        </div>
      )}

      {message && (
        <p
          className={`rounded-lg px-3 py-2 text-xs ${
            message.type === "success"
              ? "bg-emerald-50 text-emerald-700"
              : "bg-red-50 text-red-600"
          }`}
          role="alert"
        >
          {message.text}
        </p>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isPending || isUploading}
          className="flex-1 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending
            ? isEditing
              ? "Güncelleniyor..."
              : "Kaydediliyor..."
            : isEditing
              ? "Güncelle"
              : "Kaydet"}
        </button>
        {isEditing && (
          <button
            type="button"
            onClick={() => router.push("/admin/products")}
            className="rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-700 transition hover:bg-gray-50"
          >
            İptal
          </button>
        )}
      </div>
    </form>
  );
}
