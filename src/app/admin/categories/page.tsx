"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { UploadDropzone } from "~/app/_components/uploadthing";
import { api } from "~/trpc/react";

const PLACEHOLDER_IMAGE = "/placeholder-category.svg";

type CategoryRow = {
  id: string;
  name: string;
  slug: string;
  imageUrl: string | null;
};

type RawCategory = Partial<CategoryRow>;

const isValidCategoryRow = (category: RawCategory): category is CategoryRow => {
  return (
    typeof category.id === "string" &&
    typeof category.name === "string" &&
    typeof category.slug === "string"
  );
};

export default function CategoriesPage() {
  const utils = api.useUtils();
  const { data: categories, isLoading } = api.category.list.useQuery();

  const categoryRows = useMemo(() => {
    return ((categories as RawCategory[] | undefined) ?? [])
      .filter(isValidCategoryRow)
      .map((category) => ({
        ...category,
        imageUrl: category.imageUrl ?? null,
      }));
  }, [categories]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editSlug, setEditSlug] = useState("");
  const [editImageUrl, setEditImageUrl] = useState("");
  const [isEditImageUploading, setIsEditImageUploading] = useState(false);

  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const [newSlug, setNewSlug] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [isNewImageUploading, setIsNewImageUploading] = useState(false);

  const [deleteId, setDeleteId] = useState<string | null>(null);

  const createMutation = api.category.create.useMutation({
    onSuccess: async () => {
      await utils.category.list.invalidate();
      setIsAdding(false);
      setNewName("");
      setNewSlug("");
      setNewImageUrl("");
      setIsNewImageUploading(false);
    },
  });

  const updateMutation = api.category.update.useMutation({
    onSuccess: async () => {
      await utils.category.list.invalidate();
      setEditingId(null);
      setEditName("");
      setEditSlug("");
      setEditImageUrl("");
      setIsEditImageUploading(false);
    },
  });

  const deleteMutation = api.category.remove.useMutation({
    onSuccess: async () => {
      await utils.category.list.invalidate();
      setDeleteId(null);
    },
  });

  const resetEditState = () => {
    setEditingId(null);
    setEditName("");
    setEditSlug("");
    setEditImageUrl("");
    setIsEditImageUploading(false);
  };

  const handleEdit = (category: CategoryRow) => {
    setEditingId(category.id);
    setEditName(category.name);
    setEditSlug(category.slug);
    setEditImageUrl(category.imageUrl ?? "");
  };

  const handleSaveEdit = () => {
    if (!editingId || !editName.trim() || !editSlug.trim()) return;
    updateMutation.mutate({
      id: editingId,
      name: editName.trim(),
      slug: editSlug.trim(),
      imageUrl: editImageUrl.trim() ? editImageUrl.trim() : null,
    });
  };

  const handleCreate = () => {
    if (!newName.trim() || !newSlug.trim()) return;
    createMutation.mutate({
      name: newName.trim(),
      slug: newSlug.trim(),
      imageUrl: newImageUrl.trim() ? newImageUrl.trim() : null,
    });
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/ğ/g, "g")
      .replace(/ü/g, "u")
      .replace(/ş/g, "s")
      .replace(/ı/g, "i")
      .replace(/ö/g, "o")
      .replace(/ç/g, "c")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900" />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kategoriler</h1>
          <p className="mt-1 text-sm text-gray-500">
            Landing page&apos;de gorunecek kategori bilgilerini buradan yonetin.
          </p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Yeni Kategori
        </button>
      </div>

      {isAdding && (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Yeni Kategori Ekle
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Kategori Adi
              </label>
              <input
                type="text"
                value={newName}
                onChange={(event) => {
                  setNewName(event.target.value);
                  setNewSlug(generateSlug(event.target.value));
                }}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                placeholder="Orn: Telefon"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                URL Slug
              </label>
              <input
                type="text"
                value={newSlug}
                onChange={(event) => setNewSlug(event.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                placeholder="Orn: telefon"
              />
            </div>
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Gorsel URL (Opsiyonel)
              </label>
              <input
                type="text"
                value={newImageUrl}
                onChange={(event) => setNewImageUrl(event.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                placeholder="https://..."
              />
              <p className="mt-1 text-xs text-gray-500">
                URL girin veya asagidan dosya yukleyin.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">
              <UploadDropzone
                endpoint="categoryImages"
                onUploadBegin={() => setIsNewImageUploading(true)}
                onClientUploadComplete={(files) => {
                  const uploaded = files[0];
                  if (!uploaded) return;
                  setIsNewImageUploading(false);
                  setNewImageUrl(uploaded.ufsUrl ?? uploaded.url);
                }}
                onUploadError={(error) => {
                  setIsNewImageUploading(false);
                  createMutation.reset();
                  console.error(error);
                }}
                content={{
                  label: isNewImageUploading
                    ? "Yukleniyor..."
                    : "Kategori gorseli yukle",
                  allowedContent: "PNG, JPG, WEBP  |  Maks. 4MB",
                  button: isNewImageUploading ? "Yukleniyor..." : "Dosya Sec",
                }}
              />
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <div className="h-14 w-14 overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
              <img
                src={newImageUrl || PLACEHOLDER_IMAGE}
                alt="Yeni kategori gorsel onizleme"
                className="h-full w-full object-cover"
              />
            </div>
            <button
              type="button"
              onClick={() => setNewImageUrl("")}
              className="rounded-lg border border-gray-300 px-3 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Gorseli Kaldir
            </button>
          </div>

          <div className="mt-4 flex gap-3">
            <button
              onClick={handleCreate}
              disabled={
                createMutation.isPending ||
                isNewImageUploading ||
                !newName.trim() ||
                !newSlug.trim()
              }
              className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:opacity-50"
            >
              {createMutation.isPending ? "Kaydediliyor..." : "Kaydet"}
            </button>
            <button
              onClick={() => {
                setIsAdding(false);
                setNewName("");
                setNewSlug("");
                setNewImageUrl("");
                setIsNewImageUploading(false);
                createMutation.reset();
              }}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Iptal
            </button>
          </div>

          {createMutation.error && (
            <p className="mt-2 text-sm text-red-600">
              {createMutation.error.message}
            </p>
          )}
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Kategori
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Gorsel
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Slug
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Islemler
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {categoryRows.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-12 text-center text-sm text-gray-500"
                  >
                    Henuz kategori eklenmemis.
                  </td>
                </tr>
              )}

              {categoryRows.map((category) => (
                <tr key={category.id} className="transition hover:bg-gray-50">
                  <td className="px-6 py-4 align-top">
                    {editingId === category.id ? (
                      <input
                        type="text"
                        value={editName}
                        onChange={(event) => setEditName(event.target.value)}
                        className="w-full min-w-[180px] rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                      />
                    ) : (
                      <span className="font-medium text-gray-900">
                        {category.name}
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-4 align-top">
                    {editingId === category.id ? (
                      <div className="min-w-[260px] space-y-2">
                        <div className="h-14 w-14 overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                          <img
                            src={editImageUrl || PLACEHOLDER_IMAGE}
                            alt={`${category.name} gorsel onizleme`}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <input
                          type="text"
                          value={editImageUrl}
                          onChange={(event) => setEditImageUrl(event.target.value)}
                          className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                          placeholder="https://..."
                        />
                        <UploadDropzone
                          endpoint="categoryImages"
                          onUploadBegin={() => setIsEditImageUploading(true)}
                          onClientUploadComplete={(files) => {
                            const uploaded = files[0];
                            if (!uploaded) return;
                            setIsEditImageUploading(false);
                            setEditImageUrl(uploaded.ufsUrl ?? uploaded.url);
                          }}
                          onUploadError={(error) => {
                            setIsEditImageUploading(false);
                            updateMutation.reset();
                            console.error(error);
                          }}
                          content={{
                            label: isEditImageUploading
                              ? "Yukleniyor..."
                              : "Yeni gorsel yukle",
                            allowedContent: "PNG, JPG, WEBP",
                            button: isEditImageUploading
                              ? "Yukleniyor..."
                              : "Dosya Sec",
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => setEditImageUrl("")}
                          className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-semibold text-gray-700 transition hover:bg-gray-50"
                        >
                          Gorseli Kaldir
                        </button>
                      </div>
                    ) : (
                      <div className="h-14 w-14 overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                        <img
                          src={category.imageUrl ?? PLACEHOLDER_IMAGE}
                          alt={category.name}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    )}
                  </td>

                  <td className="px-6 py-4 align-top">
                    {editingId === category.id ? (
                      <input
                        type="text"
                        value={editSlug}
                        onChange={(event) => setEditSlug(event.target.value)}
                        className="w-full min-w-[180px] rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                      />
                    ) : (
                      <code className="rounded bg-gray-100 px-2 py-1 text-sm text-gray-600">
                        {category.slug}
                      </code>
                    )}
                  </td>

                  <td className="px-6 py-4 align-top">
                    <div className="flex items-center justify-end gap-2">
                      {editingId === category.id ? (
                        <>
                          <button
                            onClick={handleSaveEdit}
                            disabled={updateMutation.isPending || isEditImageUploading}
                            className="rounded-lg bg-green-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-green-700 disabled:opacity-50"
                          >
                            {updateMutation.isPending ? "..." : "Kaydet"}
                          </button>
                          <button
                            onClick={resetEditState}
                            className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-semibold text-gray-700 transition hover:bg-gray-50"
                          >
                            Iptal
                          </button>
                        </>
                      ) : (
                        <>
                          <Link
                            href={`/kategori/${category.slug}`}
                            target="_blank"
                            className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
                            title="Goruntule"
                          >
                            <svg
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                          </Link>
                          <button
                            onClick={() => handleEdit(category)}
                            className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
                            title="Duzenle"
                          >
                            <svg
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </button>
                          <button
                            onClick={() => setDeleteId(category.id)}
                            className="rounded-lg p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-600"
                            title="Sil"
                          >
                            <svg
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </>
                      )}
                    </div>
                    {editingId === category.id && updateMutation.error && (
                      <p className="mt-2 text-right text-xs text-red-600">
                        {updateMutation.error.message}
                      </p>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <svg
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Kategoriyi Sil
                </h3>
                <p className="text-sm text-gray-500">
                  Bu kategoriyi silmek istediginizden emin misiniz? Bu islem geri
                  alinamaz.
                </p>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                Iptal
              </button>
              <button
                onClick={() => {
                  if (!deleteId) return;
                  deleteMutation.mutate({ id: deleteId });
                }}
                disabled={deleteMutation.isPending}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"
              >
                {deleteMutation.isPending ? "Siliniyor..." : "Sil"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
