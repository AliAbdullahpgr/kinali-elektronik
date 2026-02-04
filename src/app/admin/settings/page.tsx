"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");

  const tabs = [
    { id: "general", label: "Genel", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
    { id: "contact", label: "letiim", icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" },
    { id: "seo", label: "SEO", icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" },
  ];

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Ayarlar</h1>
        <p className="text-sm text-gray-500 mt-1">
          Maaza ayarlarnz buradan ynetebilirsiniz.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200 pb-2 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-gray-900 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
            </svg>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        {activeTab === "general" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Genel Ayarlar</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Maaza Ad
                  </label>
                  <input
                    type="text"
                    defaultValue="KINALI ELEKTRONK"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Maaza Slogan
                  </label>
                  <input
                    type="text"
                    defaultValue="Gngren'in en gvenilir elektronik teknik servisi"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Para Birimi
                  </label>
                  <select
                    defaultValue="TRY"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                  >
                    <option value="TRY">Trk Liras ()</option>
                    <option value="USD">Amerikan Dolar ($)</option>
                    <option value="EUR">Euro ()</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <button className="rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800">
                Deiiklikleri Kaydet
              </button>
            </div>
          </div>
        )}

        {activeTab === "contact" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">letiim Bilgileri</h3>
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      WhatsApp Numaras
                    </label>
                    <input
                      type="text"
                      defaultValue="+90 555 993 77 07"
                      className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Telefon Numaras
                    </label>
                    <input
                      type="text"
                      defaultValue="+90 555 993 77 07"
                      className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    E-posta Adresi
                  </label>
                  <input
                    type="email"
                    defaultValue="info@kinalielektronik.com"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Adres
                  </label>
                  <textarea
                    rows={3}
                    defaultValue="Merkez Mah. Fevzi akmak Cad. No:12/A Gngren / stanbul"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 resize-none"
                  />
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">alma Saatleri</h3>
              <div className="space-y-3">
                {[
                  { day: "Hafta i", hours: "09:00 - 20:00" },
                  { day: "Cumartesi", hours: "09:00 - 20:00" },
                  { day: "Pazar", hours: "11:00 - 18:00" },
                ].map((item) => (
                  <div key={item.day} className="flex items-center gap-4">
                    <span className="w-24 text-sm text-gray-600">{item.day}</span>
                    <input
                      type="text"
                      defaultValue={item.hours}
                      className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <button className="rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800">
                Deiiklikleri Kaydet
              </button>
            </div>
          </div>
        )}

        {activeTab === "seo" && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">SEO Ayarlar</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Site Bal (Title Tag)
                  </label>
                  <input
                    type="text"
                    defaultValue="KINALI ELEKTRONK | Gngren Elektronik Teknik Servis"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                  />
                  <p className="mt-1 text-xs text-gray-500">60 karakteri gememesi nerilir.</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Meta Aklama
                  </label>
                  <textarea
                    rows={3}
                    defaultValue="stanbul Gngren'de 15 yllk tecrbe ile telefon, tablet ve elektronik cihaz tamiri. Apple, Samsung, Xiaomi yetkili teknik servis kalitesinde hizmet."
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 resize-none"
                  />
                  <p className="mt-1 text-xs text-gray-500">155-160 karakter aras ideal uzunluktur.</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Anahtar Kelimeler
                  </label>
                  <input
                    type="text"
                    defaultValue="gngren telefon tamiri, elektronik servis, iphone tamir, samsung ekran deiimi"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                  />
                  <p className="mt-1 text-xs text-gray-500">Virglle ayrarak yazn.</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Sosyal Medya</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    OG Grseli URL
                  </label>
                  <input
                    type="text"
                    placeholder="https://kinali-elektronik.com/og-image.jpg"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
                  />
                  <p className="mt-1 text-xs text-gray-500">Sosyal medya paylamlarnda grnecek grsel. (1200x630px nerilir)</p>
                </div>
              </div>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <button className="rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800">
                Deiiklikleri Kaydet
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Info Box */}
      <div className="rounded-xl bg-blue-50 border border-blue-100 p-4">
        <div className="flex gap-3">
          <svg className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-sm font-medium text-blue-900">Bilgi</p>
            <p className="text-xs text-blue-700 mt-1">
              Ayarlar u anda demo modundadr. Deiiklikler kaydedilmeyecektir.
              Gerek ayarlar deitirmek iin .env dosyasn dzenleyebilirsiniz.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
