"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const ThreeScene = dynamic(() => import("@/components/ThreeScene"), {
  ssr: false,
});

export default function About() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-reveal",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: root.current, start: "top 70%" },
        }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="about"
      className="relative flex min-h-[100svh] w-full items-center px-6 py-28 md:px-10"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 md:grid-cols-5 md:gap-8">
        {/* Left — 60% */}
        <div className="md:col-span-3">
          <span className="about-reveal mb-6 block font-mono text-xs uppercase tracking-[0.3em] text-acid">
            // The person
          </span>
          <h2 className="about-reveal font-display text-4xl font-bold tracking-tightest text-white sm:text-5xl md:text-6xl">
            Behind the Studio
          </h2>
          <p className="about-reveal mt-8 max-w-xl text-lg leading-relaxed text-white/55 md:text-xl">
            Varcheck is{" "}
            <span className="text-white">Sumit Wod</span> — a full-stack
            developer, UI/UX designer, and product builder based in India. Five
            years of shipping software that doesn&apos;t apologize for being
            good.
          </p>

          <a
            href="https://sumitwod.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            className="about-reveal group mt-10 inline-flex items-center gap-3 rounded-full border border-white/20 px-7 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:border-acid hover:bg-acid hover:text-black"
          >
            View full profile
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>

        {/* Right — 40% — morphing 3D blob */}
        <div className="about-reveal md:col-span-2">
          <div className="relative mx-auto aspect-square w-full max-w-sm">
            <div
              className="pointer-events-none absolute inset-0 rounded-full opacity-50 blur-[80px]"
              style={{
                background: "radial-gradient(circle, #c8ff0022, transparent 70%)",
              }}
            />
            <ThreeScene variant="blob" />
          </div>
        </div>
      </div>
    </section>
  );
}
