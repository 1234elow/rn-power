"use client";

import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function Torus() {
  const meshRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (!meshRef.current) return;

    // Animate on scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#services',
        start: 'top center',
        end: 'bottom center',
        scrub: 1,
      },
    });

    tl.to(meshRef.current.rotation, {
      z: Math.PI * 2,
      duration: 1,
    });

    tl.to(meshRef.current.scale, {
      x: 1.2,
      y: 1.2,
      z: 1.2,
      duration: 0.5,
      yoyo: true,
    }, 0);

    return () => {
      tl.kill();
    };
  }, []);

  // Continuous rotation
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.3;
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[1.2, 0.4, 32, 100]} />
      <meshStandardMaterial
        color="#00abcd"
        roughness={0.1}
        metalness={0.9}
        emissive="#5DADE2"
        emissiveIntensity={0.3}
      />
    </mesh>
  );
}

export default function FloatingTorus() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#ADD8E6" />
        <Torus />
      </Canvas>
    </div>
  );
}
