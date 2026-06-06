"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";

// 3D canvas is client-only — never render it on the server
const ThreeScene = dynamic(() => import("@/components/ThreeScene"), {
  ssr: false,
});

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".hero-stagger", { opacity: 0, y: 40 });
      gsap
        .timeline({ delay: 0.2 })
        .to(".hero-stagger", {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.12,
        })
        .to(
          ".hero-scroll-cue",
          { opacity: 1, duration: 0.8, ease: "power2.out" },
          "-=0.3"
        );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="top"
      className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden"
    >
      {/* 3D layer */}
      <div className="absolute inset-0 z-0">
        <ThreeScene variant="hero" />
      </div>

      {/* Radial glow behind content */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-[120px]"
        style={{ background: "radial-gradient(circle, #c8ff0033, transparent 70%)" }}
      />

      {/* Pill badge top-left */}
      <div className="hero-stagger absolute left-6 top-24 z-10 md:left-10 md:top-28">
        <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-white/80">
          <span className="h-1.5 w-1.5 rounded-full bg-acid" />
          Varcheck Studio
        </span>
      </div>

      {/* Est. tag bottom-right */}
      <div className="hero-stagger absolute bottom-10 right-6 z-10 text-right font-mono text-[10px] uppercase tracking-[0.25em] text-white/40 md:right-10 md:text-xs">
        Est. 2024 — India
      </div>

      {/* Headline */}
      <div className="relative z-10 px-6 text-center">
        <h1 className="font-display text-balance leading-[0.95] tracking-tightest">
          <span className="hero-stagger block text-5xl font-thin text-white/90 sm:text-7xl md:text-8xl lg:text-[8.5rem]">
            We build things
          </span>
          <span className="hero-stagger block text-5xl font-bold text-white sm:text-7xl md:text-8xl lg:text-[8.5rem]">
            embarrassingly{" "}
            <span className="text-acid">good.</span>
          </span>
        </h1>

        <p className="hero-stagger mx-auto mt-8 max-w-xl text-base text-white/55 sm:text-lg">
          Software. Design. Strategy. Not in that order.
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll-cue absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 opacity-0">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
          Scroll
        </span>
        <span className="h-12 w-px origin-top animate-scrollPulse bg-gradient-to-b from-acid to-transparent" />
      </div>
    </section>
  );
}
