import { NextResponse } from "next/server";
import { Resend } from "resend";

const TO_EMAIL = "codekidstg@proton.me";
const MIN_FILL_TIME_MS = 1200;

const SUBJECT_LABELS: Record<string, string> = {
  inscription: "Inscription d'un enfant",
  information: "Demande d'information",
  mentor: "Candidature mentor",
  autre: "Autre demande",
};

export async function POST(request: Request) {
  const body = await request.json();
  const { subject, name, childAge, contact, message, company, startedAt } = body as {
    subject?: string;
    name?: string;
    childAge?: string;
    contact?: string;
    message?: string;
    company?: string;
    startedAt?: number;
  };

  // Honeypot rempli → très probablement un robot. On répond succès sans rien envoyer,
  // pour ne pas lui indiquer qu'il a été détecté.
  if (company?.trim()) {
    return NextResponse.json({ ok: true });
  }

  if (!name?.trim() || !contact?.trim()) {
    return NextResponse.json(
      { error: "Le nom et un moyen de vous contacter (téléphone ou email) sont obligatoires." },
      { status: 400 }
    );
  }

  if (typeof startedAt === "number" && Date.now() - startedAt < MIN_FILL_TIME_MS) {
    return NextResponse.json(
      { error: "Formulaire envoyé trop rapidement — réessayez." },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY manquante — impossible d'envoyer l'email de contact.");
    return NextResponse.json(
      { error: "Le formulaire n'est pas encore configuré côté serveur. Réessayez plus tard." },
      { status: 500 }
    );
  }

  const subjectLabel = SUBJECT_LABELS[subject ?? ""] ?? "Nouvelle demande";
  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: "codeKids <onboarding@resend.dev>",
    to: TO_EMAIL,
    replyTo: contact.includes("@") ? contact : undefined,
    subject: `${subjectLabel} — ${name}`,
    text: [
      `Sujet : ${subjectLabel}`,
      `Nom : ${name}`,
      childAge ? `Âge de l'enfant : ${childAge}` : null,
      `Contact (téléphone ou email) : ${contact}`,
      message ? `Message :\n${message}` : null,
    ]
      .filter(Boolean)
      .join("\n\n"),
  });

  if (error) {
    console.error("Erreur d'envoi Resend:", error);
    return NextResponse.json({ error: "L'envoi a échoué. Réessayez plus tard." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
