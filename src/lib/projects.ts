export interface Project {
  slug: string;
  title: string;
  category: string;
  description: string;
  problem: string;
  solution: string;
  results: string[];
  tech: string[];
  image: string;
}

export const PROJECTS: Project[] = [
  {
    slug: "fintrack-dashboard",
    title: "FinTrack Dashboard",
    category: "Web Application",
    description: "A real-time financial analytics dashboard for a fintech startup. Tracks portfolio performance, market trends, and generates automated reports.",
    problem: "The client needed a unified view of their financial data spread across multiple APIs and databases.",
    solution: "We built a responsive Next.js dashboard with real-time WebSocket updates, interactive charts, and automated PDF report generation.",
    results: ["60% reduction in manual reporting time", "99.9% uptime since launch", "Used by 500+ active traders"],
    tech: ["Next.js", "TypeScript", "PostgreSQL", "WebSocket", "Chart.js"],
    image: "",
  },
  {
    slug: "healthpulse-app",
    title: "HealthPulse Mobile App",
    category: "Mobile App",
    description: "A health & wellness tracking app with AI-powered insights, available on iOS and Android.",
    problem: "Users needed a simple way to track daily health metrics and get actionable recommendations without complexity.",
    solution: "Cross-platform React Native app with a clean UI, wearable device integration, and an AI recommendation engine.",
    results: ["10K+ downloads in first month", "4.7★ average rating", "85% daily active user retention"],
    tech: ["React Native", "Node.js", "MongoDB", "TensorFlow Lite"],
    image: "",
  },
  {
    slug: "logisync-platform",
    title: "LogiSync Platform",
    category: "Custom Software",
    description: "End-to-end logistics management platform for a mid-size supply chain company.",
    problem: "The client managed fleet tracking, inventory, and billing across 5 separate tools with no integration.",
    solution: "Unified platform with real-time GPS tracking, automated inventory management, and integrated invoicing.",
    results: ["40% improvement in delivery efficiency", "₹15L annual savings in operational costs", "Single dashboard for all operations"],
    tech: ["React", "Node.js", "PostgreSQL", "Redis", "Google Maps API"],
    image: "",
  },
];
