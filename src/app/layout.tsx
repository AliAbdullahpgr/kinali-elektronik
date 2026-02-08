import "~/styles/globals.css";

import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { type Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";

import trMessages from "../../messages/tr.json";
import { TRPCReactProvider } from "~/trpc/react";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://kinali-elektronik.vercel.app";

const metadataTexts = trMessages.metadata.layout;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: metadataTexts.title,
  description: metadataTexts.description,
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  openGraph: {
    title: metadataTexts.openGraphTitle,
    description: metadataTexts.openGraphDescription,
    url: siteUrl,
    siteName: metadataTexts.siteName,
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
  const messages = await getMessages();

  return (
    <html lang="tr" className={`${jakarta.variable} ${grotesk.variable}`}>
      <body className="bg-kinali-bg text-slate-900">
        <NextIntlClientProvider messages={messages}>
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
