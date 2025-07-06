// src/app/diagnostico/actions.ts
"use server";

import { redirect } from "next/navigation";
import { questions } from "./questions";



export async function submitDiagnosis(formData: FormData) {
  const answers: Record<string, string> = {};
  const utmParams: Record<string, string | undefined> = {
    utm_source: formData.get("utm_source")?.toString(),
    utm_medium: formData.get("utm_medium")?.toString(),
    utm_campaign: formData.get("utm_campaign")?.toString(),
    utm_term: formData.get("utm_term")?.toString(),
    utm_content: formData.get("utm_content")?.toString(),
  };

  const questionMap = new Map(questions.map((q) => [q.id, q.question]));

  for (const [key, value] of formData.entries()) {
    if (questionMap.has(key)) {
      const questionText = questionMap.get(key);
      if (questionText) {
        answers[questionText] = value.toString();
      }
    }
  }

  try {

    const objectArgs: any = {
      answers,
      utmParams
    };

    // Redirect to thank you page with the insight
    redirect(`/gracias?insight=${encodeURIComponent(JSON.stringify(objectArgs))}`);

  } catch (error) {
    console.error("Error submitting diagnosis:", error);
    // Redirect to a generic thank you page if anything fails
    redirect("/gracias?error=true");
  }
}
