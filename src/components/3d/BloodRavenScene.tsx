"use client";

import React, { Component, Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import BloodRavenWalker from "./BloodRavenWalker";

// Canvas Error Boundary to catch any WebGL or model loading errors
class CanvasErrorBoundary extends Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("3D Canvas Error caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/85 text-white z-[999] pointer-events-auto p-5 text-center">
          <h2 className="text-red-500 font-bold mb-2">3D Viewport Error</h2>
          <p className="text-xs text-gray-400 max-w-md">
            {this.state.error?.message || "WebGL render or asset load failure"}
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

// Animated perspective floor grid that glides backward beneath the walking character
function AnimatedFloorGrid() {
  const gridRef = useRef<THREE.GridHelper>(null);
  useFrame((state) => {
    if (gridRef.current) {
      // Synchronized backward treadmill velocity matching forward walk stride
      const t = state.clock.getElapsedTime();
      gridRef.current.position.x = -((t * 0.20) % 1.0);
      gridRef.current.position.z = -((t * 0.606) % 1.0);
    }
  });
  return (
    <gridHelper
      ref={gridRef}
      args={[100, 100, "#222222", "#151515"]}
      position={[0, -1.4, 0]}
    />
  );
}

export default function BloodRavenScene() {
  return (
    <div className="absolute inset-0 z-0 h-full w-full pointer-events-none">
      {/* Background Red Ambient Radial Glow */}
      <div className="absolute right-[10%] bottom-[10%] -z-10 h-[500px] w-[500px] rounded-full bg-red-600/10 blur-[150px] opacity-35 filter pointer-events-none" />

      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
        camera={{ position: [0, -0.3, 7.8], fov: 36 }}
        className="h-full w-full pointer-events-none"
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        <CanvasErrorBoundary>
          {/* Subtle scene fog */}
          <fog attach="fog" args={["#050505", 10, 30]} />

          {/* Soft Ambient Light for base illumination */}
          <ambientLight intensity={1.2} color="#ffffff" />

          {/* Key Directional Light for front/right illumination */}
          <directionalLight
            castShadow
            position={[5, 8, 5]}
            intensity={2.2}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-bias={-0.0001}
          />

          {/* Rim Light - Selective Red Theme Glow on armor edges */}
          <pointLight position={[-4, 3, 4]} intensity={1.5} color="#FF1E2D" />

          {/* Soft front fill light */}
          <directionalLight position={[-2, -1, 1]} intensity={0.8} color="#ffffff" />

          {/* Animated perspective floor grid that glides beneath footsteps */}
          <AnimatedFloorGrid />

          <Suspense fallback={null}>
            <BloodRavenWalker />

            {/* Soft Contact Shadows pinned to the floor plane */}
            <ContactShadows
              position={[0, -1.39, 0]}
              opacity={0.45}
              scale={6}
              blur={2.0}
              far={3.0}
            />
          </Suspense>
        </CanvasErrorBoundary>
      </Canvas>
    </div>
  );
}
