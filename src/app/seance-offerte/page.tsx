"use client";

import { Fragment, useMemo, useRef, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const WHATSAPP_NUMBER = "22891746278";
const TO_EMAIL_HINT = "codekidstg@proton.me";

const WEEKDAYS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

function pad(n: number) {
  return String(n).padStart(2, "0");
}
function fmt(d: Date) {
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}`;
}

function buildWeeks() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dow = (today.getDay() + 6) % 7; // 0 = lundi
  const nextMonday = new Date(today);
  nextMonday.setDate(today.getDate() - dow + 7);

  return [0, 1].map((w) => {
    const days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(nextMonday);
      d.setDate(nextMonday.getDate() + w * 7 + i);
      return { weekday: WEEKDAYS[i], date: fmt(d) };
    });
    return { label: `Semaine du ${days[0].date} au ${days[6].date}`, days };
  });
}

type Slot = "m" | "a";
type Status = "idle" | "sending" | "sent" | "error";

function Pill({
  name,
  value,
  checked,
  onChange,
  children,
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  children: React.ReactNode;
}) {
  return (
    <label className="relative cursor-pointer">
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="peer sr-only" />
      <span className="inline-block border-2 border-cream-border rounded-full px-4 py-2 text-sm font-extrabold text-ink-light select-none transition-all peer-checked:bg-brand-navy peer-checked:border-brand-navy peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-brand-amber peer-focus-visible:outline-offset-2">
        {children}
      </span>
    </label>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 min-w-[140px]">
      <label className="block text-xs font-extrabold text-ink mb-1.5">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border-2 border-cream-border bg-white px-3.5 py-2.5 text-sm font-bold text-ink outline-none focus:border-brand-amber-dark transition-colors";

function SectionHead({ icon, title, subtitle }: { icon: string; title: string; subtitle: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-9 h-9 rounded-lg bg-brand-amber-light flex items-center justify-center text-lg flex-shrink-0">{icon}</div>
      <div>
        <h2 className="font-display text-base font-black text-ink">{title}</h2>
        <p className="text-xs font-bold text-ink-light">{subtitle}</p>
      </div>
    </div>
  );
}

export default function SeanceOfferteePage() {
  const weeks = useMemo(buildWeeks, []);
  const mountedAt = useRef(Date.now());

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [age, setAge] = useState("");
  const [classe, setClasse] = useState("");
  const [exp, setExp] = useState("Jamais");
  const [pc, setPc] = useState("Ordinateur");

  const [parentNom, setParentNom] = useState("");
  const [parentTel, setParentTel] = useState("");
  const [who, setWho] = useState("Maman");
  const [presentOk, setPresentOk] = useState(false);

  const [quartier, setQuartier] = useState("");
  const [ville, setVille] = useState("Lomé");
  const [repere, setRepere] = useState("");

  const [slots, setSlots] = useState<Map<string, string>>(new Map());
  const [pref, setPref] = useState("");

  const [error, setError] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [waFallback, setWaFallback] = useState<string | null>(null);

  const errRef = useRef<HTMLDivElement>(null);
  const [company, setCompany] = useState("");

  function toggleSlot(key: string, label: string) {
    setSlots((prev) => {
      const next = new Map(prev);
      if (next.has(key)) next.delete(key);
      else next.set(key, label);
      return next;
    });
  }

  function validate(): string[] {
    const missing: string[] = [];
    if (!nom.trim() || !prenom.trim()) missing.push("le nom et prénom de l'enfant");
    if (!age.trim()) missing.push("l'âge de l'enfant");
    if (!parentNom.trim()) missing.push("votre nom");
    if (!parentTel.trim()) missing.push("votre téléphone WhatsApp");
    if (!quartier.trim()) missing.push("votre quartier");
    if (!presentOk) missing.push("la confirmation de votre présence à la séance");
    if (slots.size === 0) missing.push("au moins un créneau de disponibilité");
    return missing;
  }

  function buildMessage(): string {
    const slotList = [...slots.values()];
    const lines = [
      "*PRÉ-INSCRIPTION codeKids — Séance offerte*",
      "",
      `*Enfant :* ${nom} ${prenom}, ${age} ans${classe ? ` (${classe})` : ""}`,
      `Déjà codé : ${exp} - Équipement : ${pc}`,
      "",
      `*Parent :* ${parentNom} - ${parentTel}`,
      `Présent(e) : ${who}`,
      "",
      `*Domicile :* ${quartier}${ville ? `, ${ville}` : ""}${repere ? ` (${repere})` : ""}`,
      "",
      "*Disponibilités :*",
      ...slotList.map((s) => `- ${s}`),
    ];
    if (pref.trim()) lines.push(`*Préférence :* ${pref}`);
    return lines.join("\n");
  }

  function handleValidatedAction(action: (msg: string) => void) {
    const missing = validate();
    if (missing.length) {
      setError(`Il manque : ${missing.join(", ")}.`);
      setTimeout(() => errRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 0);
      return;
    }
    setError("");
    action(buildMessage());
  }

  function openWhatsApp(msg: string) {
    const encoded = encodeURIComponent(msg);
    const deep = `whatsapp://send?phone=${WHATSAPP_NUMBER}&text=${encoded}`;
    const web = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
    let opened = false;
    function markOpened() {
      if (document.hidden) opened = true;
    }
    document.addEventListener("visibilitychange", markOpened);
    try {
      window.location.href = deep;
    } catch {
      // ignore
    }
    setTimeout(() => {
      document.removeEventListener("visibilitychange", markOpened);
      if (opened || document.hidden) return;
      const a = document.createElement("a");
      a.href = web;
      a.target = "_blank";
      a.rel = "noopener";
      document.body.appendChild(a);
      a.click();
      a.remove();
      setWaFallback(web);
    }, 1800);
  }

  async function sendEmail(msg: string) {
    setStatus("sending");
    try {
      const res = await fetch("/api/seance-offerte", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          childName: `${nom} ${prenom}`,
          message: msg,
          company,
          startedAt: mountedAt.current,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setStatus("error");
        setError(json.error || "L'envoi a échoué. Réessayez, ou passez par WhatsApp.");
        return;
      }
      setStatus("sent");
    } catch {
      setStatus("error");
      setError("Impossible d'envoyer le message — vérifiez votre connexion, ou passez par WhatsApp.");
    }
  }

  if (status === "sent") {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 bg-cream flex items-center justify-center px-6 py-24">
          <div className="max-w-md text-center bg-card border border-cream-border rounded-2xl p-10">
            <div className="text-4xl mb-4">🎉</div>
            <h1 className="hud-display text-3xl text-ink mb-2">Demande envoyée !</h1>
            <p className="text-ink-muted text-sm">On revient vers vous très vite par WhatsApp ou téléphone pour caler la séance offerte.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-brand-navy px-6 md:px-14 py-14">
          <div
            className="absolute inset-0 pointer-events-none opacity-60"
            style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "24px 24px" }}
          />
          <div className="relative max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-brand-amber text-brand-navy-dark font-extrabold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
              🎁 Séance offerte
            </div>
            <h1 className="hud-display text-3xl md:text-4xl text-white mb-3">
              Réserve le 1er cours <span className="text-brand-amber">offert</span> de ton enfant
            </h1>
            <p className="text-white/60 text-sm md:text-base">
              2 minutes suffisent. Tes réponses nous permettent de préparer une séance adaptée à ton enfant — et de venir chez toi au bon moment.
            </p>
          </div>
        </section>

        <section className="bg-cream px-6 md:px-14 py-12">
          <div className="max-w-2xl mx-auto bg-card border border-cream-border rounded-2xl p-6 md:p-8 flex flex-col gap-9">
            {/* Enfant */}
            <div>
              <SectionHead icon="🧒" title="Ton enfant" subtitle="Pour préparer une séance à son niveau" />
              <div className="flex flex-wrap gap-3 mb-3">
                <Field label="Nom" required>
                  <input className={inputClass} value={nom} onChange={(e) => setNom(e.target.value)} placeholder="Ex. Akoua" />
                </Field>
                <Field label="Prénom" required>
                  <input className={inputClass} value={prenom} onChange={(e) => setPrenom(e.target.value)} placeholder="Ex. Kafui" />
                </Field>
              </div>
              <div className="flex flex-wrap gap-3 mb-4">
                <Field label="Âge" required>
                  <input type="number" min={10} className={inputClass} value={age} onChange={(e) => setAge(e.target.value)} placeholder="Ex. 13" />
                </Field>
                <Field label="Classe">
                  <input className={inputClass} value={classe} onChange={(e) => setClasse(e.target.value)} placeholder="Ex. 4ème" />
                </Field>
              </div>
              <div className="mb-4">
                <label className="block text-xs font-extrabold text-ink mb-2">A-t-il / elle déjà touché à la programmation ?</label>
                <div className="flex flex-wrap gap-2">
                  {["Jamais", "Un peu", "Oui, régulièrement"].map((v) => (
                    <Pill key={v} name="exp" value={v} checked={exp === v} onChange={() => setExp(v)}>
                      {v}
                    </Pill>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-extrabold text-ink mb-2">Y a-t-il un ordinateur ou une tablette à la maison ?</label>
                <div className="flex flex-wrap gap-2">
                  {["Ordinateur", "Tablette", "Les deux", "Aucun"].map((v) => (
                    <Pill key={v} name="pc" value={v} checked={pc === v} onChange={() => setPc(v)}>
                      {v}
                    </Pill>
                  ))}
                </div>
              </div>
            </div>

            {/* Parent */}
            <div>
              <SectionHead icon="👤" title="Toi, le parent" subtitle="La séance se fait en ta présence" />
              <div className="flex flex-wrap gap-3 mb-4">
                <Field label="Ton nom" required>
                  <input className={inputClass} value={parentNom} onChange={(e) => setParentNom(e.target.value)} placeholder="Ex. M. Lawson" />
                </Field>
                <Field label="Téléphone WhatsApp" required>
                  <input type="tel" className={inputClass} value={parentTel} onChange={(e) => setParentTel(e.target.value)} placeholder="Ex. 91 00 00 00" />
                </Field>
              </div>
              <div className="mb-4">
                <label className="block text-xs font-extrabold text-ink mb-2">Qui sera présent(e) à la séance ?</label>
                <div className="flex flex-wrap gap-2">
                  {["Maman", "Papa", "Les deux", "Autre (tuteur)"].map((v) => (
                    <Pill key={v} name="who" value={v} checked={who === v} onChange={() => setWho(v)}>
                      {v}
                    </Pill>
                  ))}
                </div>
              </div>
              <label className="flex items-start gap-3 bg-brand-amber-light border-2 border-brand-amber-dark/40 rounded-2xl p-4 cursor-pointer">
                <input
                  type="checkbox"
                  checked={presentOk}
                  onChange={(e) => setPresentOk(e.target.checked)}
                  className="w-5 h-5 mt-0.5 accent-brand-navy flex-shrink-0"
                />
                <span className="text-sm font-extrabold text-brand-navy leading-snug">
                  Je confirme qu&apos;un parent sera présent pendant toute la séance offerte — c&apos;est la seule condition de l&apos;offre. <span className="text-rose-500">*</span>
                </span>
              </label>
            </div>

            {/* Adresse */}
            <div>
              <SectionHead icon="📍" title="Où habites-tu ?" subtitle="Le mentor vient à ton domicile" />
              <div className="flex flex-wrap gap-3 mb-3">
                <Field label="Quartier" required>
                  <input className={inputClass} value={quartier} onChange={(e) => setQuartier(e.target.value)} placeholder="Ex. Agoè, Bè, Tokoin…" />
                </Field>
                <Field label="Ville">
                  <input className={inputClass} value={ville} onChange={(e) => setVille(e.target.value)} />
                </Field>
              </div>
              <Field label="Point de repère (facultatif)">
                <input className={inputClass} value={repere} onChange={(e) => setRepere(e.target.value)} placeholder="Ex. non loin de la pharmacie X…" />
              </Field>
            </div>

            {/* Disponibilités */}
            <div>
              <SectionHead icon="🗓️" title="Tes disponibilités" subtitle="Coche tous les créneaux qui t'arrangent" />
              <p className="text-xs font-bold text-ink-light mb-4">Matin = 9h–12h · Après-midi = 15h–18h. Plus tu coches de créneaux, plus vite on confirme.</p>

              {weeks.map((week, wi) => (
                <div key={wi} className="mb-5">
                  <h3 className="text-xs font-black text-ink uppercase tracking-widest mb-2.5 flex items-center gap-2">
                    {week.label}
                    <span className="flex-1 h-px bg-brand-amber-light" />
                  </h3>
                  <div className="grid grid-cols-[1fr_auto_auto] gap-1.5 items-center">
                    {week.days.map((day, di) => (
                      <Fragment key={di}>
                        <div className="text-xs font-extrabold text-ink py-1">
                          {day.weekday} <span className="text-ink-light font-bold">{day.date}</span>
                        </div>
                        {(["m", "a"] as Slot[]).map((s) => {
                          const key = `w${wi}-${di}-${s}`;
                          const label = `${day.weekday.slice(0, 3)} ${day.date} ${s === "m" ? "matin" : "ap.midi"}`;
                          const checked = slots.has(key);
                          return (
                            <label key={key} className="relative cursor-pointer">
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => toggleSlot(key, label)}
                                className="peer sr-only"
                              />
                              <span className="flex items-center justify-center min-w-[76px] px-2.5 py-2 rounded-lg border-2 border-cream-border text-xs font-extrabold text-ink-light select-none transition-all peer-checked:bg-brand-amber peer-checked:border-brand-amber peer-checked:text-brand-navy-dark peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-brand-navy">
                                {s === "m" ? "Matin" : "Après-midi"}
                              </span>
                            </label>
                          );
                        })}
                      </Fragment>
                    ))}
                  </div>
                </div>
              ))}

              <Field label="Ton créneau préféré (n°1)">
                <input className={inputClass} value={pref} onChange={(e) => setPref(e.target.value)} placeholder="Ex. Mardi, matin" />
              </Field>
            </div>

            {/* Honeypot */}
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
            />

            {/* Envoi */}
            <div>
              {error && (
                <div ref={errRef} className="text-sm font-bold text-rose-600 bg-rose-50 border-2 border-rose-300 rounded-xl px-4 py-3 mb-4">
                  {error}
                </div>
              )}

              <button
                type="button"
                onClick={() => handleValidatedAction(openWhatsApp)}
                className="w-full flex items-center justify-center gap-2.5 bg-explorer text-white font-black text-base rounded-full py-4 shadow-[0_8px_20px_rgba(16,185,129,0.3)] hover:brightness-105 transition-all"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 flex-shrink-0">
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.27-1.38a9.87 9.87 0 0 0 4.72 1.2h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm5.83 14.16c-.25.7-1.44 1.33-2 1.38-.51.05-1.16.07-1.87-.12a17 17 0 0 1-1.7-.63c-2.99-1.29-4.94-4.3-5.09-4.5-.15-.2-1.22-1.62-1.22-3.09 0-1.47.77-2.19 1.05-2.49.27-.3.6-.37.8-.37h.57c.18 0 .43-.07.67.51.25.6.85 2.07.92 2.22.08.15.13.33.03.53-.1.2-.15.32-.3.5-.15.17-.31.39-.45.52-.15.15-.3.31-.13.61.17.3.76 1.26 1.64 2.04 1.12 1 2.07 1.31 2.37 1.46.3.15.47.13.65-.08.17-.2.74-.87.94-1.17.2-.3.4-.25.67-.15.28.1 1.75.83 2.05.98.3.15.5.22.57.35.08.12.08.72-.17 1.42Z" />
                </svg>
                Envoyer via WhatsApp
              </button>

              {waFallback && (
                <p className="text-center text-xs font-bold text-ink-light mt-3">
                  WhatsApp ne s&apos;est pas ouvert ?{" "}
                  <a href={waFallback} target="_blank" rel="noopener" className="text-brand-amber-dark underline">
                    Ouvrir WhatsApp ici
                  </a>
                </p>
              )}

              <p className="text-center text-xs font-bold text-ink-light mt-3">
                Pas WhatsApp ?{" "}
                <button
                  type="button"
                  disabled={status === "sending"}
                  onClick={() => handleValidatedAction(sendEmail)}
                  className="text-brand-amber-dark underline font-extrabold disabled:opacity-50"
                >
                  {status === "sending" ? "Envoi en cours…" : "Envoyer par email"}
                </button>
              </p>
            </div>
          </div>

          <p className="max-w-2xl mx-auto text-center text-xs font-bold text-ink-light mt-8 leading-relaxed">
            <strong className="text-ink">codeKids</strong> · Cours particuliers de programmation à domicile · 10 ans et plus · Lomé
            <br />
            📞 +228 91 74 62 78 · {TO_EMAIL_HINT}
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
