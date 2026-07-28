import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MiniQuest from "@/components/landing/MiniQuest";
import ProjectsTimeline from "@/components/landing/ProjectsTimeline";
import Testimonials from "@/components/landing/Testimonials";
import About from "@/components/landing/About";
import FAQ from "@/components/landing/FAQ";
import HowItWorks from "@/components/landing/HowItWorks";
import ContactForm from "@/components/landing/ContactForm";

const LEVELS = [
  { icon: "🌱", label: "Explorateur", age: "10-12", color: "#10B981", border: "rgba(16,185,129,0.35)" },
  { icon: "🏗️", label: "Bâtisseur", age: "13-15", color: "#7C3AED", border: "rgba(124,58,237,0.35)" },
  { icon: "🌐", label: "Architecte", age: "16-18 et +", color: "#FFB020", border: "rgba(255,176,32,0.4)" },
] as const;

function HeroVisual() {
  return (
    <div className="flex flex-col items-center gap-3.5">
      <style>{`
        @keyframes ckFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes ckTwinkle { 0%,100%{opacity:.3} 50%{opacity:1} }
        @keyframes ckBlink { 0%,49%{opacity:1} 50%,100%{opacity:0} }
        @keyframes ckBar { from{width:0} to{width:var(--bar-w)} }
      `}</style>

      <div
        className="self-start bg-white/[0.04] border border-brand-amber/30 rounded-2xl px-4 py-3 shadow-[0_0_24px_rgba(255,176,32,0.08)]"
        style={{ animation: "ckFloat 4s ease-in-out infinite" }}
      >
        <div className="text-[10px] font-extrabold uppercase tracking-widest text-brand-amber mb-2.5">Progression cette semaine</div>
        <div className="flex items-center gap-3">
          <div className="flex flex-col gap-1.5 w-[138px]">
            {[
              { w: 70, c: "bg-brand-amber" },
              { w: 45, c: "bg-magenta" },
              { w: 90, c: "bg-cyan" },
              { w: 60, c: "bg-brand-amber" },
            ].map((bar, i) => (
              <div key={i} className="bg-white/10 rounded-full h-1.5 overflow-hidden">
                <div
                  className={`${bar.c} h-full rounded-full`}
                  style={{ width: `${bar.w}%`, ["--bar-w" as string]: `${bar.w}%`, animation: `ckBar 1.1s ease-out both` }}
                />
              </div>
            ))}
          </div>
          <span className="hud-mono font-black text-xl text-brand-amber">
            +680<span className="text-xs text-white font-bold"> XP</span>
          </span>
        </div>
      </div>

      <div className="w-[220px] h-[280px] rounded-2xl border border-white/10 bg-gradient-to-br from-brand-amber/10 to-cyan/10 flex items-center justify-center text-[88px]">
        🧑🏾‍💻
      </div>

      <div className="w-full flex items-end justify-between gap-3">
        <div
          className="flex items-center gap-2.5 bg-white/[0.04] border border-cyan/30 rounded-2xl px-4 py-3 shadow-[0_0_24px_rgba(55,230,196,0.08)]"
          style={{ animation: "ckFloat 3.4s ease-in-out infinite 0.3s" }}
        >
          <div className="w-8 h-8 rounded-lg bg-magenta shadow-[0_0_16px_rgba(255,61,129,0.4)] flex items-center justify-center text-sm">★</div>
          <div>
            <div className="text-xs font-extrabold text-white">Badge débloqué !</div>
            <div className="text-[11px] text-white/50 font-bold">Explorateur Niveau 4</div>
          </div>
        </div>

        <div
          className="hud-mono text-xs leading-relaxed text-cyan bg-white/[0.04] border border-cyan/30 rounded-2xl px-4 py-3"
          style={{ animation: "ckFloat 3.8s ease-in-out infinite 0.6s" }}
        >
          <span className="text-magenta">def </span>
          <span className="text-brand-amber">resoudre</span>
          <span>(n):</span><br />
          <span>&nbsp;&nbsp;return n * 2</span>
          <span className="text-brand-amber" style={{ animation: "ckBlink 1s step-end infinite" }}>_</span>
        </div>
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-brand-navy px-8 md:px-14 pt-14 pb-20">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 88% 8%, rgba(55,230,196,0.09), transparent 42%), radial-gradient(circle at 10% 92%, rgba(255,61,129,0.06), transparent 40%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "24px 24px" }}
      />

      <div className="relative max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-10">
          <div className="inline-flex items-center gap-2 bg-brand-amber/10 border border-brand-amber/30 rounded-full px-4 py-1.5">
            <span className="w-2 h-2 rounded-full bg-brand-amber" style={{ animation: "ckTwinkle 1.5s ease-in-out infinite" }} />
            <span className="text-brand-amber text-xs font-extrabold">🌍 Togo · Bénin · Côte d&apos;Ivoire · Burkina Faso</span>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-magenta/10 border border-magenta/30 rounded-full px-4 py-1.5 text-magenta text-xs font-extrabold hover:bg-magenta/15 transition-colors"
          >
            🎁 1ère séance offerte, sans engagement
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="hud-display text-4xl md:text-5xl text-white mb-5">
              Apprends à coder.<br />
              <span className="text-brand-amber" style={{ textShadow: "0 0 30px rgba(255,176,32,0.45)" }}>Joue. Progresse.</span><br />
              Construis ton avenir.
            </h1>

            <p className="text-white/60 text-base leading-relaxed mb-8 max-w-md">
              Des cours animés par des mentors, une progression gamifiée, des projets réels. Pour les 10 – 18 ans et plus.
            </p>

            <div className="flex flex-wrap gap-3 mb-9">
              <a href="#contact" className="bg-brand-amber text-brand-navy-dark font-extrabold text-sm px-7 py-3.5 rounded-xl hover:brightness-110 transition-all shadow-[0_10px_26px_rgba(255,176,32,0.25)]">
                Inscrire mon enfant →
              </a>
              <a href="#niveaux" className="border border-white/20 text-white font-extrabold text-sm px-7 py-3.5 rounded-xl hover:bg-white/5 transition-colors">
                Voir les niveaux
              </a>
            </div>

            <div className="flex items-start" style={{ gap: 0 }}>
              {LEVELS.map((lvl, i) => (
                <div key={lvl.label} className="flex items-center" style={{ flex: i === LEVELS.length - 1 ? "0 0 auto" : 1 }}>
                  <div className="flex flex-col items-center gap-1.5 w-24">
                    <div
                      className="w-11 h-11 rounded-full border-2 flex items-center justify-center text-lg"
                      style={{ background: `${lvl.color}26`, borderColor: lvl.color }}
                    >
                      {lvl.icon}
                    </div>
                    <div className="text-[10px] font-extrabold text-white/45 uppercase tracking-wide text-center leading-tight">
                      {lvl.label}<br />{lvl.age}
                    </div>
                  </div>
                  {i < LEVELS.length - 1 && (
                    <div
                      className="flex-1 h-0.5 -mt-5"
                      style={{ backgroundImage: "repeating-linear-gradient(90deg, rgba(255,255,255,0.22) 0 6px, transparent 6px 12px)" }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <HeroVisual />
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ProjectsTimeline />
        <MiniQuest />
        <HowItWorks />
        <Testimonials />
        <FAQ />
        <About />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
