"use client";

import { signOut } from "next-auth/react";

export function LogoutButton() {
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/admin/login" });
  };

  return (
    <button
      onClick={handleLogout}
      className="rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-700 transition hover:bg-gray-50"
    >
      Çıkış Yap
    </button>
  );
}
