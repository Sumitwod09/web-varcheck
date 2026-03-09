export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  features: string[];
  icon: string;
}

export const SERVICES: Service[] = [
  {
    slug: "app-development",
    title: "Mobile App Development",
    shortTitle: "App Development",
    description: "Native and cross-platform mobile apps for iOS and Android. From concept to App Store, we handle everything.",
    features: [
      "React Native & Flutter",
      "iOS & Android native",
      "App Store submission",
      "Push notifications & analytics",
      "Ongoing maintenance & updates",
    ],
    icon: "Smartphone",
  },
  {
    slug: "web-development",
    title: "Web Development",
    shortTitle: "Web Development",
    description: "Fast, responsive, SEO-optimised websites and web applications. Built with modern frameworks for speed and scale.",
    features: [
      "React, Next.js, Vue.js",
      "Responsive & mobile-first",
      "SEO optimisation",
      "CMS integration",
      "E-commerce solutions",
    ],
    icon: "Monitor",
  },
  {
    slug: "custom-software",
    title: "Custom Software Solutions",
    shortTitle: "Custom Software",
    description: "Bespoke software tailored to your business processes. APIs, dashboards, automation — whatever you need, we build.",
    features: [
      "Business process automation",
      "API development & integration",
      "Admin dashboards",
      "Database design",
      "Cloud infrastructure",
    ],
    icon: "Code",
  },
];
