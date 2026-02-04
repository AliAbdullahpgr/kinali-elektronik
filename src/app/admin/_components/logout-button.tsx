"use client";

import { useState } from "react";

export function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false);

  const onLogout = async () => {
    setIsLoading(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } finally {
      window.location.href = "/admin/login";
    }
  };

  return (
    <button
      type="button"
      onClick={onLogout}
      disabled={isLoading}
      className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isLoading ? "k..." : "k Yap"}
    </button>
  );
}
