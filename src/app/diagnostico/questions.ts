// src/app/diagnostico/questions.ts

export type Question = {
  id: string;
  question: string;
  options: string[];
};

export const questions: Question[] = [
  {
    id: "deploy-time",
    question: "¿Cuánto tiempo tarda tu equipo en desplegar un cambio en producción?",
    options: [
      "Menos de una hora",
      "Algunas horas",
      "Un día laborable",
      "Varios días o semanas",
    ],
  },
  {
    id: "deploy-frequency",
    question: "¿Con qué frecuencia puedes hacer despliegues sin interrumpir el servicio?",
    options: [
      "Varias veces al día",
      "Diariamente",
      "Semanalmente",
      "Mensualmente o menos",
    ],
  },
  {
    id: "automation-tools",
    question: "¿Usas herramientas de automatización como Jenkins, ArgoCD o similares para tus despliegues?",
    options: [
      "Sí, de forma extensiva en todo el ciclo",
      "Sí, para algunas partes del proceso",
      "Estamos empezando a implementarlas",
      "No, los despliegues son mayormente manuales",
    ],
  },
  {
    id: "scalability",
    question: "¿Está tu sistema preparado para escalar automáticamente según la demanda?",
    options: [
      "Sí, escala automáticamente sin intervención",
      "Escala, pero requiere ajustes manuales",
      "Tenemos planes para implementarlo",
      "No, la capacidad es fija",
    ],
  },
  {
    id: "architecture-style",
    question: "¿Tienes aplicaciones desacopladas (microservicios, serverless) o siguen siendo monolitos?",
    options: [
      "Predominan los servicios desacoplados",
      "Tenemos una mezcla de monolitos y microservicios",
      "Estamos en proceso de migrar un monolito",
      "Nuestra arquitectura es principalmente monolítica",
    ],
  },
  {
    id: "monitoring",
    question: "¿Cómo identificas cuellos de botella o fallos en tu sistema?",
    options: [
      "Con un sistema de monitoreo y alertas proactivo (observabilidad)",
      "Analizando logs y métricas después de un problema",
      "Basado en los reportes de los usuarios",
      "Es un proceso difícil y poco claro",
    ],
  },
  {
    id: "kpis",
    question: "¿Tienes KPIs (Indicadores Clave de Rendimiento) definidos sobre el rendimiento de tus aplicaciones?",
    options: [
      "Sí, y los medimos y revisamos constantemente",
      "Tenemos algunos KPIs, pero no los seguimos de cerca",
      "Estamos en proceso de definirlos",
      "No tenemos KPIs de rendimiento definidos",
    ],
  },
  {
    id: "availability",
    question: "¿Has tenido caídas o problemas de disponibilidad en los últimos 6 meses?",
    options: [
      "No, hemos tenido una alta disponibilidad",
      "Sí, problemas menores y de corta duración",
      "Sí, algunos problemas que afectaron a los usuarios",
      "Sí, caídas significativas y recurrentes",
    ],
  },
  {
    id: "fault-tolerance",
    question: "¿Tu arquitectura está preparada para tolerar fallos de componentes individuales y mantener el servicio?",
    options: [
      "Sí, es altamente resiliente y tolerante a fallos",
      "Parcialmente, algunas partes son más robustas que otras",
      "Tenemos puntos únicos de fallo críticos",
      "No, un fallo en un componente suele afectar todo el sistema",
    ],
  },
  {
    id: "development-methodology",
    question: "¿Dispones de una metodología clara (Agile, Scrum, Kanban) para desarrollar y desplegar software?",
    options: [
      "Sí, y todo el equipo la sigue de forma disciplinada",
      "Sí, pero la aplicamos de forma flexible o inconsistente",
      "Estamos intentando adoptar una metodología",
      "No tenemos una metodología formal",
    ],
  },
  {
    id: "external-audits",
    question: "¿Recibes formación o auditorías técnicas externas regularmente?",
    options: [
      "Sí, anualmente o con mayor frecuencia",
      "Sí, pero de forma esporádica",
      "Lo hemos hecho alguna vez en el pasado",
      "No, nunca hemos tenido una auditoría externa",
    ],
  },
  {
    id: "outsourcing",
    question: "¿Contratas actualmente algún servicio de IT vía outsourcing?",
    options: [
      "Sí, para áreas estratégicas y de alto valor",
      "Sí, para tareas de mantenimiento o soporte",
      "Solo para proyectos puntuales",
      "No, gestionamos todo internamente",
    ],
  },
  {
    id: "investment-forecast",
    question: "¿Qué previsión de inversión tecnológica tienes para los próximos 3 años?",
    options: [
      "Inversión significativa para modernización y crecimiento",
      "Inversión moderada para mantener operaciones",
      "Inversión limitada o solo para lo esencial",
      "No hay un presupuesto de inversión definido",
    ],
  },
];
