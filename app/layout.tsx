import type { Metadata } from "next";
import "./globals.css";
import { fundData } from "@/data/investors";

export const metadata: Metadata = {
  title: fundData.name + " — " + fundData.nameEn,
  description: fundData.tagline,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen bg-ink-950 text-white/90 antialiased">
        {children}
      </body>
    </html>
  );
}
