// src/app/gracias/page.tsx

import { Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, Lightbulb, AlertTriangle } from "lucide-react";
import { Logo } from "@/components/Logo";
import { generateRecommendations } from "@/lib/recommendations";

interface GraciasPageProps {
  searchParams: {
    insight?: string;
    error?: string;
  };
}

function GraciasContent({
  insight,
  error,
}: {
  insight?: string;
  error?: string;
}) {
  const parsed = insight ? JSON.parse(decodeURIComponent(insight)) : null;
  const recommendations = parsed ? generateRecommendations(parsed.answers) : [];

  const handleDownload = async () => {
    if (!insight) return;
    const res = await fetch(`/api/pdf?insight=${encodeURIComponent(insight)}`);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'diagnostico.pdf';
    a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4 sm:p-6">
      <div className="absolute top-6 left-6">
        <Link href="/" className="flex items-center gap-2 text-foreground">
          <Logo />
        </Link>
      </div>
      <Card className="w-full max-w-2xl text-center shadow-2xl animate-in fade-in duration-500">
        <CardHeader>
          <div className="mx-auto w-fit bg-green-100 dark:bg-green-900/50 p-3 rounded-full mb-4">
            <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
          </div>
          <CardTitle className="text-3xl font-headline">
            ¡Gracias por completar el diagnóstico!
          </CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Hemos recibido tus respuestas. Un miembro del equipo de Arteco
            Consulting se pondrá en contacto contigo pronto.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {error ? (
              <div className="bg-destructive/10 border border-destructive/20 text-destructive p-4 rounded-md flex items-start gap-4">
                <AlertTriangle className="h-5 w-5 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Ocurrió un error</p>
                  <p className="text-sm">
                    No pudimos generar tu insight personalizado en este momento,
                    pero nuestro equipo revisará tus respuestas manualmente.
                  </p>
                </div>
              </div>
            ) : (
              parsed && (
                <div className="bg-primary/10 border border-primary/20 p-6 rounded-lg text-left space-y-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Lightbulb className="h-6 w-6 text-primary" />
                    <h3 className="text-xl font-semibold text-primary">
                      Tu Insight Accionable
                    </h3>
                  </div>
                  <p className="text-muted-foreground">
                    Hemos analizado tus respuestas. Estas son algunas recomendaciones iniciales:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    {recommendations.map((rec) => (
                      <li key={rec}>{rec}</li>
                    ))}
                  </ul>
                  <Button onClick={handleDownload} className="mt-4">Descargar PDF detallado</Button>
                </div>
              )
            )}
            <Button asChild>
              <Link href="/">Volver a la página principal</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// 👇 Hacemos async el componente de página
export default async function GraciasPage({ searchParams }: GraciasPageProps) {
  const {insight, error } = await searchParams;
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <GraciasContent insight={insight} error={error} />
    </Suspense>
  );
}
