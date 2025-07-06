// src/app/diagnostico/actions.ts
"use server";

import { redirect } from "next/navigation";
import { generateActionableInsights } from "@/ai/flows/generate-actionable-insights";
import { questions } from "./questions";

// This is a mock function. In a real application, you would save to a database.
// e.g., import { db } from '@/lib/firebase';
// await db.collection('diagnostics').add(data);
async function saveToFirestore(data: any) {
  console.log("Saving data to Firestore (mock):", JSON.stringify(data, null, 2));
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return { id: `mock_${Date.now()}` };
}

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
    // Save to Firestore (or your DB of choice)
    await saveToFirestore({
      answers,
      utmParams,
      createdAt: new Date().toISOString(),
    });

    // Generate AI insight
    const { insight } = await generateActionableInsights({ answers });

    // Redirect to thank you page with the insight
    redirect(`/gracias?insight=${encodeURIComponent(insight)}`);

  } catch (error) {
    console.error("Error submitting diagnosis:", error);
    // Redirect to a generic thank you page if anything fails
    redirect("/gracias?error=true");
  }
}
