import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import Link from 'next/link';
import { ArrowRight, Clock, EyeOff, Unplug, ZapOff, CheckCircle } from 'lucide-react';
import Image from 'next/image';

const commonProblems = [
  {
    icon: <Clock className="w-8 h-8 text-primary" />,
    title: 'Despliegues lentos',
    description: 'Cambios que tardan semanas o meses en llegar a producción, frenando la innovación.',
  },
  {
    icon: <EyeOff className="w-8 h-8 text-primary" />,
    title: 'Falta de observabilidad',
    description: 'Dificultad para entender qué está pasando en tus sistemas y por qué fallan.',
  },
  {
    icon: <Unplug className="w-8 h-8 text-primary" />,
    title: 'Sistemas monolíticos',
    description: 'Dependencia de sistemas rígidos que dificultan la escalabilidad y la agilidad.',
  },
  {
    icon: <ZapOff className="w-8 h-8 text-primary" />,
    title: 'Ausencia de automatización',
    description: 'Procesos manuales y repetitivos que consumen tiempo y son propensos a errores.',
  },
];

const howItWorks = [
    {
        icon: <CheckCircle className="w-8 h-8 text-accent" />,
        title: "1. Responde el cuestionario",
        description: "Completa nuestro asistente paso a paso. Te tomará solo unos minutos."
    },
    {
        icon: <CheckCircle className="w-8 h-8 text-accent" />,
        title: "2. Envía tus respuestas",
        description: "Tus datos serán procesados de forma segura para generar tu perfil de madurez."
    },
    {
        icon: <CheckCircle className="w-8 h-8 text-accent" />,
        title: "3. Recibe un análisis inicial",
        description: "Obtén un insight accionable inmediato y espera el contacto de nuestro equipo de expertos."
    }
]

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <section className="container mx-auto px-4 py-16 md:py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-headline mb-4 text-foreground">
            Evalúa la madurez de tu plataforma IT
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground mb-8">
            Descubre áreas de mejora y optimiza tus procesos tecnológicos con nuestro autodiagnóstico gratuito. Obtén una visión clara de tu estado actual y los siguientes pasos para innovar.
          </p>
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="/diagnostico">
              Comienza tu autodiagnóstico gratuito <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </section>

        <section id="problemas" className="bg-card py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline">¿Te enfrentas a estos desafíos?</h2>
                    <p className="text-lg text-muted-foreground mt-2">Identifica si tu empresa sufre de estos problemas comunes.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {commonProblems.map((problem) => (
                        <Card key={problem.title} className="text-center p-6 border-2 border-transparent hover:border-primary transition-all duration-300 transform hover:-translate-y-2">
                            <CardHeader>
                                <div className="mx-auto bg-primary/10 rounded-full p-3 w-fit mb-4">
                                    {problem.icon}
                                </div>
                                <CardTitle>{problem.title}</CardTitle>
                            </CardHeader>
                            <CardDescription>{problem.description}</CardDescription>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
        
        <section id="como-funciona" className="py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline">¿Cómo funciona?</h2>
                    <p className="text-lg text-muted-foreground mt-2">En solo 3 simples pasos, obtendrás una valiosa perspectiva.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                     {howItWorks.map((step) => (
                        <div key={step.title} className="flex flex-col items-center text-center">
                            <div className="mb-4">{step.icon}</div>
                            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                            <p className="text-muted-foreground">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        <section className="bg-primary text-primary-foreground py-16 md:py-24">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">¿Listo para transformar tu TI?</h2>
                <p className="max-w-2xl mx-auto text-lg mb-8">
                    El primer paso hacia la agilidad y la eficiencia es conocer tu punto de partida.
                </p>
                <Button asChild size="lg" variant="secondary" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                    <Link href="/diagnostico">
                        Realizar el diagnóstico ahora <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
            </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
