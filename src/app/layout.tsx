import "~/styles/globals.css";

import { type Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://kinali-elektronik.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title:
    "Kınalı Elektronik | İstanbul Elektronik Teknik Servis",
  description:
    "İstanbul Güngören'de uygun fiyatlı elektronik servis, tamir, yedek parça ve aksesuarlar. Hızlı iletişim ve güvenilir hizmet.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  openGraph: {
    title:
      "Kınalı Elektronik | İstanbul Elektronik Teknik Servis",
    description:
      "İstanbul Güngören'de uygun fiyatlı elektronik servis, tamir, yedek parça ve aksesuarlar.",
    url: siteUrl,
    siteName: "Kınalı Elektronik",
    locale: "tr_TR",
    type: "website",
  },
};

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
});

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className={`${jakarta.variable} ${grotesk.variable}`}>
      <body className="bg-kinali-bg text-slate-900">
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
