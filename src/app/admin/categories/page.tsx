"use client";

import { useState } from "react";
import Link from "next/link";
import { api } from "~/trpc/react";

export default function CategoriesPage() {
  const utils = api.useUtils();
  const { data: categories, isLoading } = api.category.list.useQuery();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editSlug, setEditSlug] = useState("");

  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const [newSlug, setNewSlug] = useState("");

  const [deleteId, setDeleteId] = useState<string | null>(null);

  const createMutation = api.category.create.useMutation({
    onSuccess: () => {
      utils.category.list.invalidate();
      setIsAdding(false);
      setNewName("");
      setNewSlug("");
    },
  });

  const updateMutation = api.category.update.useMutation({
    onSuccess: () => {
      utils.category.list.invalidate();
      setEditingId(null);
    },
  });

  const deleteMutation = api.category.remove.useMutation({
    onSuccess: () => {
      utils.category.list.invalidate();
      setDeleteId(null);
    },
  });

  const handleEdit = (category: { id: string; name: string; slug: string }) => {
    setEditingId(category.id);
    setEditName(category.name);
    setEditSlug(category.slug);
  };

  const handleSaveEdit = () => {
    if (!editingId || !editName.trim() || !editSlug.trim()) return;
    updateMutation.mutate({
      id: editingId,
      name: editName.trim(),
      slug: editSlug.trim(),
    });
  };

  const handleCreate = () => {
    if (!newName.trim() || !newSlug.trim()) return;
    createMutation.mutate({
      name: newName.trim(),
      slug: newSlug.trim(),
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
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900" />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kategoriler</h1>
          <p className="text-sm text-gray-500 mt-1">
            rn kategorilerinizi buradan ynetebilirsiniz.
          </p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Yeni Kategori
        </button>
      </div>

      {/* Add New Category Form */}
      {isAdding && (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Yeni Kategori Ekle</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kategori Ad
              </label>
              <input
                type="text"
                value={newName}
                onChange={(e) => {
                  setNewName(e.target.value);
                  setNewSlug(generateSlug(e.target.value));
                }}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                placeholder="rn: Telefon Aksesuarlar"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL Slug
              </label>
              <input
                type="text"
                value={newSlug}
                onChange={(e) => setNewSlug(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                placeholder="rn: telefon-aksesuarlari"
              />
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            <button
              onClick={handleCreate}
              disabled={createMutation.isPending || !newName.trim() || !newSlug.trim()}
              className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:opacity-50"
            >
              {createMutation.isPending ? "Kaydediliyor..." : "Kaydet"}
            </button>
            <button
              onClick={() => {
                setIsAdding(false);
                setNewName("");
                setNewSlug("");
              }}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              ptal
            </button>
          </div>
          {createMutation.error && (
            <p className="mt-2 text-sm text-red-600">{createMutation.error.message}</p>
          )}
        </div>
      )}

      {/* Categories List */}
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Kategori Ad
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Slug
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                  lemler
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {categories?.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center text-sm text-gray-500">
                    Henz kategori eklenmemi.
                  </td>
                </tr>
              )}
              {categories?.map((category) => (
                <tr key={category.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    {editingId === category.id ? (
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                      />
                    ) : (
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-purple-50 flex items-center justify-center">
                          <svg className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                          </svg>
                        </div>
                        <span className="font-medium text-gray-900">{category.name}</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {editingId === category.id ? (
                      <input
                        type="text"
                        value={editSlug}
                        onChange={(e) => setEditSlug(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                      />
                    ) : (
                      <code className="rounded bg-gray-100 px-2 py-1 text-sm text-gray-600">
                        {category.slug}
                      </code>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      {editingId === category.id ? (
                        <>
                          <button
                            onClick={handleSaveEdit}
                            disabled={updateMutation.isPending}
                            className="rounded-lg bg-green-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-green-700 disabled:opacity-50"
                          >
                            {updateMutation.isPending ? "..." : "Kaydet"}
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-semibold text-gray-700 transition hover:bg-gray-50"
                          >
                            ptal
                          </button>
                        </>
                      ) : (
                        <>
                          <Link
                            href={`/kategori/${category.slug}`}
                            target="_blank"
                            className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
                            title="Grntle"
                          >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </Link>
                          <button
                            onClick={() => handleEdit(category)}
                            className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
                            title="Dzenle"
                          >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => setDeleteId(category.id)}
                            className="rounded-lg p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-600"
                            title="Sil"
                          >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Kategoriyi Sil</h3>
                <p className="text-sm text-gray-500">
                  Bu kategoriyi silmek istediinizden emin misiniz? Bu ilem geri alnamaz.
                </p>
              </div>
            </div>
            <div className="mt-6 flex gap-3 justify-end">
              <button
                onClick={() => setDeleteId(null)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                ptal
              </button>
              <button
                onClick={() => deleteMutation.mutate({ id: deleteId })}
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
