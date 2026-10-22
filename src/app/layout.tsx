import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://marc-pichot.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Marc Pichot · Développeur C# / .NET",
    template: "%s · Marc Pichot",
  },
  description:
    "Portfolio de Marc Pichot, développeur C# / .NET en Belgique : API REST, React, applications IA, du besoin à la mise en ligne.",
  keywords: ["Marc Pichot", "développeur C#", ".NET", "Belgique", "portfolio", "React", "API REST"],
  authors: [{ name: "Marc Pichot", url: siteUrl }],
  creator: "Marc Pichot",
  icons: { icon: [{ url: "/icon.svg", type: "image/svg+xml" }], apple: "/icon.svg" },
  openGraph: {
    title: "Marc Pichot · Développeur C# / .NET",
    description: "Quatre projets complets, de l'analyse du besoin à la mise en ligne.",
    type: "website",
    locale: "fr_BE",
    url: siteUrl,
    siteName: "Marc Pichot",
  },
  twitter: {
    card: "summary",
    title: "Marc Pichot · Développeur C# / .NET",
    description: "Portfolio — C# / .NET, React, applications IA, Belgique.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#06070b" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${grotesk.variable}`}>
      <body>{children}</body>
    </html>
  );
}
