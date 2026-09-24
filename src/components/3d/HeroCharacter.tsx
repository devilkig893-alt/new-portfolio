"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroCharacter() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Load only the original static Blood Raven model
  const { scene: ravenScene } = useGLTF("/3DModel/scene.gltf");
  const { camera } = useThree();

  const [modelFramed, setModelFramed] = useState(false);
  const mouse = useRef({ x: 0, y: 0 });

  // References for camera framing parameters (Increased character height to 2.2 units)
  const framingData = useRef({
    height: 2.2,
    targetY: 1.1,
    fittedDistance: 8.2, // Closer camera distance for a larger model size on screen
  });

  const initialX = useRef(2.4); // Moved further right on desktop
  const initialY = -1.8; // Stand on floor grid at Y = -1.8

  // Clone scene to avoid mutation conflicts across renders
  const clonedScene = useMemo(() => {
    return ravenScene.clone(true);
  }, [ravenScene]);

  useEffect(() => {
    // 1. Traverse meshes to enable shadows and disable frustum culling
    clonedScene.traverse((node) => {
      if ((node as THREE.Mesh).isMesh) {
        const mesh = node as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.visible = true;
        mesh.frustumCulled = false; // Prevent culling clipping
      }
    });

    // 2. Bounding Box Calculations for Auto-Centering and Normalizing Scale
    clonedScene.position.set(0, 0, 0);
    clonedScene.rotation.set(0, 0, 0);
    clonedScene.scale.set(1, 1, 1);
    clonedScene.updateMatrixWorld(true);

    const box = new THREE.Box3().setFromObject(clonedScene);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const height = size.y;

    // Shift model inside its local group space so it is centered on X and Z, and sits base-first at Y = 0
    clonedScene.position.x = -center.x;
    clonedScene.position.y = -box.min.y;
    clonedScene.position.z = -center.z;

    // Scale model to a normalized height of 2.2 units (Increased from 1.8)
    const targetHeight = 2.2;
    const scaleFactor = targetHeight / height;
    clonedScene.scale.setScalar(scaleFactor);

    // Initial rotation: Face forward and slightly left (towards the content)
    clonedScene.rotation.set(0, -1.6, 0);

    // Set camera dimensions dynamically
    const isMobileDevice = window.innerWidth < 768;
    const verticalOccupancy = 0.85; // 85% height framing
    
    const pCamera = camera as THREE.PerspectiveCamera;
    pCamera.near = 0.1;
    pCamera.far = 1000;
    pCamera.fov = isMobileDevice ? 36 : 42;
    pCamera.updateProjectionMatrix();

    const fovRad = (pCamera.fov * Math.PI) / 360;
    const verticalSpan = targetHeight / verticalOccupancy;
    const fittedDistance = (verticalSpan / 2) / Math.tan(fovRad);

    framingData.current = {
      height: targetHeight,
      targetY: targetHeight * 0.5,
      fittedDistance,
    };

    // Camera initial position looking at character center
    const initialWorldTargetY = initialY + (targetHeight * 0.5);
    pCamera.position.set(0, initialWorldTargetY, fittedDistance);
    pCamera.lookAt(0, initialWorldTargetY, 0);

    setModelFramed(true);

    // Mouse listener
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Responsive X translation directly on the groupRef (increased coordinates to push right)
    const handleResize = () => {
      if (!groupRef.current) return;
      const width = window.innerWidth;
      const pCam = camera as THREE.PerspectiveCamera;
      
      if (width < 768) {
        groupRef.current.position.x = 0;
        groupRef.current.position.y = -1.8;
        initialX.current = 0;
        framingData.current.fittedDistance = 5.6;
        pCam.fov = 36;
      } else if (width < 1024) {
        groupRef.current.position.x = 1.3; // Shifted right on tablet (from 1.0)
        groupRef.current.position.y = -1.8;
        initialX.current = 1.3;
        framingData.current.fittedDistance = 6.8;
        pCam.fov = 36;
      } else {
        groupRef.current.position.x = 2.4; // Shifted further right on desktop (from 1.9)
        groupRef.current.position.y = -1.8;
        initialX.current = 2.4;
        framingData.current.fittedDistance = 8.2; // Camera positioned closer to increase character size
        pCam.fov = 36;
      }
      pCam.updateProjectionMatrix();
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // 3. GSAP ScrollTrigger timeline matching the video flow
    if (groupRef.current) {
      const isMobileDeviceTrigger = window.innerWidth < 768;
      
      // Walk forward entrance animation on load (Z: -4 to 0)
      gsap.fromTo(
        groupRef.current.position,
        {
          z: -4,
        },
        {
          z: 0,
          duration: 2.2,
          ease: "power2.out",
        }
      );

      gsap.fromTo(
        groupRef.current.position,
        {
          y: -1.8,
        },
        {
          y: isMobileDeviceTrigger ? -2.4 : -2.2,
          scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, [clonedScene, camera]);

  // Adjust camera to keep lookAt target aligned and add subtle animations
  useFrame((state) => {
    if (!groupRef.current || !modelFramed) return;
    
    const time = state.clock.getElapsedTime();
    const { targetY, fittedDistance } = framingData.current;

    // Track groupRef's Y position
    const currentY = groupRef.current.position.y;
    const worldTargetY = currentY + targetY;

    // Mouse follow camera offsets with smooth interpolation (lerp)
    const targetCamX = mouse.current.x * 0.45;
    const targetCamY = worldTargetY + mouse.current.y * 0.35;
    
    camera.position.x += (targetCamX - camera.position.x) * 0.08;
    camera.position.y += (targetCamY - camera.position.y) * 0.08;
    camera.position.z += (fittedDistance - camera.position.z) * 0.08;

    camera.lookAt(0, worldTargetY, 0);

    // Subtle levitation/breathing animation for organic static look
    const floatSpeed = 1.6;
    const hoverY = Math.sin(time * floatSpeed) * 0.05;
    const hoverSway = Math.sin(time * (floatSpeed * 0.5)) * 0.025;
    const hoverTilt = Math.cos(time * floatSpeed) * 0.012;
    
    clonedScene.position.y = hoverY;
    clonedScene.rotation.z = hoverSway;
    clonedScene.rotation.x = hoverTilt;

    // Damped mouse rotation lookAngles
    const defaultRotY = -1.6;
    const targetRotY = defaultRotY + mouse.current.x * 0.18;
    const targetRotX = mouse.current.y * 0.08;

    clonedScene.rotation.y += (targetRotY - clonedScene.rotation.y) * 0.08;
    clonedScene.rotation.x += (targetRotX - clonedScene.rotation.x) * 0.08;
  });

  return (
    <group ref={groupRef} position={[0, -1.8, 0]} scale={[1, 1, 1]}>
      <primitive object={clonedScene} />
    </group>
  );
}

useGLTF.preload("/3DModel/scene.gltf");
