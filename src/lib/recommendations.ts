export type Answers = Record<string, string>;

export function generateRecommendations(answers: Answers): string[] {
  const recs: string[] = [];
  const a = answers;

  const check = (id: string, badOptions: string[], message: string) => {
    const answer = a[id];
    if (!answer) return;
    if (badOptions.some(opt => answer.startsWith(opt))) {
      recs.push(message);
    }
  };

  check(
    'automation-tools',
    ['Estamos', 'No'],
    'Implantar pipelines de CI/CD con herramientas como Jenkins o GitLab para acelerar los despliegues. Arteco puede acompañarte en este proceso.'
  );

  check(
    'scalability',
    ['Escala, pero', 'Tenemos', 'No'],
    'Adoptar una infraestructura autoescalable basada en Kubernetes y servicios cloud gestionados. Arteco ofrece consultoría para esta transición.'
  );

  check(
    'monitoring',
    ['Analizando', 'Basado', 'Es un proceso'],
    'Implementar observabilidad completa con Prometheus y Grafana para detectar problemas de forma proactiva. Arteco diseña e integra estas soluciones.'
  );

  check(
    'architecture-style',
    ['Estamos', 'Nuestra'],
    'Evolucionar hacia microservicios o serverless para aumentar la agilidad y escalabilidad. Arteco cuenta con experiencia en migraciones graduales.'
  );

  check(
    'development-methodology',
    ['Sí, pero', 'Estamos', 'No'],
    'Adoptar metodologías ágiles (Scrum, Kanban) aplicadas con disciplina. Arteco puede formarte y acompañar a tu equipo.'
  );

  check(
    'fault-tolerance',
    ['Tenemos', 'No'],
    'Reforzar la tolerancia a fallos mediante arquitecturas resilientes y pruebas periódicas. Arteco revisa y mejora la resiliencia de tus sistemas.'
  );

  check(
    'external-audits',
    ['Sí, pero', 'Lo', 'No'],
    'Programar auditorías técnicas regulares para validar buenas prácticas y detectar oportunidades de mejora. Arteco Consulting ofrece este servicio.'
  );

  check(
    'kpis',
    ['Tenemos', 'Estamos', 'No'],
    'Definir y seguir KPIs de rendimiento y disponibilidad para medir el éxito de la plataforma. Arteco te ayuda a establecerlos.'
  );

  return recs;
}
