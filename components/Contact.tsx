"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Contact() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-reveal",
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
      id="contact"
      className="relative flex min-h-[100svh] w-full flex-col justify-between overflow-hidden"
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 translate-y-1/3 rounded-full opacity-30 blur-[140px]"
        style={{ background: "radial-gradient(circle, #c8ff0033, transparent 70%)" }}
      />

      {/* Center content */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center">
        <span className="contact-reveal font-mono text-xs uppercase tracking-[0.35em] text-acid">
          Let&apos;s work together
        </span>

        <h2 className="contact-reveal mt-8 font-display text-6xl font-bold tracking-tightest text-white sm:text-8xl md:text-[9rem] lg:text-[11rem]">
          Don&apos;t wait.
        </h2>

        <p className="contact-reveal mt-6 max-w-md text-base text-white/50 sm:text-lg">
          If you&apos;re reading this, you already know you need us.
        </p>

        <motion.a
          href="mailto:hello@varcheck.in"
          data-cursor="hover"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 320, damping: 20 }}
          className="contact-reveal group mt-12 inline-flex items-center gap-3 rounded-full bg-acid px-9 py-4 text-base font-semibold text-black"
        >
          Start a conversation
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </motion.a>
      </div>

      {/* Footer bar */}
      <footer className="relative z-10 border-t border-white/10 px-6 py-8 md:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 text-center text-xs text-white/40 md:flex-row md:justify-between md:text-left">
          <p>© 2025 Varcheck. All rights reserved.</p>
          <p className="order-first font-mono uppercase tracking-[0.2em] text-white/60 md:order-none">
            Made by Sumit Wod
          </p>
          <div className="flex items-center gap-5">
            <a
              href="https://instagram.com/sumit_wod"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="transition-colors hover:text-acid"
            >
              @sumit_wod
            </a>
            <span className="h-3 w-px bg-white/20" />
            <a
              href="https://sumitwod.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="transition-colors hover:text-acid"
            >
              sumitwod.vercel.app
            </a>
          </div>
        </div>
      </footer>
    </section>
  );
}
