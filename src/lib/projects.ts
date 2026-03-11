export interface Project {
  slug: string;
  title: string;
  category: string;
  categories: string[];
  industry: string;
  description: string;
  journey: string;
  impact: string[];
  tech: string[];
  liveUrl: string;
  heroImage: string;
}

export const PROJECTS: Project[] = [
  {
    slug: "social-og",
    title: "Social OG — Full-Stack Agency Website",
    category: "Agency Website · Next.js · Digital Marketing",
    categories: ["Agency Website", "Next.js", "Digital Marketing"],
    industry: "Digital Marketing Agency",
    description:
      "A custom Next.js 14 agency site built to convert — dark hero with kinetic typography, WhatsApp-first lead flow, and a 3-channel contact system.",
    journey:
      "Social OG came to Varcheck needing to replace a generic v0-generated template. The brief was clear — build a site that feels like a great marketer made it, not a developer. We built the full Next.js 14 site from scratch: dark hero with kinetic typography, real campaign creative collage, dual-row industry ticker, WhatsApp-first conversion flow, and a 3-channel contact system (WhatsApp + form + free audit booking via Cal.com). Every section was built to convert a specific client type.",
    impact: [
      "Replaced a template site with a custom brand identity",
      "Conversion paths reduced from 1 generic CTA to 3 targeted channels",
      "WhatsApp-first approach: avg. response initiated within 3 hours",
      "Built and deployed in under 3 weeks",
    ],
    tech: ["Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion", "Resend", "Vercel"],
    liveUrl: "https://social-og.vercel.app/",
    heroImage: "/social-og-hero.png",
  },
  {
    slug: "mbr-vastukalp",
    title: "MBR Vastukalp — Construction & Renovation Web Presence",
    category: "Business Website · Construction · Mumbai",
    categories: ["Business Website", "Construction", "Mumbai"],
    industry: "Construction, Renovation & Maintenance Services — Mumbai (25+ years experience)",
    description:
      "First-ever professional website for a 25+ year Mumbai construction firm — service-first design, WhatsApp lead gen, and offline credibility translated to digital.",
    journey:
      "MBR Vastukalp is a 25+ year old Mumbai-based construction and renovation firm with zero digital presence. They were losing leads to younger competitors who had websites. Varcheck built their first-ever professional website: a service-first design that immediately communicates trust and experience, with a clear inquiry flow, service breakdown, project portfolio, and WhatsApp lead generation baked in. The challenge was making 25 years of offline credibility feel native to digital.",
    impact: [
      "First professional digital presence in the company's 25+ year history",
      "Inquiry path reduced to one tap (WhatsApp CTA above the fold)",
      "All services, coverage areas, and credentials presented clearly for the first time",
      "Established online credibility against younger, digital-native competitors",
    ],
    tech: ["Next.js 14", "TypeScript", "Tailwind CSS", "Vercel"],
    liveUrl: "https://mbr-vastukalp.vercel.app/",
    heroImage: "/mbr-vastukalp-hero.png",
  },
  {
    slug: "savika-spices",
    title: "Savika — Premium Indian Spice D2C Store",
    category: "E-commerce · D2C Brand · FMCG",
    categories: ["E-commerce", "D2C Brand", "FMCG"],
    industry: "Premium Indian Spices — D2C E-commerce (Founded 2020, Mumbai)",
    description:
      "Full D2C e-commerce store for a premium spice brand — 50+ SKUs, cart + checkout, gift packs, FSSAI trust signals, promo codes, and artisan-warm design.",
    journey:
      "Savika had a brand identity and a product — \"India's finest spices, hand-picked from Rajasthan, Kerala & the Northeast\" — but no storefront to match. Varcheck built a full D2C e-commerce site: product catalog (50+ SKUs across 6 categories), cart, FSSAI-certified product pages, gift pack section, promo code system, category filtering, and a seamless checkout flow. The design had to feel premium — artisan, warm, authentic — without sacrificing conversion performance.",
    impact: [
      "Full e-commerce store from zero: 50+ products, 6 categories, cart + checkout",
      "Average rating of 4.9★ and 10,000+ happy customers milestone achieved",
      "Gift pack category launched — new revenue stream",
      "FSSAI certification and lab-testing trust signals built into every product page",
      "Discount + promo code system driving repeat purchases (SPICE50 campaign)",
    ],
    tech: ["Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel"],
    liveUrl: "https://savika-spices.vercel.app/",
    heroImage: "/savika-spices-hero.png",
  },
];
