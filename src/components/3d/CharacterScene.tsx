"use client";

import React, { Component, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import HeroCharacter from "./HeroCharacter";

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

export default function CharacterScene() {
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
        camera={{ position: [0, 1.5, 5], fov: 35 }}
        className="h-full w-full pointer-events-none"
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        <CanvasErrorBoundary>
          {/* Fog starts at 10 units and ends at 25 units, preventing it from obscuring the character at Z = 9.0 */}
          <fog attach="fog" args={["#050505", 10, 25]} />

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

          {/* Futuristic perspective floor grid across the entire Hero section (color matched to dark grey to remove red line) */}
          <gridHelper args={[100, 100, "#222222", "#151515"]} position={[0, -1.8, 0]} />

          <Suspense fallback={null}>
            <HeroCharacter />
            
            {/* Ground soft shadows */}
            <ContactShadows
              position={[0, -1.8, 0]}
              opacity={0.4}
              scale={5}
              blur={2.0}
              far={3.0}
            />
          </Suspense>
        </CanvasErrorBoundary>
      </Canvas>
    </div>
  );
}
