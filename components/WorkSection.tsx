"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface Project {
  no: string;
  category: string;
  title: string;
  desc: string;
  tech: string[];
  url: string;
  linkLabel: string;
  shot: string;
  shotAlt: string;
}

const PROJECTS: Project[] = [
  {
    no: "01",
    category: "Construction & Services",
    title: "MBR Vastukalp",
    desc: "Full website for a 30-year Mumbai construction company. Multi-page architecture covering Services, Gallery, Founders, and Contact. SEO-optimized, mobile-first, dark-themed. Built to establish credibility in a legacy-trust industry.",
    tech: ["Next.js", "Tailwind CSS", "SEO"],
    url: "https://www.mbrvastukalp.in",
    linkLabel: "View live site →",
    shot: "https://api.microlink.io/?url=https%3A%2F%2Fwww.mbrvastukalp.in&screenshot=true&meta=false&embed=screenshot.url",
    shotAlt: "MBR Vastukalp website screenshot",
  },
  {
    no: "02",
    category: "E-commerce",
    title: "Savika Foods",
    desc: "End-to-end e-commerce store for a premium Indian spice brand. Cart system, product catalog, category pages, promo banners, and FSSAI-certified branding. Built for D2C trust and conversion from first scroll.",
    tech: ["Next.js", "Tailwind CSS", "E-commerce"],
    url: "https://www.savikafoods.in",
    linkLabel: "View live site →",
    shot: "https://api.microlink.io/?url=https%3A%2F%2Fwww.savikafoods.in&screenshot=true&meta=false&embed=screenshot.url",
    shotAlt: "Savika Foods website screenshot",
  },
  {
    no: "03",
    category: "Personal Portfolio",
    title: "Sumit Wod — Portfolio",
    desc: "Personal portfolio built around an Apollo mythology narrative. Dark brutalist aesthetic, full-screen scroll sections, animated hero, editorial copy. Designed to filter clients before they even reach the contact form.",
    tech: ["Next.js", "Framer Motion", "Tailwind CSS"],
    url: "https://sumitwod.vercel.app",
    linkLabel: "View live site →",
    shot: "https://api.microlink.io/?url=https%3A%2F%2Fsumitwod.vercel.app&screenshot=true&meta=false&embed=screenshot.url",
    shotAlt: "Sumit Wod portfolio screenshot",
  },
  {
    no: "04",
    category: "Fashion E-commerce",
    title: "House of Saanjh",
    desc: "Traditional Indian clothing store with category navigation, hero carousel, and WhatsApp ordering integration. Designed for non-technical operators with a warm, culturally authentic look. Pan-India shipping and COD ready.",
    tech: ["Next.js", "Tailwind CSS", "WhatsApp Integration"],
    url: "https://houseofsaanjh.vercel.app",
    linkLabel: "View live site →",
    shot: "https://api.microlink.io/?url=https%3A%2F%2Fhouseofsaanjh.vercel.app&screenshot=true&meta=false&embed=screenshot.url",
    shotAlt: "House of Saanjh website screenshot",
  },
];

export default function WorkSection() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".work-head",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 75%" },
        }
      );

      gsap.fromTo(
        ".work-card",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: ".work-grid", start: "top 85%" },
        }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="work"
      className="relative flex min-h-[100svh] w-full items-center px-6 py-28 md:px-10"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="work-head mb-16 flex flex-col items-start gap-4">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-acid">
            // Our work
          </span>
          <h2 className="font-display text-4xl font-bold tracking-tightest text-white sm:text-5xl md:text-6xl">
            Work that speaks.
            <br />
            The rest is just noise.
          </h2>
        </div>

        <div className="work-grid grid grid-cols-1 gap-5 md:grid-cols-2">
          {PROJECTS.map((project) => (
            <article
              key={project.no}
              data-cursor="hover"
              className="work-card group relative flex flex-col rounded-2xl border border-[#1a1a1a] bg-[#0a0a0a] p-8 transition-colors duration-200 hover:border-white md:p-10"
            >
              {/* Live screenshot via Microlink (plain img — external dynamic URL) */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.shot}
                alt={project.shotAlt}
                width={800}
                height={450}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  objectPosition: "top",
                  borderRadius: "4px",
                  marginBottom: "24px",
                  border: "1px solid #1a1a1a",
                  display: "block",
                }}
              />

              {/* Project number */}
              <span className="font-black leading-none text-white opacity-[0.15] transition-opacity duration-200 group-hover:opacity-40 text-6xl md:text-7xl">
                {project.no}
              </span>

              {/* Category tag */}
              <div className="mt-6">
                <span className="inline-block rounded-full border border-[#2a2a2a] bg-[#1a1a1a] px-3 py-1 text-xs uppercase tracking-widest text-[#888]">
                  {project.category}
                </span>
              </div>

              {/* Title */}
              <h3 className="mt-3 font-display text-2xl font-bold text-white md:text-3xl">
                {project.title}
              </h3>

              {/* Description */}
              <p className="mt-3 text-sm leading-relaxed text-[#888888] md:text-base">
                {project.desc}
              </p>

              {/* Tech stack */}
              <div className="mt-6 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-[#111] px-3 py-1 text-xs uppercase tracking-widest text-[#555]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Live link — pinned to the bottom of the card */}
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex w-fit items-center pt-8 text-sm font-medium text-white hover:underline"
              >
                {project.linkLabel}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
