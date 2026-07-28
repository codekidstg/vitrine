const STEPS = [
  {
    num: "01",
    icon: "💬",
    title: "Contact",
    desc: "Vous nous écrivez via le formulaire — on vous répond dans la journée pour caler un premier échange.",
  },
  {
    num: "02",
    icon: "🎁",
    title: "Séance d'immersion offerte",
    desc: "Votre enfant essaie une vraie séance avec un mentor, sans engagement et sans frais, pour voir si ça lui plaît.",
  },
  {
    num: "03",
    icon: "🧭",
    title: "Choix du niveau",
    desc: "En fonction de son âge et de son aisance, on définit ensemble le niveau de départ : Explorateur, Bâtisseur ou Architecte.",
  },
  {
    num: "04",
    icon: "🚀",
    title: "Cours réguliers",
    desc: "Abonnement mensuel ou annuel au choix, en classe ou à domicile. Le tarif exact est communiqué à l'issue de la séance d'essai.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-cream py-20 px-6 md:px-14 border-t border-cream-border">
      <div className="max-w-6xl mx-auto">
        <div className="mb-14">
          <p className="text-xs font-extrabold uppercase tracking-widest text-brand-amber-dark mb-4">
            Comment ça marche
          </p>
          <h2 className="hud-display text-4xl md:text-5xl text-ink max-w-xl">
            Du premier message<br /><span className="text-cyan-dark">au premier cours</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STEPS.map((s) => (
            <div key={s.num} className="relative bg-card border border-cream-border rounded-2xl p-6">
              <div className="hud-mono text-[11px] font-extrabold text-ink-light mb-4">ÉTAPE {s.num}</div>
              <div className="text-3xl mb-4">{s.icon}</div>
              <h3 className="font-display text-lg font-black text-ink mb-2">{s.title}</h3>
              <p className="text-sm text-ink-muted leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-5 bg-brand-amber-light border border-brand-amber-dark/25 rounded-2xl px-7 py-6">
          <div>
            <div className="font-black text-ink text-base mb-1">🎁 Séance d&apos;immersion offerte aux parents</div>
            <div className="text-sm text-ink-muted font-bold">Sans engagement — le tarif n&apos;est communiqué qu&apos;après cette première séance.</div>
          </div>
          <a
            href="#contact"
            className="flex-shrink-0 bg-brand-amber text-brand-navy-dark font-extrabold text-sm px-7 py-3.5 rounded-xl hover:brightness-110 transition-all"
          >
            Réserver la séance gratuite →
          </a>
        </div>
      </div>
    </section>
  );
}
