import "~/styles/globals.css";

import { type Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { AuthProvider } from "~/app/_components/providers";
import { auth } from "~/server/auth";

export const metadata: Metadata = {
  title: "Kınalı Elektronik | Ürün Kataloğu",
  description: "İstanbul Kınalı Elektronik için hızlı ürün arama ve iletişim.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
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
  const session = await auth();

  return (
    <html lang="tr" className={`${jakarta.variable} ${grotesk.variable}`}>
      <body className="bg-kinali-bg text-slate-900">
        <AuthProvider session={session}>
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
