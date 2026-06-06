"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

const ACID = "#C8FF00";

/* ------------------------------------------------------------------ */
/*  HERO — rotating torus knot, wireframe + emissive, pulsing lights   */
/* ------------------------------------------------------------------ */
function HeroGeometry() {
  const knot = useRef<THREE.Mesh>(null);
  const core = useRef<THREE.Mesh>(null);
  const lightA = useRef<THREE.PointLight>(null);
  const lightB = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (knot.current) {
      knot.current.rotation.x = t * 0.15;
      knot.current.rotation.y = t * 0.22;
    }
    if (core.current) {
      core.current.rotation.x = -t * 0.1;
      core.current.rotation.z = t * 0.08;
    }
    // Pulsing point lights — make it feel alive
    if (lightA.current) {
      lightA.current.intensity = 14 + Math.sin(t * 1.6) * 8;
    }
    if (lightB.current) {
      lightB.current.intensity = 10 + Math.cos(t * 1.1) * 7;
    }
  });

  return (
    <>
      <ambientLight intensity={0.25} />
      <pointLight ref={lightA} position={[4, 3, 5]} color={ACID} intensity={16} distance={20} />
      <pointLight ref={lightB} position={[-5, -3, 2]} color="#5b6cff" intensity={12} distance={20} />
      <directionalLight position={[0, 6, 4]} intensity={0.6} color="#ffffff" />

      <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.2}>
        {/* Solid emissive core for glow */}
        <mesh ref={core} scale={0.96}>
          <icosahedronGeometry args={[1.05, 1]} />
          <meshStandardMaterial
            color="#0a0a0a"
            emissive={ACID}
            emissiveIntensity={0.35}
            metalness={0.9}
            roughness={0.25}
            flatShading
          />
        </mesh>

        {/* Wireframe torus knot shell */}
        <mesh ref={knot}>
          <torusKnotGeometry args={[1.45, 0.42, 160, 24]} />
          <meshStandardMaterial
            color={ACID}
            emissive={ACID}
            emissiveIntensity={0.6}
            metalness={0.4}
            roughness={0.3}
            wireframe
          />
        </mesh>
      </Float>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  ABOUT — slowly morphing distorted sphere                           */
/* ------------------------------------------------------------------ */
function MorphBlob() {
  const blob = useRef<THREE.Mesh>(null);
  const light = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (blob.current) {
      blob.current.rotation.y = t * 0.18;
      blob.current.rotation.z = t * 0.05;
    }
    if (light.current) {
      light.current.intensity = 9 + Math.sin(t * 1.3) * 5;
    }
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight ref={light} position={[3, 3, 4]} color={ACID} intensity={10} distance={18} />
      <pointLight position={[-4, -2, -3]} color="#6a5bff" intensity={7} distance={18} />

      <Float speed={1.1} rotationIntensity={0.4} floatIntensity={0.9}>
        <mesh ref={blob}>
          <icosahedronGeometry args={[1.5, 24]} />
          <MeshDistortMaterial
            color="#101010"
            emissive={ACID}
            emissiveIntensity={0.18}
            metalness={0.85}
            roughness={0.25}
            distort={0.42}
            speed={1.6}
          />
        </mesh>

        {/* Faint acid wireframe halo */}
        <mesh scale={1.18}>
          <icosahedronGeometry args={[1.5, 2]} />
          <meshBasicMaterial color={ACID} wireframe transparent opacity={0.08} />
        </mesh>
      </Float>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Reusable canvas wrapper                                            */
/* ------------------------------------------------------------------ */
type Variant = "hero" | "blob";

interface ThreeSceneProps {
  variant?: Variant;
  className?: string;
}

export default function ThreeScene({ variant = "hero", className }: ThreeSceneProps) {
  const cameraZ = variant === "hero" ? 5 : 4.2;

  return (
    <Canvas
      className={className}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, cameraZ], fov: 45 }}
    >
      <Suspense fallback={null}>
        {variant === "hero" ? <HeroGeometry /> : <MorphBlob />}
      </Suspense>
    </Canvas>
  );
}
