export default function About() {
  return (
    <section id="apropos" className="bg-cream py-20 px-6 md:px-14">
      <div className="max-w-5xl mx-auto">

        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-10 border border-brand-amber-dark/25 bg-brand-amber-light">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-amber-dark" />
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-amber-dark">
            Notre histoire
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Colonne gauche — fenêtre terminal */}
          <div className="rounded-2xl overflow-hidden border border-cream-border bg-brand-navy">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
              <span className="hud-mono text-[11px] text-white/35 ml-2">notre-histoire.log</span>
            </div>
            <div className="p-6 space-y-5 text-[15px] leading-relaxed text-white/70">
              <p className="text-brand-amber font-bold">&gt; Nés à Lomé. Codeurs avant tout.</p>
              <p>
                Tout a commencé avec un constat simple : en Afrique de l'Ouest, l'informatique et la
                programmation n'ont pas encore trouvé leur place dans l'éducation des enfants.
                Pas par manque d'intelligence — par manque d'opportunité.
              </p>
              <p>
                Pendant ce temps, des enfants en Europe ou en Amérique du Nord grandissent entourés
                d'outils, de cours accessibles, de ressources dans leur langue. Ils prennent de l'avance,
                pas parce qu'ils sont plus doués, mais parce que l'environnement le permet.
              </p>
              <p>
                On est une équipe de jeunes Togolais — développeurs, éducateurs, designers, pédagogues —
                convaincus que nos enfants méritent la même chance. Et on a décidé de faire quelque chose.
              </p>
              <p>
                <strong className="text-white">codeKids</strong>, c&apos;est ce qu&apos;on aurait voulu avoir à 12 ans :
                des cours en français, adaptés à notre réalité, animés par de vrais mentors locaux,
                avec des projets concrets qui donnent envie d&apos;aller plus loin.
              </p>
              <p>
                L&apos;idée n&apos;est pas de former des génies. C&apos;est de donner à chaque enfant
                de 10 à 18 ans et plus les outils pour comprendre le monde numérique qui l&apos;entoure,
                l&apos;apprivoiser, et un jour — peut-être — le transformer.
              </p>
            </div>
          </div>

          {/* Colonne droite — citation + valeurs */}
          <div className="space-y-6">

            <div className="rounded-2xl p-7 border border-brand-amber-dark/25 bg-brand-amber-light">
              <div className="text-4xl mb-4 text-brand-amber-dark" style={{ fontFamily: "Georgia, serif" }}>&quot;</div>
              <p className="text-lg font-bold text-ink leading-relaxed mb-5">
                On a tous appris à coder dans des conditions difficiles. On veut que la prochaine
                génération n&apos;ait pas à se battre pour ça. Elle a juste à vouloir.
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm bg-brand-amber-dark text-white">
                  K
                </div>
                <div>
                  <div className="text-ink font-black text-sm">L&apos;équipe codeKids</div>
                  <div className="text-xs font-bold text-ink-light">Lomé, Togo</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "🌍", titre: "Contexte local", texte: "Exemples, personnages et références tirés de la réalité africaine" },
                { icon: "🇫🇷", titre: "100% en français", texte: "Pas de barrière linguistique pour apprendre les bases" },
                { icon: "🧑‍🏫", titre: "Mentors certifiés", texte: "Des encadrants formés, salariés, présents à chaque session" },
                { icon: "🎮", titre: "Appris en jouant", texte: "XP, badges, projets réels — l'enfant avance sans s'en rendre compte" },
              ].map((v) => (
                <div key={v.titre} className="rounded-2xl p-4 border border-cream-border bg-card">
                  <div className="text-2xl mb-2">{v.icon}</div>
                  <div className="text-ink font-black text-sm mb-1">{v.titre}</div>
                  <div className="text-xs leading-relaxed text-ink-muted">{v.texte}</div>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              className="flex items-center justify-between rounded-2xl px-5 py-4 transition-colors group border border-brand-amber-dark/25 bg-brand-amber-light hover:bg-brand-amber-light/70"
            >
              <div>
                <div className="text-ink font-black text-sm">Vous voulez en savoir plus ?</div>
                <div className="text-xs font-bold mt-0.5 text-ink-light">
                  Écrivez-nous — on répond dans la journée.
                </div>
              </div>
              <span className="text-xl transition-transform group-hover:translate-x-1 text-brand-amber-dark">→</span>
            </a>

          </div>
        </div>
      </div>
    </section>
  );
}
