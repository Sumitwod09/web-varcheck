"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip on touch / coarse-pointer devices
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) {
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Target (mouse) and rendered (lerped) positions
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const dotPos = { ...mouse };
    const ringPos = { ...mouse };

    let frame = 0;

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const interactiveSelector = 'a, button, [data-cursor="hover"], input, textarea';

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && target.closest(interactiveSelector)) {
        ring.classList.add("cursor-hovering");
      }
    };
    const onOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && target.closest(interactiveSelector)) {
        ring.classList.remove("cursor-hovering");
      }
    };

    const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;

    const render = () => {
      // Dot follows fast, ring lags behind for the trailing effect
      dotPos.x = lerp(dotPos.x, mouse.x, 0.35);
      dotPos.y = lerp(dotPos.y, mouse.y, 0.35);
      ringPos.x = lerp(ringPos.x, mouse.x, 0.15);
      ringPos.y = lerp(ringPos.y, mouse.y, 0.15);

      dot.style.transform = `translate(${dotPos.x}px, ${dotPos.y}px) translate(-50%, -50%)`;
      ring.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px) translate(-50%, -50%)`;

      frame = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", onOut);
    frame = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
