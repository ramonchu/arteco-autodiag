// src/app/diagnostico/actions.ts
"use server";

import { redirect } from "next/navigation";
import { questions } from "./questions";
import { pool } from "@/lib/db";



export async function submitDiagnosis(formData: FormData) {
  const answers: Record<string, string> = {};
  const utmParams: Record<string, string | undefined> = {
    utm_source: formData.get("utm_source")?.toString(),
    utm_medium: formData.get("utm_medium")?.toString(),
    utm_campaign: formData.get("utm_campaign")?.toString(),
    utm_term: formData.get("utm_term")?.toString(),
    utm_content: formData.get("utm_content")?.toString(),
  };

  const questionIds = new Set(questions.map((q) => q.id));

  for (const [key, value] of formData.entries()) {
    if (questionIds.has(key)) {
      answers[key] = value.toString();
    }
  }


    const objectArgs: any = {
      answers,
      utmParams,
    };

    // Save results only for users coming from apollo.io
    if (utmParams.utm_source?.includes("apollo.io")) {
      await pool.query(
        `CREATE TABLE IF NOT EXISTS diagnostics (
          id SERIAL PRIMARY KEY,
          created_at TIMESTAMPTZ DEFAULT now(),
          answers JSONB,
          utm_params JSONB
        )`
      );
      await pool.query(
        "INSERT INTO diagnostics (answers, utm_params) VALUES ($1, $2)",
        [answers, utmParams]
      );
    }

  // Redirect to thank you page with the insight
  try {
    redirect(`/gracias?insight=${encodeURIComponent(JSON.stringify(objectArgs))}`);
  } catch (error: any) {
    // Rethrow Next.js redirect errors so the framework can handle them
    if (error?.digest?.startsWith("NEXT_REDIRECT")) throw error;
    console.error("Error submitting diagnosis:", error);
    redirect("/gracias?error=true");
  }
}
