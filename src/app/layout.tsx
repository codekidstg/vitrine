import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "codeKids — Apprends à coder, joue, construis ton avenir",
  description:
    "Cours de code en français pour les 10-18 ans. Animés par de vrais professeurs locaux, avec une progression gamifiée et des projets concrets. Togo · Bénin · Côte d'Ivoire · Burkina Faso.",
  openGraph: {
    title: "codeKids — Apprends à coder, joue, construis ton avenir",
    description: "Cours de code en français pour les 10-18 ans en Afrique de l'Ouest.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={nunito.className}>
      <body>{children}</body>
    </html>
  );
}
