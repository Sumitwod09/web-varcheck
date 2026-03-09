export const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const STATS = [
  { value: "50+", label: "Projects Delivered" },
  { value: "30+", label: "Happy Clients" },
  { value: "3+", label: "Years of Experience" },
  { value: "100%", label: "Client Satisfaction" },
] as const;

export const DIFFERENTIATORS = [
  {
    title: "Fast Delivery",
    description: "MVPs in weeks, not months. No scope creep. We ship fast because your time-to-market matters.",
    icon: "Zap",
  },
  {
    title: "Honest Pricing",
    description: "Transparent quotes, no surprise invoices. We fit all budgets — from solo founders to enterprises.",
    icon: "Shield",
  },
  {
    title: "Full-Stack Capability",
    description: "Apps, web, backend, infra. One team, zero handoffs. Everything under one roof.",
    icon: "Layers",
  },
  {
    title: "India-Based, Global Quality",
    description: "Local rates, international delivery standards. Clients in India, US, UK and beyond.",
    icon: "Globe",
  },
] as const;

export const PROCESS_STEPS = [
  {
    step: "01",
    title: "Discovery",
    description: "We listen. Understand your goals, users, and constraints. No assumptions.",
  },
  {
    step: "02",
    title: "Design",
    description: "Wireframes → high-fidelity mockups. You approve every screen before code begins.",
  },
  {
    step: "03",
    title: "Develop",
    description: "Clean, tested, production-grade code. Weekly demos so you see progress in real-time.",
  },
  {
    step: "04",
    title: "Deploy & Support",
    description: "Launch day and beyond. We handle deployment, monitoring, and post-launch support.",
  },
] as const;

export const TESTIMONIALS = [
  {
    quote: "Varcheck delivered our MVP in just 3 weeks. The quality exceeded our expectations and the communication was flawless throughout.",
    name: "Rahul Sharma",
    role: "Founder, TechStart",
    avatar: "",
  },
  {
    quote: "We needed a reliable team that could handle our complex requirements. Varcheck stepped up and delivered a scalable solution on time.",
    name: "Priya Patel",
    role: "CTO, GrowthBox",
    avatar: "",
  },
  {
    quote: "The best solution experience we've had. Transparent pricing, fast delivery, and they actually listen to what you need.",
    name: "James Wilson",
    role: "Product Manager, CloudScale",
    avatar: "",
  },
] as const;

export const CONTACT_CHANNELS = {
  whatsapp: {
    number: "918141916704",
    message: "Hi Varcheck team! 👋 I'm interested in your services and would love to discuss a project. Let's build something great together! 🚀",
    label: "WhatsApp",
    description: "Chat with us directly. Response within 4 hours.",
  },
  email: {
    address: "varcheckllp@gmail.com",
    label: "Email",
    description: "Send us a detailed brief.",
  },
  phone: {
    number: "+91 8141916704",
    label: "Phone",
    description: "Call us during business hours.",
  },
  linkedin: {
    url: "https://linkedin.com/company/varcheck",
    label: "LinkedIn",
    description: "Connect with us professionally.",
  },
} as const;

export const FOOTER_LINKS = {
  services: [
    { label: "App Development", href: "/services/app-development" },
    { label: "Web Development", href: "/services/web-development" },
    { label: "Custom Software", href: "/services/custom-software" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Work", href: "/work" },
    { label: "Contact", href: "/contact" },
  ],
} as const;
