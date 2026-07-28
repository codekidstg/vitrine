"use client";

import { useState } from "react";
import { KodiAvatar } from "@/components/landing/MiniQuest";

const FAQ_ITEMS = [
  {
    q: "À partir de quel âge mon enfant peut-il commencer ?",
    a: "Dès 10 ans, jusqu'à 18 ans et plus, répartis en 3 niveaux adaptés : Explorateur (10-12 ans), Bâtisseur (13-15 ans), Architecte (16-18 ans et plus).",
  },
  {
    q: "Faut-il un ordinateur puissant ?",
    a: "Non — la plateforme est conçue pour fonctionner sur un smartphone Android d'entrée de gamme et une connexion limitée, avec un mode hors-ligne.",
  },
  {
    q: "Les cours ont-ils lieu à domicile ou en classe ?",
    a: "Les deux formules existent : cours collectifs en classe animés par un mentor, ou suivi individuel à domicile, au choix de la famille.",
  },
  {
    q: "Qui anime les cours ?",
    a: "De vrais mentors salariés par codeKids — pas des bénévoles, pas des vidéos préenregistrées.",
  },
  {
    q: "Dans quelle langue se déroulent les cours ?",
    a: "100% en français.",
  },
  {
    q: "Comment se passe le paiement ?",
    a: "Abonnement mensuel ou annuel au choix. Le tarif exact par niveau est communiqué à l'issue de la séance d'immersion gratuite.",
  },
  {
    q: "Les données de mon enfant sont-elles protégées ?",
    a: "Oui — plateforme sans publicité, données hébergées de façon sécurisée, l'élève utilise un pseudonyme, aucune revente de données à des tiers.",
  },
];

function QuestItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [showBubble, setShowBubble] = useState(false);

  function toggle() {
    const next = !open;
    setOpen(next);
    if (next) {
      setShowBubble(true);
      if (!revealed) {
        setTimeout(() => setRevealed(true), 550);
      }
    }
  }

  return (
    <div
      className={`bg-card border-2 rounded-2xl overflow-hidden transition-colors ${
        open ? "border-brand-amber-dark/40 shadow-[0_0_0_3px_rgba(255,176,32,0.08)]" : "border-cream-border"
      }`}
    >
      <button
        onClick={toggle}
        aria-expanded={open}
        className="flex items-center gap-3.5 w-full text-left px-5 py-4"
      >
        <span
          className={`hud-mono text-[11px] font-extrabold rounded-md px-1.5 py-0.5 border flex-shrink-0 ${
            open ? "text-brand-amber-dark border-brand-amber-dark/35 bg-brand-amber-light" : "text-ink-light border-cream-border bg-cream"
          }`}
        >
          Q{String(index + 1).padStart(2, "0")}
        </span>
        <span className="flex-1 text-sm font-bold text-ink">{q}</span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className={`w-4.5 h-4.5 flex-shrink-0 text-ink-light transition-transform duration-200 ${open ? "rotate-180 text-brand-amber-dark" : ""}`}
        >
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden min-h-0">
          <div className="px-5 pb-5">
            <div
              className="flex items-start gap-2.5 transition-all duration-300"
              style={{ opacity: showBubble ? 1 : 0, transform: showBubble ? "translateY(0)" : "translateY(4px)" }}
            >
              <div className="w-7.5 h-7.5 rounded-full bg-brand-amber-light border border-brand-amber-dark/30 flex items-center justify-center flex-shrink-0">
                <KodiAvatar size={16} />
              </div>
              <div className="bg-cream border border-cream-border rounded-2xl rounded-bl-sm px-3.5 py-2.5 text-sm leading-relaxed text-ink-muted">
                {revealed ? (
                  a
                ) : (
                  <span className="flex gap-1 py-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-ink-light animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-ink-light animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-ink-light animate-bounce" />
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="bg-cream py-20 px-6 md:px-14 border-t border-cream-border">
      <div className="max-w-2xl mx-auto">
        <p className="text-xs font-extrabold uppercase tracking-widest text-brand-amber-dark mb-4">
          Questions fréquentes
        </p>
        <h2 className="hud-display text-4xl text-ink mb-10">Avant de te lancer</h2>

        <div className="flex flex-col gap-2.5">
          {FAQ_ITEMS.map((item, i) => (
            <QuestItem key={item.q} q={item.q} a={item.a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
