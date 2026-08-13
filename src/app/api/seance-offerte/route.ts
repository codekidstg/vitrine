import { NextResponse } from "next/server";
import { Resend } from "resend";

const TO_EMAIL = "codekidstg@proton.me";
const MIN_FILL_TIME_MS = 1200;

export async function POST(request: Request) {
  const body = await request.json();
  const { childName, message, company, startedAt } = body as {
    childName?: string;
    message?: string;
    company?: string;
    startedAt?: number;
  };

  // Honeypot rempli → très probablement un robot. On répond succès sans rien envoyer,
  // pour ne pas lui indiquer qu'il a été détecté.
  if (company?.trim()) {
    return NextResponse.json({ ok: true });
  }

  if (!message?.trim()) {
    return NextResponse.json({ error: "Le formulaire est incomplet." }, { status: 400 });
  }

  if (typeof startedAt === "number" && Date.now() - startedAt < MIN_FILL_TIME_MS) {
    return NextResponse.json({ error: "Formulaire envoyé trop rapidement — réessayez." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY manquante — impossible d'envoyer l'email de pré-inscription.");
    return NextResponse.json(
      { error: "L'envoi n'est pas encore configuré côté serveur. Réessayez, ou passez par WhatsApp." },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: "codeKids <onboarding@resend.dev>",
    to: TO_EMAIL,
    subject: `Pré-inscription séance offerte — ${childName || "sans nom"}`,
    text: message.replace(/\*/g, ""),
  });

  if (error) {
    console.error("Erreur d'envoi Resend:", error);
    return NextResponse.json({ error: "L'envoi a échoué. Réessayez, ou passez par WhatsApp." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
