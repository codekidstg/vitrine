"use client";

import { useRef, useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

const SUBJECTS = [
  { value: "inscription", label: "Inscrire mon enfant" },
  { value: "information", label: "Demande d'information" },
  { value: "mentor", label: "Devenir mentor" },
  { value: "autre", label: "Autre" },
] as const;

type SubjectValue = (typeof SUBJECTS)[number]["value"];

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [subject, setSubject] = useState<SubjectValue>("inscription");
  const mountedAt = useRef(Date.now());

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      subject,
      name: String(data.get("name") || ""),
      childAge: subject === "inscription" ? String(data.get("childAge") || "") : "",
      contact: String(data.get("contact") || ""),
      message: String(data.get("message") || ""),
      company: String(data.get("company") || ""),
      startedAt: mountedAt.current,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) {
        setStatus("error");
        setErrorMsg(json.error || "Une erreur est survenue.");
        return;
      }
      setStatus("sent");
      form.reset();
      setSubject("inscription");
    } catch {
      setStatus("error");
      setErrorMsg("Impossible d'envoyer le message — vérifiez votre connexion et réessayez.");
    }
  }

  return (
    <section id="contact" className="bg-cream py-20 px-6 md:px-14 border-t border-cream-border">
      <div className="max-w-xl mx-auto">
        <p className="text-xs font-extrabold uppercase tracking-widest text-brand-amber-dark mb-4 text-center">
          Contact
        </p>
        <h2 className="hud-display text-4xl text-ink mb-3 text-center">Parlons-en</h2>
        <p className="text-ink-muted text-sm text-center mb-10 max-w-md mx-auto">
          Une question, une envie de rejoindre l&apos;équipe, ou prêt à inscrire votre enfant ? Écrivez-nous — on répond dans la journée.
        </p>

        {status === "sent" ? (
          <div className="bg-card border border-cream-border rounded-2xl p-8 text-center">
            <div className="text-3xl mb-3">🎉</div>
            <div className="font-black text-ink text-lg mb-1">Message envoyé !</div>
            <p className="text-ink-muted text-sm">On revient vers vous très vite.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-card border border-cream-border rounded-2xl p-7 flex flex-col gap-5">
            {/* Honeypot anti-spam — invisible pour un humain, souvent rempli par les robots */}
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
            />

            <div>
              <label className="block text-xs font-extrabold uppercase tracking-widest text-ink-light mb-2.5">
                Sujet de votre demande
              </label>
              <div className="flex flex-wrap gap-2">
                {SUBJECTS.map((s) => (
                  <button
                    key={s.value}
                    type="button"
                    onClick={() => setSubject(s.value)}
                    className={`text-xs font-extrabold px-3.5 py-2 rounded-lg border transition-all ${
                      subject === s.value
                        ? "bg-brand-amber-light border-brand-amber-dark/40 text-brand-amber-dark"
                        : "bg-cream border-cream-border text-ink-light hover:border-ink-light/40"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="name" className="block text-xs font-extrabold uppercase tracking-widest text-ink-light mb-2">
                Votre nom
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full rounded-xl border border-cream-border bg-cream px-4 py-3 text-sm text-ink outline-none focus:border-brand-amber-dark focus:ring-2 focus:ring-brand-amber/20 transition-all"
                placeholder="Ex : Akossiwa Améganvi"
              />
            </div>

            {subject === "inscription" && (
              <div>
                <label htmlFor="childAge" className="block text-xs font-extrabold uppercase tracking-widest text-ink-light mb-2">
                  Âge de l&apos;enfant
                </label>
                <input
                  id="childAge"
                  name="childAge"
                  type="text"
                  className="w-full rounded-xl border border-cream-border bg-cream px-4 py-3 text-sm text-ink outline-none focus:border-brand-amber-dark focus:ring-2 focus:ring-brand-amber/20 transition-all"
                  placeholder="Ex : 12 ans"
                />
              </div>
            )}

            <div>
              <label htmlFor="contact" className="block text-xs font-extrabold uppercase tracking-widest text-ink-light mb-2">
                Téléphone ou email
              </label>
              <input
                id="contact"
                name="contact"
                type="text"
                required
                className="w-full rounded-xl border border-cream-border bg-cream px-4 py-3 text-sm text-ink outline-none focus:border-brand-amber-dark focus:ring-2 focus:ring-brand-amber/20 transition-all"
                placeholder="Ex : +228 91 74 62 78"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-xs font-extrabold uppercase tracking-widest text-ink-light mb-2">
                Message <span className="normal-case font-bold text-ink-light/70">{subject === "inscription" ? "(facultatif)" : ""}</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={3}
                required={subject !== "inscription"}
                className="w-full rounded-xl border border-cream-border bg-cream px-4 py-3 text-sm text-ink outline-none focus:border-brand-amber-dark focus:ring-2 focus:ring-brand-amber/20 transition-all resize-none"
                placeholder={
                  subject === "mentor"
                    ? "Votre parcours, votre expérience d'enseignement..."
                    : subject === "information"
                    ? "Votre question..."
                    : subject === "autre"
                    ? "Dites-nous en plus..."
                    : "Une question, une disponibilité particulière..."
                }
              />
            </div>

            {status === "error" && (
              <p className="text-sm font-bold text-rose-600 bg-rose-50 border border-rose-200 rounded-xl px-4 py-3">{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="bg-brand-amber text-brand-navy-dark font-extrabold text-sm px-7 py-3.5 rounded-xl hover:brightness-110 disabled:opacity-50 transition-all"
            >
              {status === "sending" ? "Envoi en cours…" : "Envoyer ma demande →"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
