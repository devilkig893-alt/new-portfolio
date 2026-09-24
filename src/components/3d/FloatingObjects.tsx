"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function FloatingShape({
  position,
  color,
  speed = 1,
  scale = 1,
  type = "sphere",
}: {
  position: [number, number, number];
  color: string;
  speed?: number;
  scale?: number;
  type?: "sphere" | "torus" | "box";
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    // Extra independent rotational drift
    meshRef.current.rotation.x = time * 0.1 * speed;
    meshRef.current.rotation.y = time * 0.15 * speed;
  });

  return (
    <Float speed={speed * 1.5} rotationIntensity={0.5} floatIntensity={0.8}>
      <mesh ref={meshRef} position={position} scale={[scale, scale, scale]}>
        {type === "sphere" && <sphereGeometry args={[0.3, 32, 32]} />}
        {type === "torus" && <torusGeometry args={[0.2, 0.08, 16, 64]} />}
        {type === "box" && <boxGeometry args={[0.4, 0.4, 0.4]} />}
        <meshPhysicalMaterial
          color={color}
          roughness={0.2}
          metalness={0.1}
          clearcoat={0.8}
          transmission={0.6}
          thickness={0.5}
          opacity={0.3}
          transparent
        />
      </mesh>
    </Float>
  );
}

export default function FloatingObjects() {
  return (
    <group>
      {/* Drifted shapes around the screen */}
      <FloatingShape position={[-2, 1.5, -2]} color="#2E8BFF" speed={0.8} scale={1.2} type="sphere" />
      <FloatingShape position={[2.5, 2, -3]} color="#51616A" speed={1.2} scale={0.8} type="torus" />
      <FloatingShape position={[-3, -1.2, -1.5]} color="#2E8BFF" speed={0.9} scale={0.75} type="box" />
      <FloatingShape position={[3.2, -1.8, -2]} color="#EAFBFC" speed={0.7} scale={1.1} type="sphere" />
    </group>
  );
}
