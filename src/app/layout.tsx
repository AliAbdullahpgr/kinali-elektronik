import "~/styles/globals.css";

import { type Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://kinali-elektronik.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title:
    "K\u0131nal\u0131 Elektronik | \u0130stanbul Elektronik Teknik Servis",
  description:
    "\u0130stanbul G\u00fcng\u00f6ren'de uygun fiyatl\u0131 elektronik servis, tamir, yedek par\u00e7a ve aksesuarlar. H\u0131zl\u0131 ileti\u015fim ve g\u00fcvenilir hizmet.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  openGraph: {
    title:
      "K\u0131nal\u0131 Elektronik | \u0130stanbul Elektronik Teknik Servis",
    description:
      "\u0130stanbul G\u00fcng\u00f6ren'de uygun fiyatl\u0131 elektronik servis, tamir, yedek par\u00e7a ve aksesuarlar.",
    url: siteUrl,
    siteName: "K\u0131nal\u0131 Elektronik",
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
