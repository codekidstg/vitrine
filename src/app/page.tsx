import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MiniQuest from "@/components/landing/MiniQuest";
import ProjectsTimeline from "@/components/landing/ProjectsTimeline";
import Testimonials from "@/components/landing/Testimonials";
import About from "@/components/landing/About";

function CodingIllustration() {
  return (
    <div className="relative bg-brand-orange-light overflow-hidden flex flex-col justify-between py-8 px-6">
      <style>{`
        @keyframes ckFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes ckTwinkle { 0%,100%{opacity:.2} 50%{opacity:1} }
        @keyframes ckBlink { 0%,49%{opacity:1} 50%,100%{opacity:0} }
        @keyframes ckBar { from{width:0} to{width:68%} }
        @keyframes ckSlideIn { from{opacity:0;transform:translateX(12px)} to{opacity:1;transform:translateX(0)} }
      `}</style>

      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.5" fill="#FFCCAA" opacity="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)"/>
      </svg>

      <div className="relative z-10 flex flex-col gap-3">
        <div className="bg-white rounded-2xl px-4 py-3 self-start border border-cream-border" style={{ animation: "ckSlideIn .5s ease-out both" }}>
          <div className="text-xs font-extrabold text-ink-light mb-1">Progression cette semaine</div>
          <div className="flex items-center gap-3">
            <div className="flex flex-col gap-1">
              {[70, 45, 90, 60, 80].map((w, i) => (
                <div key={i} className="bg-gray-100 rounded-full h-1.5 w-20">
                  <div className="bg-brand-orange h-full rounded-full" style={{ width: `${w}%` }}/>
                </div>
              ))}
            </div>
            <span className="font-display font-black text-xl text-brand-orange">+680<span className="text-sm text-ink-light font-bold"> XP</span></span>
          </div>
        </div>

        <div className="bg-white rounded-2xl px-4 py-3 self-end border border-cream-border" style={{ animation: "ckSlideIn .7s ease-out both, ckFloat 4s ease-in-out infinite 1s" }}>
          <div className="flex items-center gap-2">
            <span className="text-lg">🔥</span>
            <div>
              <div className="text-xs font-extrabold text-ink">Série active</div>
              <div className="text-xs text-ink-muted font-bold">7 jours consécutifs</div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex justify-center" style={{ animation: "ckFloat 4s ease-in-out infinite" }}>
        <Image
          src="/hero-kid.png"
          alt="Ado qui code avec codeKids"
          width={280}
          height={380}
          className="object-contain"
          style={{ objectPosition: "center top" }}
          priority
        />
      </div>

      <div className="relative z-10 flex items-end justify-between gap-3">
        <div className="bg-white rounded-2xl px-4 py-3 border border-cream-border" style={{ animation: "ckFloat 3.2s ease-in-out infinite 0.4s" }}>
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-6 h-6 rounded-full bg-explorer flex items-center justify-center">
              <span className="text-white text-xs">★</span>
            </div>
            <span className="text-xs font-extrabold text-ink">Badge débloqué !</span>
          </div>
          <div className="text-xs text-ink-muted font-bold">Explorateur Niveau 4</div>
        </div>

        <div className="bg-brand-blue rounded-2xl px-4 py-3" style={{ animation: "ckFloat 3.8s ease-in-out infinite 1.2s" }}>
          <div className="font-mono text-xs text-brand-blue-soft leading-relaxed">
            <span className="text-[#F9A8D4]">def </span>
            <span className="text-[#60A5FA]">resoudre</span>
            <span className="text-white">(n):</span><br/>
            <span className="text-white ml-2">  return n * 2</span>
            <span className="text-[#FFD60A]" style={{ animation: "ckBlink 1s step-end infinite" }}>_</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 min-h-[520px]">
      <div className="flex flex-col justify-center px-8 md:px-14 py-14 bg-cream">
        <div className="inline-flex items-center gap-2 bg-brand-orange-light border border-[#FFD0B5] rounded-full px-4 py-1.5 mb-8 self-start">
          <span className="w-2 h-2 rounded-full bg-brand-orange" style={{ animation: "ckTwinkle 1.5s ease-in-out infinite" }}/>
          <span className="text-brand-orange-dark text-xs font-extrabold">Togo · Bénin · Côte d&apos;Ivoire · Burkina Faso</span>
        </div>

        <h1 className="font-display text-4xl md:text-5xl font-black text-ink leading-tight mb-5">
          Apprends à coder.<br />
          <span className="text-brand-orange">Joue. Progresse.</span><br />
          Construis ton avenir.
        </h1>

        <p className="text-ink-muted text-base leading-relaxed mb-8 max-w-md">
          Des cours animés par des professeurs, une progression gamifiée, des projets réels. Pour les 10 – 18 ans.
        </p>

        <div className="bg-white border border-cream-border rounded-2xl p-4 mb-8 max-w-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-extrabold text-ink">Amavi — Explorateur</span>
            <span className="text-xs font-extrabold text-brand-orange">680 XP</span>
          </div>
          <div className="bg-gray-100 rounded-full h-2 overflow-hidden">
            <div className="bg-brand-orange h-full rounded-full" style={{ width: "68%", animation: "ckBar 1.2s ease-out forwards" }}/>
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="text-xs text-ink-light font-bold">Niveau 4</span>
            <span className="text-xs text-ink-light font-bold">Niveau 5 à 1 000 XP</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-8">
          <a href="mailto:codekidstg@proton.me?subject=Inscription codeKids — Rentrée 2026" className="bg-brand-orange text-white font-extrabold text-sm px-7 py-3.5 rounded-xl hover:bg-brand-orange-dark transition-colors">
            Inscrire mon enfant →
          </a>
          <a href="#niveaux" className="border-2 border-brand-blue text-brand-blue font-extrabold text-sm px-7 py-3.5 rounded-xl hover:bg-brand-blue-light transition-colors">
            Voir les niveaux
          </a>
        </div>

        <div className="flex flex-wrap gap-5">
          <span className="text-xs font-extrabold text-ink-light">✓ Profs salariés</span>
          <span className="text-xs font-extrabold text-ink-light">✓ Sans publicité</span>
          <span className="text-xs font-extrabold text-ink-light">✓ Données protégées</span>
        </div>
      </div>

      <CodingIllustration />
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
        <Testimonials />
        <About />
      </main>
      <Footer />
    </div>
  );
}
