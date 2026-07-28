"use client";

import Link from "next/link";
import { useState } from "react";
import Logo from "@/components/Logo";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[rgba(10,15,34,0.92)] backdrop-blur-sm border-b border-brand-amber/15">
      <div className="max-w-7xl mx-auto px-7 h-16 flex items-center justify-between">

        <Link href="/">
          <Logo size={80} variant="white" />
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-1.5 bg-cyan/10 border border-cyan/30 rounded-lg px-3 py-1.5">
            <span className="text-sm">⚡</span>
            <span className="hud-mono text-xs font-bold text-cyan">680 XP</span>
          </div>
          <Link href="#niveaux" className="text-sm font-bold text-white/65 hover:text-white transition-colors">
            Les niveaux
          </Link>
          <Link href="#faq" className="text-sm font-bold text-white/65 hover:text-white transition-colors">
            FAQ
          </Link>
          <Link href="#apropos" className="text-sm font-bold text-white/65 hover:text-white transition-colors">
            À propos
          </Link>
          <Link
            href="#contact"
            className="bg-brand-amber text-brand-navy-dark text-sm font-extrabold px-5 py-2.5 rounded-xl hover:brightness-110 transition-all shadow-[0_0_0_2px_rgba(255,176,32,0.15)]"
          >
            Inscrire mon enfant
          </Link>
        </nav>

        <button
          className="md:hidden p-2 rounded-lg text-white/70 hover:bg-white/10 transition-colors"
          aria-label="Menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="block w-5 h-0.5 bg-current mb-1" />
          <span className="block w-5 h-0.5 bg-current mb-1" />
          <span className="block w-5 h-0.5 bg-current" />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-white/10 bg-brand-navy px-7 py-5 flex flex-col gap-4">
          <Link href="#niveaux" className="text-sm font-bold text-white/70" onClick={() => setMenuOpen(false)}>Les niveaux</Link>
          <Link href="#faq" className="text-sm font-bold text-white/70" onClick={() => setMenuOpen(false)}>FAQ</Link>
          <Link href="#apropos" className="text-sm font-bold text-white/70" onClick={() => setMenuOpen(false)}>À propos</Link>
          <Link
            href="#contact"
            className="bg-brand-amber text-brand-navy-dark text-sm font-extrabold px-5 py-2.5 rounded-xl text-center"
            onClick={() => setMenuOpen(false)}
          >
            Inscrire mon enfant
          </Link>
        </div>
      )}
    </header>
  );
}
