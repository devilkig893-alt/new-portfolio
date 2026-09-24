"use client";

import React, { useRef, useEffect, useState, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Build SkinnedMesh for Lower Body with smooth vertex weighting (Zero seams, Zero texture misalignment)
function buildSkinnedLowerBody(sourceMesh: THREE.Mesh) {
  const geom = sourceMesh.geometry.clone();
  const pos = geom.attributes.position;

  // Create 7 bones:
  // 0: Pelvis (root)
  // 1: LeftThigh, 2: LeftShin, 3: LeftFoot
  // 4: RightThigh, 5: RightShin, 6: RightFoot
  const bPelvis = new THREE.Bone();
  bPelvis.position.set(0, 0, 70);

  const bLeftThigh = new THREE.Bone();
  bLeftThigh.position.set(9.4, -13.0, 60.0 - 70.0);
  bPelvis.add(bLeftThigh);

  const bLeftShin = new THREE.Bone();
  bLeftShin.position.set(4.5 - 9.4, -14.5 - (-13.0), 40.0 - 60.0);
  bLeftThigh.add(bLeftShin);

  const bLeftFoot = new THREE.Bone();
  bLeftFoot.position.set(8.0 - 4.5, -16.0 - (-14.5), 14.0 - 40.0);
  bLeftShin.add(bLeftFoot);

  const bRightThigh = new THREE.Bone();
  bRightThigh.position.set(9.4, 13.0, 60.0 - 70.0);
  bPelvis.add(bRightThigh);

  const bRightShin = new THREE.Bone();
  bRightShin.position.set(4.5 - 9.4, 14.5 - 13.0, 40.0 - 60.0);
  bRightThigh.add(bRightShin);

  const bRightFoot = new THREE.Bone();
  bRightFoot.position.set(8.0 - 4.5, 16.0 - 14.5, 14.0 - 40.0);
  bRightShin.add(bRightFoot);

  const bones = [bPelvis, bLeftThigh, bLeftShin, bLeftFoot, bRightThigh, bRightShin, bRightFoot];
  bPelvis.updateMatrixWorld(true);
  const skeleton = new THREE.Skeleton(bones);

  const skinIndices = new Float32Array(pos.count * 4);
  const skinWeights = new Float32Array(pos.count * 4);

  for (let i = 0; i < pos.count; i++) {
    const y = pos.getY(i);
    const z = pos.getZ(i);

    let b1 = 0, b2 = 0, w1 = 1, w2 = 0;
    if (z >= 60) {
      b1 = 0; w1 = 1;
    } else if (y < 0) {
      // Left leg
      if (z >= 42) {
        if (z > 56) {
          const t = (z - 56) / 4;
          b1 = 0; w1 = t; b2 = 1; w2 = 1 - t;
        } else { b1 = 1; w1 = 1; }
      } else if (z >= 16) {
        if (z > 38) {
          const t = (z - 38) / 4;
          b1 = 1; w1 = t; b2 = 2; w2 = 1 - t;
        } else { b1 = 2; w1 = 1; }
      } else {
        if (z > 12) {
          const t = (z - 12) / 4;
          b1 = 2; w1 = t; b2 = 3; w2 = 1 - t;
        } else { b1 = 3; w1 = 1; }
      }
    } else {
      // Right leg
      if (z >= 42) {
        if (z > 56) {
          const t = (z - 56) / 4;
          b1 = 0; w1 = t; b2 = 4; w2 = 1 - t;
        } else { b1 = 4; w1 = 1; }
      } else if (z >= 16) {
        if (z > 38) {
          const t = (z - 38) / 4;
          b1 = 4; w1 = t; b2 = 5; w2 = 1 - t;
        } else { b1 = 5; w1 = 1; }
      } else {
        if (z > 12) {
          const t = (z - 12) / 4;
          b1 = 5; w1 = t; b2 = 6; w2 = 1 - t;
        } else { b1 = 6; w1 = 1; }
      }
    }

    skinIndices[i * 4] = b1; skinIndices[i * 4 + 1] = b2;
    skinWeights[i * 4] = w1; skinWeights[i * 4 + 1] = w2;
  }

  geom.setAttribute("skinIndex", new THREE.Uint16BufferAttribute(skinIndices, 4));
  geom.setAttribute("skinWeight", new THREE.Float32BufferAttribute(skinWeights, 4));

  const mat = (sourceMesh.material as THREE.Material).clone();
  if ("side" in mat) mat.side = THREE.DoubleSide;

  const skinnedMesh = new THREE.SkinnedMesh(geom, mat);
  skinnedMesh.add(bPelvis);
  skinnedMesh.bind(skeleton);
  skinnedMesh.castShadow = true;
  skinnedMesh.receiveShadow = true;

  return {
    skinnedMesh,
    bones: {
      pelvis: bPelvis,
      leftThigh: bLeftThigh,
      leftShin: bLeftShin,
      leftFoot: bLeftFoot,
      rightThigh: bRightThigh,
      rightShin: bRightShin,
      rightFoot: bRightFoot,
    },
  };
}

// Build SkinnedMesh for Upper Body with smooth vertex weighting (Zero seams, Zero texture misalignment)
function buildSkinnedUpperBody(sourceMesh: THREE.Mesh) {
  const geom = sourceMesh.geometry.clone();
  const pos = geom.attributes.position;

  // Create 7 bones:
  // 0: Torso (Chest)
  // 1: LeftShoulder, 2: LeftElbow, 3: LeftWrist
  // 4: RightShoulder, 5: RightElbow, 6: RightWrist
  const bTorso = new THREE.Bone();
  bTorso.position.set(0, 0, 90);

  const bLeftShoulder = new THREE.Bone();
  bLeftShoulder.position.set(3.8, -26.5, 150.7 - 90);
  bTorso.add(bLeftShoulder);

  const bLeftElbow = new THREE.Bone();
  bLeftElbow.position.set(4.1, -6.5, -24.2);
  bLeftShoulder.add(bLeftElbow);

  const bLeftWrist = new THREE.Bone();
  bLeftWrist.position.set(9.2, -11.4, -19.6);
  bLeftElbow.add(bLeftWrist);

  const bRightShoulder = new THREE.Bone();
  bRightShoulder.position.set(3.8, 26.5, 150.7 - 90);
  bTorso.add(bRightShoulder);

  const bRightElbow = new THREE.Bone();
  bRightElbow.position.set(4.1, 6.5, -24.2);
  bRightShoulder.add(bRightElbow);

  const bRightWrist = new THREE.Bone();
  bRightWrist.position.set(9.2, 11.4, -19.6);
  bRightElbow.add(bRightWrist);

  const bones = [
    bTorso,
    bLeftShoulder,
    bLeftElbow,
    bLeftWrist,
    bRightShoulder,
    bRightElbow,
    bRightWrist,
  ];
  bTorso.updateMatrixWorld(true);
  const skeleton = new THREE.Skeleton(bones);

  const skinIndices = new Float32Array(pos.count * 4);
  const skinWeights = new Float32Array(pos.count * 4);

  for (let i = 0; i < pos.count; i++) {
    const y = pos.getY(i);
    const z = pos.getZ(i);
    let b1 = 0, b2 = 0, w1 = 1, w2 = 0;

    if (Math.abs(y) <= 20) {
      b1 = 0; w1 = 1;
    } else if (y < -20) {
      // Left arm
      if (y > -24) {
        // blend chest to shoulder
        const t = (-20 - y) / 4;
        b1 = 0; w1 = 1 - t; b2 = 1; w2 = t;
      } else if (z >= 129) {
        b1 = 1; w1 = 1;
      } else if (z > 125) {
        // blend shoulder to elbow
        const t = (129 - z) / 4;
        b1 = 1; w1 = 1 - t; b2 = 2; w2 = t;
      } else if (z >= 109) {
        b1 = 2; w1 = 1;
      } else if (z > 105) {
        // blend elbow to wrist
        const t = (109 - z) / 4;
        b1 = 2; w1 = 1 - t; b2 = 3; w2 = t;
      } else {
        b1 = 3; w1 = 1;
      }
    } else {
      // Right arm
      if (y < 24) {
        const t = (y - 20) / 4;
        b1 = 0; w1 = 1 - t; b2 = 4; w2 = t;
      } else if (z >= 129) {
        b1 = 4; w1 = 1;
      } else if (z > 125) {
        // blend shoulder to elbow
        const t = (129 - z) / 4;
        b1 = 4; w1 = 1 - t; b2 = 5; w2 = t;
      } else if (z >= 109) {
        b1 = 5; w1 = 1;
      } else if (z > 105) {
        // blend elbow to wrist
        const t = (109 - z) / 4;
        b1 = 5; w1 = 1 - t; b2 = 6; w2 = t;
      } else {
        b1 = 6; w1 = 1;
      }
    }

    skinIndices[i * 4] = b1; skinIndices[i * 4 + 1] = b2;
    skinWeights[i * 4] = w1; skinWeights[i * 4 + 1] = w2;
  }

  geom.setAttribute("skinIndex", new THREE.Uint16BufferAttribute(skinIndices, 4));
  geom.setAttribute("skinWeight", new THREE.Float32BufferAttribute(skinWeights, 4));

  const mat = (sourceMesh.material as THREE.Material).clone();
  if ("side" in mat) mat.side = THREE.DoubleSide;

  const skinnedMesh = new THREE.SkinnedMesh(geom, mat);
  skinnedMesh.add(bTorso);
  skinnedMesh.bind(skeleton);
  skinnedMesh.castShadow = true;
  skinnedMesh.receiveShadow = true;

  return {
    skinnedMesh,
    bones: {
      torso: bTorso,
      leftShoulder: bLeftShoulder,
      leftElbow: bLeftElbow,
      leftWrist: bLeftWrist,
      rightShoulder: bRightShoulder,
      rightElbow: bRightElbow,
      rightWrist: bRightWrist,
    },
  };
}

// Helper for smooth periodic Gaussian bell curve (C-infinity continuous on [0, 1])
function periodicBump(u: number, center: number, width: number, height: number) {
  let d = Math.abs(u - center);
  if (d > 0.5) d = 1.0 - d;
  return height * Math.exp(-Math.pow(d / width, 2));
}

// Biomechanically accurate, completely smooth continuous human gait kinematics
function evaluateGait(u: number) {
  const phi = u * Math.PI * 2;

  // 1. Hip Stride: smooth harmonic forward/backward oscillation
  const hip = -0.32 * Math.cos(phi) + 0.03 * Math.cos(2 * phi);

  // 2. Knee: Two smooth, continuous Gaussian phases
  // - Stance phase shock absorption at u = 0.15 (~0.16 rad)
  // - Swing phase floor clearance at u = 0.68 (~0.82 rad)
  const stanceBump = periodicBump(u, 0.15, 0.12, 0.16);
  const swingBump = periodicBump(u, 0.68, 0.16, 0.82);
  const knee = 0.04 + stanceBump + swingBump;

  // 3. Ankle: Smooth 2-harmonic continuous roll (dorsiflexion on strike, plantarflexion on push-off)
  const ankle = -0.14 * Math.cos(phi) + 0.16 * Math.sin(phi) + 0.08 * Math.sin(2 * phi);

  // 4. Hip Abduction / Adduction: subtle lateral swing clearance during swing phase
  const abduct = Math.sin(phi) * 0.025;

  return { hip, knee, ankle, abduct };
}

export default function BloodRavenWalker() {
  const rootGroupRef = useRef<THREE.Group>(null);
  const characterGroupRef = useRef<THREE.Group>(null);
  const neckRef = useRef<THREE.Group>(null);
  const featherRef = useRef<THREE.Group>(null);

  const { scene: sourceScene } = useGLTF("/3DModel/scene.gltf");
  const { camera } = useThree();

  const mouse = useRef({ x: 0, y: 0, smoothX: 0, smoothY: 0 });
  const walkPhase = useRef(0);
  const scrollProgress = useRef(0);
  const scrollVelocity = useRef(0);
  const smoothScrollProgress = useRef(0);
  const entranceProgress = useRef(0);
  const isMobileDevice = useRef(false);

  // Model scale parameters
  const targetHeight = 2.2;
  const initialBaseY = -1.4;

  // Build the complete SkinnedMesh model with smooth continuous deformation
  const proceduralModel = useMemo(() => {
    let maskMesh: THREE.Mesh | null = null;
    let featherMesh: THREE.Mesh | null = null;
    let lowerMesh: THREE.Mesh | null = null;
    let upperMesh: THREE.Mesh | null = null;

    sourceScene.traverse((node) => {
      if ((node as THREE.Mesh).isMesh) {
        const mesh = node as THREE.Mesh;
        if (mesh.name.includes("MASK")) maskMesh = mesh;
        else if (mesh.name.includes("FEATHER")) featherMesh = mesh;
        else if (mesh.name.includes("LOWER_BODY")) lowerMesh = mesh;
        else if (mesh.name.includes("UPPER_BODY")) upperMesh = mesh;
        else if (mesh.name.includes("WorldGrid")) mesh.visible = false;
      }
    });

    if (!maskMesh || !featherMesh || !lowerMesh || !upperMesh) return null;

    const lower = buildSkinnedLowerBody(lowerMesh);
    const upper = buildSkinnedUpperBody(upperMesh);

    const maskGeom = (maskMesh as THREE.Mesh).geometry.clone();
    const pNeck = new THREE.Vector3(12.0, 0.0, 155.0);
    maskGeom.translate(-pNeck.x, -pNeck.y, -pNeck.z);

    const featherGeom = (featherMesh as THREE.Mesh).geometry.clone();
    const pFeather = new THREE.Vector3(-12.0, 0.0, 140.0);
    featherGeom.translate(-pFeather.x, -pFeather.y, -pFeather.z);

    const makeMaterial = (src: THREE.Mesh) => {
      const mat = (src.material as THREE.Material).clone();
      if ("side" in mat) mat.side = THREE.DoubleSide;
      return mat;
    };

    return {
      lower,
      upper,
      pNeck,
      pFeather,
      maskGeom,
      featherGeom,
      maskMat: makeMaterial(maskMesh),
      featherMat: makeMaterial(featherMesh),
    };
  }, [sourceScene]);

  // Camera & responsive layout
  useEffect(() => {
    const pCam = camera as THREE.PerspectiveCamera;
    pCam.fov = 36;
    pCam.near = 0.1;
    pCam.far = 1000;
    pCam.updateProjectionMatrix();

    const handleResize = () => {
      if (!rootGroupRef.current) return;
      const width = window.innerWidth;
      isMobileDevice.current = width < 768;
      if (width < 768) {
        rootGroupRef.current.position.x = 0;
        rootGroupRef.current.position.y = initialBaseY;
        pCam.position.set(0, initialBaseY + 1.1, 6.2);
        pCam.lookAt(0, initialBaseY + 1.1, 0);
      } else if (width < 1024) {
        rootGroupRef.current.position.x = 1.95;
        rootGroupRef.current.position.y = initialBaseY;
        pCam.position.set(0, initialBaseY + 1.1, 7.2);
        pCam.lookAt(0.85, initialBaseY + 1.1, 0);
      } else {
        rootGroupRef.current.position.x = 3.4;
        rootGroupRef.current.position.y = initialBaseY;
        pCam.position.set(0, initialBaseY + 1.1, 7.8);
        pCam.lookAt(1.2, initialBaseY + 1.1, 0);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Initial entrance animation on load (strides forward from background depth)
    const entranceTween = gsap.to(entranceProgress, {
      current: 1,
      duration: 2.2,
      ease: "power2.out",
    });

    const isMobile = window.innerWidth < 768;
    const pinDistance = isMobile ? "+=70%" : "+=100%";

    // ScrollTrigger with pin: keeps #hero in view while character walks forward smoothly
    const st = ScrollTrigger.create({
      trigger: "#hero",
      start: "top top",
      end: pinDistance,
      pin: true,
      anticipatePin: 1,
      scrub: 0.6,
      onUpdate: (self) => {
        scrollProgress.current = self.progress;
        scrollVelocity.current = self.getVelocity();
      },
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      entranceTween.kill();
      st.kill();
    };
  }, [camera]);

  // Frame update loop: Authoritative Biomechanical Human Locomotion
  useFrame((state, delta) => {
    if (!proceduralModel) return;

    const dt = Math.min(delta, 0.1);
    const time = state.clock.getElapsedTime();

    // Mouse smoothing
    mouse.current.smoothX += (mouse.current.x - mouse.current.smoothX) * 0.08;
    mouse.current.smoothY += (mouse.current.y - mouse.current.smoothY) * 0.08;

    // Smooth lerping of scroll progress
    smoothScrollProgress.current += (scrollProgress.current - smoothScrollProgress.current) * 0.08;
    const sp = smoothScrollProgress.current;

    // 1. Authoritative Continuous Walking: dynamic cadence accelerated by scroll velocity
    const velocityBoost = Math.min(Math.abs(scrollVelocity.current) * 0.0008, 2.2);
    scrollVelocity.current *= 0.92; // Smooth velocity decay

    const cycleDuration = 1.65; // ~72 strides per minute (natural human walking pace)
    const baseWalkSpeed = (Math.PI * 2) / cycleDuration;
    walkPhase.current += dt * (baseWalkSpeed + velocityBoost);

    // Normalized cycle phase in [0, 1)
    let uL = (walkPhase.current / (Math.PI * 2)) % 1;
    if (uL < 0) uL += 1;
    const uR = (uL + 0.5) % 1; // Exactly 180 deg out of phase

    // -------------------------------------------------------------
    // 2. LEGS: Hips, Knees, and Ankles via GPU SkinnedMesh
    // -------------------------------------------------------------
    const gaitL = evaluateGait(uL);
    const gaitR = evaluateGait(uR);
    const bonesL = proceduralModel.lower.bones;
    const bonesU = proceduralModel.upper.bones;

    bonesL.leftThigh.rotation.y = gaitL.hip;
    bonesL.leftThigh.rotation.x = gaitL.abduct;
    bonesL.leftShin.rotation.y = gaitL.knee;
    bonesL.leftFoot.rotation.y = gaitL.ankle;

    bonesL.rightThigh.rotation.y = gaitR.hip;
    bonesL.rightThigh.rotation.x = -gaitR.abduct;
    bonesL.rightShin.rotation.y = gaitR.knee;
    bonesL.rightFoot.rotation.y = gaitR.ankle;

    // -------------------------------------------------------------
    // 3. PELVIS & THORACIC COUNTER-ROTATION
    // -------------------------------------------------------------
    // Pelvic Yaw: left hip moves forward (+Z rot) when left leg strikes forward
    const pelvicYaw = Math.cos(uL * Math.PI * 2) * 0.065;
    // Pelvic Roll: stance hip stability
    const pelvicRoll = -Math.sin(uL * Math.PI * 2) * 0.035;

    bonesL.pelvis.rotation.z = pelvicYaw;
    bonesL.pelvis.rotation.x = pelvicRoll;

    // Thoracic counter-rotation & alive breathing
    const breathPitch = Math.sin(time * 1.8) * 0.016;
    const chestCounterYaw = -pelvicYaw * 0.75;
    const chestPitch = 0.025 + breathPitch + Math.sin(uL * Math.PI * 4) * 0.012;

    bonesU.torso.rotation.z = chestCounterYaw;
    bonesU.torso.rotation.y = chestPitch;
    bonesU.torso.rotation.x = -pelvicRoll * 0.5;

    // -------------------------------------------------------------
    // 4. ARMS: Biomechanically Authentic Locomotion with Natural Arm & Wrist Posture
    // -------------------------------------------------------------
    const armSwingL = Math.cos(uL * Math.PI * 2) * 0.26;
    const armSwingR = -Math.cos(uL * Math.PI * 2) * 0.26;

    const forwardSwingL = Math.max(0, -armSwingL);
    const forwardSwingR = Math.max(0, -armSwingR);

    const elbowFlexL = 0.28 + forwardSwingL * 0.26;
    const elbowFlexR = 0.28 + forwardSwingR * 0.26;

    const armTwistL = Math.sin(uL * Math.PI * 2) * 0.04;
    const armTwistR = -Math.sin(uL * Math.PI * 2) * 0.04;

    // Left Arm (Shoulder adduction 0.30 brings arm naturally along the thigh, straight wrists):
    bonesU.leftShoulder.rotation.set(0.30, armSwingL, armTwistL, "XYZ");
    bonesU.leftElbow.rotation.set(0.04, -elbowFlexL, 0.02, "XYZ");
    bonesU.leftWrist.rotation.set(0.03, -0.05 - forwardSwingL * 0.08, 0.02, "XYZ");

    // Right Arm:
    bonesU.rightShoulder.rotation.set(-0.30, armSwingR, armTwistR, "XYZ");
    bonesU.rightElbow.rotation.set(-0.04, -elbowFlexR, -0.02, "XYZ");
    bonesU.rightWrist.rotation.set(-0.03, -0.05 - forwardSwingR * 0.08, -0.02, "XYZ");

    // -------------------------------------------------------------
    // 5. CENTER OF MASS VERTICAL & LATERAL DYNAMICS
    // -------------------------------------------------------------
    const verticalBob = (1 - Math.cos(uL * Math.PI * 4)) * 0.016;
    const lateralSway = Math.sin(uL * Math.PI * 2) * 0.020;

    // 6. Head / Mask Look-At Tracking
    const targetHeadYaw = mouse.current.smoothX * 0.30;
    const targetHeadPitch = -mouse.current.smoothY * 0.18;
    if (neckRef.current) {
      neckRef.current.rotation.z = -targetHeadYaw + chestCounterYaw * 0.5;
      neckRef.current.rotation.y = targetHeadPitch + chestPitch;
      neckRef.current.rotation.x = -pelvicRoll * 0.4;
    }

    // 7. Feathers / Wings
    const wingLagY = Math.sin(time * 2.2) * 0.025;
    if (featherRef.current) {
      featherRef.current.rotation.z = chestCounterYaw * 0.7;
      featherRef.current.rotation.y = wingLagY + chestPitch;
      featherRef.current.rotation.x = -pelvicRoll * 0.4;
    }

    // 8. Root Character Group Positioning & Scroll Transitions
    if (characterGroupRef.current) {
      // Entrance interpolation: strides forward into frame from Z = -2.4
      const ep = entranceProgress.current;
      const entranceZ = (1 - ep) * -2.4;

      // Scroll Transitions across Hero:
      // A. Z-depth: Steps forward toward camera across the floor as user scrolls
      const scrollZ = THREE.MathUtils.lerp(-0.3, 1.8, sp);

      // B. X-offset: Shifts inward toward center on desktop (-sp * 0.45m)
      const scrollX = isMobileDevice.current ? 0 : THREE.MathUtils.lerp(0, -0.45, sp);

      // C. Y-offset: Lifelike vertical bobbing + smooth descend on bottom exit
      const exitDip = Math.max(0, (sp - 0.88) / 0.12) * -0.8;
      const currentY = verticalBob + exitDip;

      // D. Rotation Y: Turns from profile walk angle (-1.25 rad) toward camera (-0.75 rad)
      const targetRotY = THREE.MathUtils.lerp(-1.25, -0.75, sp) + mouse.current.smoothX * 0.12;

      // E. Exit scale fade-out on section exit:
      const exitScale = sp > 0.92 ? Math.max(0, 1 - (sp - 0.92) / 0.08) : 1.0;
      const baseScale = (targetHeight / 1.908) * 0.01;
      const s = baseScale * exitScale;

      characterGroupRef.current.scale.set(s, s, s);
      characterGroupRef.current.rotation.y = targetRotY;
      characterGroupRef.current.position.set(
        lateralSway + scrollX,
        currentY,
        entranceZ + scrollZ
      );
    }
  });

  if (!proceduralModel) return null;

  return (
    <group ref={rootGroupRef} position={[3.4, initialBaseY, 0]}>
      {/* Normalized scale (targetHeight = 2.2m) */}
      <group
        ref={characterGroupRef}
        scale={[
          (targetHeight / 1.908) * 0.01,
          (targetHeight / 1.908) * 0.01,
          (targetHeight / 1.908) * 0.01,
        ]}
      >
        {/* Sketchfab Root 90 deg rotation node */}
        <group rotation={[-Math.PI / 2, 0, 0]}>
          {/* Skinned Lower Body: continuous surface with zero seams */}
          <primitive object={proceduralModel.lower.skinnedMesh} />

          {/* Skinned Upper Body: continuous surface with zero seams */}
          <primitive object={proceduralModel.upper.skinnedMesh} />

          {/* Neck / Bird Helmet */}
          <group
            ref={neckRef}
            position={[
              proceduralModel.pNeck.x,
              proceduralModel.pNeck.y,
              proceduralModel.pNeck.z,
            ]}
          >
            <mesh
              geometry={proceduralModel.maskGeom}
              material={proceduralModel.maskMat}
              castShadow
              receiveShadow
            />
          </group>

          {/* Feathers / Wings / Tail Cape */}
          <group
            ref={featherRef}
            position={[
              proceduralModel.pFeather.x,
              proceduralModel.pFeather.y,
              proceduralModel.pFeather.z,
            ]}
          >
            <mesh
              geometry={proceduralModel.featherGeom}
              material={proceduralModel.featherMat}
              castShadow
              receiveShadow
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/3DModel/scene.gltf");
