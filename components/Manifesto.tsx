"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface Stat {
  value: number;
  suffix: string;
  label: string;
  sub: string;
}

const STATS: Stat[] = [
  { value: 5, suffix: "+", label: "Years", sub: "and somehow still improving" },
  { value: 100, suffix: "%", label: "Client Retention", sub: "the rest simply couldn't keep up" },
  { value: 0, suffix: "", label: "Compromises Made", sub: "not even on the small stuff" },
];

export default function Manifesto() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Section reveal
      gsap.fromTo(
        ".manifesto-reveal",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: root.current,
            start: "top 70%",
          },
        }
      );

      // Number counters
      const numbers = gsap.utils.toArray<HTMLElement>(".stat-number");
      numbers.forEach((el) => {
        const target = Number(el.dataset.value || "0");
        const counter = { val: 0 };
        gsap.to(counter, {
          val: target,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
          onUpdate: () => {
            el.textContent = Math.round(counter.val).toString();
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative flex min-h-[100svh] w-full items-center justify-center px-6 py-28"
    >
      <div className="mx-auto w-full max-w-[800px] text-center">
        <h2 className="manifesto-reveal font-display text-balance text-3xl font-medium leading-[1.15] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[3.4rem]">
          Most agencies show you what they&apos;ve done.
          <br className="hidden sm:block" />{" "}
          <span className="text-white/45">
            We&apos;d rather show you what everyone else couldn&apos;t.
          </span>
        </h2>

        {/* Top rule */}
        <div className="manifesto-reveal mx-auto mt-20 h-px w-full max-w-3xl bg-white/10" />

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`manifesto-reveal flex flex-col items-center px-4 py-10 ${
                i !== 0 ? "border-t border-white/10 sm:border-l sm:border-t-0" : ""
              }`}
            >
              <div className="flex items-baseline font-display text-5xl font-bold tracking-tightest text-white md:text-6xl">
                <span className="stat-number text-acid" data-value={stat.value}>
                  0
                </span>
                <span className="text-acid">{stat.suffix}</span>
              </div>
              <p className="mt-4 text-sm font-medium uppercase tracking-[0.15em] text-white/80">
                {stat.label}
              </p>
              <p className="mt-2 text-sm text-white/40">{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* Bottom rule */}
        <div className="manifesto-reveal mx-auto h-px w-full max-w-3xl bg-white/10" />
      </div>
    </section>
  );
}
