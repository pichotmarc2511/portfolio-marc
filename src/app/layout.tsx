import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk" });

export const metadata: Metadata = {
  title: "Marc Pichot · Développeur C# / .NET",
  description:
    "Portfolio de Marc Pichot, développeur C# / .NET en Belgique : API REST, React, applications IA, du besoin à la mise en ligne.",
  openGraph: {
    title: "Marc Pichot · Développeur C# / .NET",
    description: "Quatre projets complets, de l'analyse du besoin à la mise en ligne.",
    type: "website",
    locale: "fr_BE",
  },
};

export const viewport: Viewport = { themeColor: "#06070b" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${grotesk.variable}`}>
      <body>{children}</body>
    </html>
  );
}
