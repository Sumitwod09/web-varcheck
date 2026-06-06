"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface Service {
  no: string;
  title: string;
  desc: string;
}

const SERVICES: Service[] = [
  {
    no: "01",
    title: "Software Engineering",
    desc: "Full-stack, cross-platform, and unreasonably fast to ship.",
  },
  {
    no: "02",
    title: "UI/UX Design",
    desc: "Interfaces that make your competitors feel bad about theirs.",
  },
  {
    no: "03",
    title: "Mobile Apps",
    desc: "React Native and Flutter. One codebase. No excuses.",
  },
  {
    no: "04",
    title: "Design Systems",
    desc: "The kind of consistency that makes designers cry happy tears.",
  },
];

export default function Services() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".services-head",
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
        ".service-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: ".services-grid", start: "top 80%" },
        }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="services"
      className="relative flex min-h-[100svh] w-full items-center px-6 py-28 md:px-10"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="services-head mb-16 flex flex-col items-start gap-4">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-acid">
            // What we do
          </span>
          <h2 className="font-display text-4xl font-bold tracking-tightest text-white sm:text-5xl md:text-6xl">
            Services, minus the fluff.
          </h2>
        </div>

        <div className="services-grid grid grid-cols-1 gap-5 sm:grid-cols-2">
          {SERVICES.map((service) => (
            <motion.article
              key={service.no}
              data-cursor="hover"
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="service-card group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.015] p-8 transition-colors duration-300 hover:border-acid md:p-10"
            >
              {/* Hover glow */}
              <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-acid/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative z-10">
                <span className="font-mono text-sm text-white/30 transition-colors group-hover:text-acid">
                  {service.no}
                </span>
                <h3 className="mt-6 font-display text-2xl font-semibold text-white md:text-3xl">
                  {service.title}
                </h3>
                <p className="mt-4 max-w-md text-base leading-relaxed text-white/50">
                  {service.desc}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
