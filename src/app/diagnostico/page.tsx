// src/app/diagnostico/page.tsx
"use client";

import React, { useState, useTransition, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { questions } from "./questions";
import { submitDiagnosis } from "./actions";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/Logo";

function DiagnosticWizard() {
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isPending, startTransition] = useTransition();

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));

    if (currentStep < questions.length - 1) {
      setTimeout(() => {
        setCurrentStep((prevStep) => prevStep + 1);
      }, 300); // Short delay for better UX
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;
  const isLastStep = currentStep === questions.length - 1;

  const formAction = (formData: FormData) => {
    startTransition(async () => {
      await submitDiagnosis(formData);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4 sm:p-6">
       <div className="absolute top-6 left-6">
        <Link href="/" className="flex items-center gap-2 text-foreground">
          <Logo />
        </Link>
      </div>
      <Card className="w-full max-w-2xl shadow-2xl">
        <CardHeader>
          <Progress value={progress} aria-label={`${Math.round(progress)}% completado`} className="mb-4" />
          <CardTitle className="text-2xl font-headline text-center">Diagnóstico de Madurez Tecnológica</CardTitle>
          <CardDescription className="text-center">
            Pregunta {currentStep + 1} de {questions.length}
          </CardDescription>
        </CardHeader>
        <form action={formAction}>
          <CardContent className="min-h-[250px] flex items-center">
            <fieldset key={currentQuestion.id} className="w-full">
              <legend className="text-lg font-semibold mb-6 text-center w-full">
                {currentQuestion.question}
              </legend>
              <RadioGroup
                name={currentQuestion.id}
                value={answers[currentQuestion.id] || ""}
                onValueChange={(value) => handleAnswerChange(currentQuestion.id, value)}
                className="flex flex-col gap-4 items-center"
              >
                {currentQuestion.options.map((option) => (
                  <div key={option} className="flex items-center space-x-3 w-full max-w-xs">
                    <RadioGroupItem value={option} id={`${currentQuestion.id}-${option}`} />
                    <Label htmlFor={`${currentQuestion.id}-${option}`} className="flex-1 cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </fieldset>
            
            {/* Hidden UTM fields */}
            <input type="hidden" name="utm_source" value={searchParams.get("utm_source") || ""} />
            <input type="hidden"name="utm_medium" value={searchParams.get("utm_medium") || "" } />
            <input type="hidden" name="utm_campaign" value={searchParams.get("utm_campaign") || ""} />
            <input type="hidden" name="utm_term" value={searchParams.get("utm_term") || ""} />
            <input type="hidden" name="utm_content" value={searchParams.get("utm_content") || ""} />

          </CardContent>
          <CardFooter className="flex justify-between border-t pt-6">
            <Button type="button" variant="outline" onClick={handlePrev} disabled={currentStep === 0 || isPending}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Anterior
            </Button>
            {isLastStep && (
              <Button type="submit" disabled={!answers[currentQuestion.id] || isPending} className="bg-accent hover:bg-accent/90">
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analizando...
                  </>
                ) : (
                  "Enviar resultados para análisis"
                )}
              </Button>
            )}
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default function DiagnosticPage() {
    return (
        <Suspense fallback={<div>Cargando...</div>}>
            <DiagnosticWizard />
        </Suspense>
    )
}
