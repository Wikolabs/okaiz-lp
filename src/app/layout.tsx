import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  title: "okaiz.com — Achetez et vendez des véhicules d'occasion avec l'IA",
  description: "Marketplace IA de véhicules d'occasion à Madagascar. Estimation instantanée, annonces vérifiées, recherche par photo ou description. Achetez et vendez sans arnaque.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body style={{ fontFamily: "var(--font-body)", background: "#fff7ed" }}>{children}</body>
    </html>
  );
}
