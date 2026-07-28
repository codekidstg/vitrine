import type { Metadata } from "next";
import { Nunito, Bebas_Neue, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "codeKids — Apprends à coder, joue, construis ton avenir",
  description:
    "Cours de code en français pour les 10-18 ans et plus. Animés par de vrais mentors locaux, avec une progression gamifiée et des projets concrets. Togo · Bénin · Côte d'Ivoire · Burkina Faso.",
  openGraph: {
    title: "codeKids — Apprends à coder, joue, construis ton avenir",
    description: "Cours de code en français pour les 10-18 ans et plus en Afrique de l'Ouest.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${nunito.className} ${bebasNeue.variable} ${plexMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
