const PROJECTS = [
  {
    num: "01",
    age: "10-12 ans",
    level: "Explorateur",
    icon: "🌱",
    color: "#10B981",
    tint: "rgba(16,185,129,0.35)",
    project: "Construire les premières rues de la Cité",
    desc: "Ton enfant programme les feux de circulation, trace les routes, et fait circuler les habitants. Chaque instruction donnée à Kodi bâtit un morceau de ville — le résultat est visible, immédiat, et source de fierté.",
  },
  {
    num: "02",
    age: "13-15 ans",
    level: "Bâtisseur",
    icon: "🏗️",
    color: "#7C3AED",
    tint: "rgba(124,58,237,0.35)",
    project: "Concevoir les quartiers et leurs bâtiments",
    desc: "Ton enfant crée une interface web pour visualiser et interagir avec la Cité — carte interactive, annuaires de services, tableau de bord de quartier. Un vrai projet utilisable par d'autres.",
  },
  {
    num: "03",
    age: "16-18 ans et plus",
    level: "Architecte",
    icon: "🌐",
    color: "#FFB020",
    tint: "rgba(255,176,32,0.4)",
    project: "Piloter la Cité intelligente",
    desc: "Ton enfant conçoit les algorithmes de trafic, sécurise la Cité contre les cybermenaces, et intègre une IA pour optimiser les flux. Un portfolio professionnel qui ouvre les portes des meilleures écoles.",
  },
];

export default function ProjectsTimeline() {
  return (
    <section id="niveaux" className="relative bg-brand-navy py-20 px-6 md:px-14 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "22px 22px" }}
      />
      <div className="relative max-w-7xl mx-auto">

        <div className="mb-14">
          <p className="text-xs font-extrabold uppercase tracking-widest text-brand-amber mb-4">
            Choisis ton monde
          </p>
          <h2 className="hud-display text-4xl md:text-5xl text-white max-w-2xl">
            Ce que ton enfant<br />
            <span className="text-cyan">va construire</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PROJECTS.map((p) => (
            <div
              key={p.level}
              className="relative rounded-3xl p-7 border-2 overflow-hidden bg-brand-navy-light"
              style={{ borderColor: p.tint }}
            >
              <div
                className="absolute inset-0 pointer-events-none opacity-50"
                style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "16px 16px" }}
              />
              <div className="relative">
                <div className="hud-mono text-[11px] font-extrabold tracking-widest opacity-70 mb-4" style={{ color: p.color }}>
                  NIVEAU {p.num} — {p.age.toUpperCase()}
                </div>
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4"
                  style={{ background: `${p.color}26` }}
                >
                  {p.icon}
                </div>
                <span className="text-xs font-extrabold uppercase tracking-widest" style={{ color: p.color }}>{p.icon} {p.level}</span>
                <h3 className="font-display text-xl font-black text-white mt-1 mb-3">{p.project}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
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
