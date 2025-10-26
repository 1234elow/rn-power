"use client";

import { useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

function EnergyCore() {
  const coreRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.InstancedMesh>(null);
  const glowRef = useRef<THREE.PointLight>(null);
  const [hovered, setHovered] = useState(false);

  // Create particle data
  const particleData = useMemo(() => {
    const count = 1200;
    const data = [];

    for (let i = 0; i < count; i++) {
      // Random orbital parameters
      const radius = 1.5 + Math.random() * 2;
      const speed = 0.2 + Math.random() * 0.5;
      const offset = Math.random() * Math.PI * 2;
      const verticalSpeed = 0.1 + Math.random() * 0.3;
      const verticalOffset = Math.random() * Math.PI * 2;
      const size = 0.02 + Math.random() * 0.04;

      data.push({
        radius,
        speed,
        offset,
        verticalSpeed,
        verticalOffset,
        size,
      });
    }

    return data;
  }, []);

  // Animate core pulsing
  useEffect(() => {
    if (!coreRef.current) return;

    gsap.to(coreRef.current.scale, {
      x: 1.15,
      y: 1.15,
      z: 1.15,
      duration: 2,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });

    // Pulsing glow
    if (glowRef.current) {
      gsap.to(glowRef.current, {
        intensity: 3,
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    }
  }, []);

  // Animate particles
  useFrame((state) => {
    if (!particlesRef.current) return;

    const time = state.clock.getElapsedTime();
    const speedMultiplier = hovered ? 1.5 : 1;
    const matrix = new THREE.Matrix4();
    const color = new THREE.Color();

    particleData.forEach((particle, i) => {
      // Spiral motion
      const angle = time * particle.speed * speedMultiplier + particle.offset;
      const x = Math.cos(angle) * particle.radius;
      const z = Math.sin(angle) * particle.radius;
      const y = Math.sin(time * particle.verticalSpeed + particle.verticalOffset) * 1.5;

      // Set position
      matrix.makeTranslation(x, y, z);
      matrix.scale(new THREE.Vector3(particle.size, particle.size, particle.size));
      particlesRef.current!.setMatrixAt(i, matrix);

      // Color transition based on distance from core
      const distanceFromCore = Math.sqrt(x * x + y * y + z * z);
      const normalizedDistance = Math.min(distanceFromCore / 3, 1);

      // Fade from white (close) to cyan (far)
      color.setHSL(0.55, 0.7, 0.5 + normalizedDistance * 0.3);
      particlesRef.current!.setColorAt(i, color);
    });

    particlesRef.current.instanceMatrix.needsUpdate = true;
    if (particlesRef.current.instanceColor) {
      particlesRef.current.instanceColor.needsUpdate = true;
    }

    // Slow core rotation
    if (coreRef.current) {
      coreRef.current.rotation.y += 0.002;
      coreRef.current.rotation.x += 0.001;
    }
  });

  return (
    <group
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {/* Central energy core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial
          color="#5DADE2"
          emissive="#5DADE2"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Glow effect */}
      <pointLight
        ref={glowRef}
        position={[0, 0, 0]}
        color="#5DADE2"
        intensity={2}
        distance={8}
      />

      {/* Flowing particles */}
      <instancedMesh
        ref={particlesRef}
        args={[undefined, undefined, particleData.length]}
      >
        <sphereGeometry args={[1, 8, 8]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#5DADE2"
          emissiveIntensity={0.5}
          transparent
          opacity={0.8}
        />
      </instancedMesh>

      {/* Outer glow ring */}
      <mesh>
        <torusGeometry args={[2.5, 0.05, 16, 100]} />
        <meshStandardMaterial
          color="#5DADE2"
          emissive="#5DADE2"
          emissiveIntensity={0.4}
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  );
}

export default function MorphingSphere() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} />
        <EnergyCore />
      </Canvas>
    </div>
  );
}
