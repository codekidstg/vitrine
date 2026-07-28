"use client";

import { useEffect, useRef, useState } from "react";

const TESTIMONIALS = [
  {
    name: "Mme Akossiwa Améganvi",
    role: "Directrice d'école primaire",
    city: "Lomé, Togo",
    avatar: "A",
    color: "#10B981",
    stars: 5,
    text: "Mon fils de 12 ans rentrait de classe et filait directement sur codeKids. En deux mois il a créé un petit jeu et l'a montré à toute l'école. Ce que j'ai vu dans ses yeux ce jour-là, ça n'a pas de prix.",
    child: "Elikem, 12 ans — Explorateur",
  },
  {
    name: "M. Kofi Lawson",
    role: "Ingénieur civil",
    city: "Lomé, Togo",
    avatar: "K",
    color: "#7C3AED",
    stars: 5,
    text: "En tant qu'ingénieur, je savais que le code serait incontournable. Ce qui m'a convaincu : de vrais mentors, une vraie progression. Pas une appli qu'on jette au bout de trois jours. Kafui est sérieux depuis le premier cours.",
    child: "Kafui, 15 ans — Bâtisseur",
  },
  {
    name: "Mme Yawa Tossou",
    role: "Pharmacienne",
    city: "Lomé, Togo",
    avatar: "Y",
    color: "#FFB020",
    stars: 5,
    text: "J'avais peur que ce soit trop difficile pour ma fille de 11 ans. Dès la première séance, le mentor l'a mise en confiance. Aujourd'hui elle m'explique ce qu'est une boucle. C'est moi qui apprends avec elle.",
    child: "Ines, 11 ans — Exploratrice",
  },
  {
    name: "M. Kossi Agbénou",
    role: "Chef d'entreprise",
    city: "Lomé, Togo",
    avatar: "K",
    color: "#FFB020",
    stars: 5,
    text: "Mon fils de 17 ans vient de livrer le site de ma société. Pas un template — une vraie création. L'investissement codeKids est sans doute le meilleur retour que j'ai eu. Je le recommande à tous les parents de Lomé.",
    child: "Ibrahim, 17 ans — Architecte",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#B8720A">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

function LeaderboardRow({ t, index }: { t: typeof TESTIMONIALS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="grid grid-cols-[auto_auto_1fr_auto] gap-4 items-center bg-card border border-cream-border rounded-2xl px-6 py-5 shadow-[0_1px_3px_rgba(10,15,34,0.05)]"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`,
      }}
    >
      <div className="hud-mono text-lg font-black text-ink-light w-7">{String(index + 1).padStart(2, "0")}</div>
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0"
        style={{ background: t.color }}
      >
        {t.avatar}
      </div>
      <div>
        <p className="text-ink text-sm leading-relaxed mb-1.5 max-w-xl">{t.text}</p>
        <div className="text-xs font-extrabold text-ink">{t.name} <span className="text-ink-light font-bold">— {t.role}, {t.city}</span></div>
      </div>
      <div className="text-right">
        <Stars count={t.stars} />
        <div className="mt-1.5 text-[11px] font-extrabold text-brand-amber-dark bg-brand-amber-light px-2.5 py-1 rounded-full whitespace-nowrap">
          {t.child}
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setHeaderVisible(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-cream py-20">
      <div className="max-w-5xl mx-auto px-7">

        <div
          ref={headerRef}
          className="mb-12"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
          }}
        >
          <p className="text-xs font-extrabold uppercase tracking-widest text-ink-light mb-4">
            Ils nous font confiance
          </p>
          <h2 className="hud-display text-4xl md:text-5xl text-ink">
            Ce que les parents<br />
            <span className="text-cyan-dark">en pensent</span>
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {TESTIMONIALS.map((t, i) => (
            <LeaderboardRow key={t.name} t={t} index={i} />
          ))}
        </div>

        <div
          className="mt-14 text-center"
          style={{
            opacity: headerVisible ? 1 : 0,
            transition: "opacity 0.5s ease 0.6s",
          }}
        >
          <p className="text-ink-muted text-sm font-bold mb-4">
            Rejoignez les premières familles de Lomé qui ont déjà franchi le pas.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-brand-amber text-brand-navy-dark font-extrabold text-sm px-8 py-4 rounded-xl hover:brightness-110 transition-all"
          >
            Inscrire mon enfant →
          </a>
        </div>

      </div>
    </section>
  );
}
