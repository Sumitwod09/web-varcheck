'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useScroll, useSpring, useTransform } from 'framer-motion';
import * as THREE from 'three';

function WireframeGeometry() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { scrollYProgress } = useScroll();
  
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 30,
    restDelta: 0.001,
  });

  const rotationY = useTransform(smoothProgress, [0, 1], [0, Math.PI * 2]);
  const rotationX = useTransform(smoothProgress, [0, 1], [0, Math.PI * 0.5]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y = rotationY.get();
      meshRef.current.rotation.x = rotationX.get() + 0.3;
      meshRef.current.rotation.z += 0.001;
    }
  });

  const geometry = useMemo(() => new THREE.IcosahedronGeometry(2.4, 1), []);

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshBasicMaterial
        wireframe
        color="#E5E5E5"
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

function SecondaryGeometry() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { scrollYProgress } = useScroll();
  
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 30,
    damping: 40,
    restDelta: 0.001,
  });

  const rotationY = useTransform(smoothProgress, [0, 1], [Math.PI, Math.PI * 3]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y = rotationY.get();
      meshRef.current.rotation.x -= 0.002;
    }
  });

  const geometry = useMemo(() => new THREE.OctahedronGeometry(1.2, 0), []);

  return (
    <mesh ref={meshRef} geometry={geometry} position={[3, -1, -2]}>
      <meshBasicMaterial
        wireframe
        color="#E5E5E5"
        transparent
        opacity={0.3}
      />
    </mesh>
  );
}

function FloatingParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  
  const positions = useMemo(() => {
    const pos = new Float32Array(60 * 3);
    for (let i = 0; i < 60; i++) {
      pos[i * 3] = Math.sin(i * 1.7) * 6;
      pos[i * 3 + 1] = Math.cos(i * 2.3) * 6;
      pos[i * 3 + 2] = Math.sin(i * 3.1) * 4;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial color="#E5E5E5" size={0.03} transparent opacity={0.5} />
    </points>
  );
}

interface WireframeSceneProps {
  className?: string;
}

export default function WireframeScene({ className }: WireframeSceneProps) {
  return (
    <div className={className} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <WireframeGeometry />
        <SecondaryGeometry />
        <FloatingParticles />
      </Canvas>
    </div>
  );
}
