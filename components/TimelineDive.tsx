"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ScrollControls, useScroll, Html, Stars, Float } from "@react-three/drei";
import * as THREE from "three";

// --- DATA LOGS ---
const timelineData = [
  {
    id: "LOG_01",
    title: "SYSTEM INCEPTION",
    date: "2010",
    desc: "The core architecture is established. RoboVITics boots up as the official robotics chapter.",
    zOffset: -15,
  },
  {
    id: "LOG_02",
    title: "CIRCUIT CARAVAN",
    date: "RURAL OUTREACH",
    desc: "Deploying portable labs to schools without access. Bringing the first spark of hardware to hundreds.",
    zOffset: -30,
  },
  {
    id: "LOG_03",
    title: "VORTEX 360",
    date: "FEB 2025",
    desc: "Powered by Autodesk. ~1,300 participants logging 72 hours of intense CAD modeling and simulation.",
    zOffset: -45,
  },
  {
    id: "LOG_04",
    title: "GRAVITAS ROBOWARS",
    date: "SEPT 2025",
    desc: "Entering the combat arena. 3 weight classes, brutal hits, and Team Orcus fighting across the board.",
    zOffset: -60,
  },
];

// --- 3D CAMERA RIG ---
// This component listens to the scroll progress and pushes the camera forward
function CameraRig() {
  const scroll = useScroll();
  const { camera } = useThree();

  useFrame(() => {
    // scroll.offset goes from 0 (top) to 1 (bottom)
    // We map this to a Z position. Start at 5, fly to -75
    const zTarget = 5 - scroll.offset * 80;
    
    // Lerp (smooth) the camera movement so it feels like flying
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, zTarget, 0.1);
  });

  return null;
}

// --- ROTATING DAT CORE ---
function DataCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={[0, 0, -2]}>
        {/* A complex torus knot acts as the "firewall" we dive through */}
        <torusKnotGeometry args={[3, 0.4, 256, 32]} />
        <meshBasicMaterial 
          color="#4FAEF3" 
          wireframe={true} 
          transparent 
          opacity={0.15} 
        />
      </mesh>
    </Float>
  );
}

// --- TIMELINE NODES ---
// These are the memories floating down the Z-axis
function MemoryNodes() {
  return (
    <>
      {timelineData.map((node, i) => {
        // Stagger them left and right of the flight path
        const xPos = i % 2 === 0 ? 3 : -3;
        
        return (
          <group key={node.id} position={[xPos, 0, node.zOffset]}>
            {/* Glowing physical anchor in 3D space */}
            <mesh>
              <icosahedronGeometry args={[0.5, 1]} />
              <meshBasicMaterial color="#4FAEF3" wireframe transparent opacity={0.4} />
            </mesh>

            {/* HTML Overlay anchored to the 3D mesh */}
            <Html
              center
              distanceFactor={15} // Makes the text scale realistically as you fly past
              transform
              sprite // Always faces the camera
            >
              <div 
                className="w-80 rounded-[4px] bg-black/60 p-6 backdrop-blur-md border border-white/10"
                style={{ boxShadow: '0 0 30px rgba(79, 174, 243, 0.1)' }}
              >
                <div className="mb-2 text-[10px] font-mono tracking-[0.2em] text-[#4FAEF3]">
                  {node.date}
                </div>
                <h3 className="mb-3 text-2xl font-black uppercase text-white tracking-wide font-sans">
                  {node.title}
                </h3>
                <div className="h-[1px] w-full bg-gradient-to-r from-[#4FAEF3]/40 to-transparent mb-3" />
                <p className="text-xs font-mono text-white/70 leading-relaxed">
                  {node.desc}
                </p>
              </div>
            </Html>
          </group>
        );
      })}
    </>
  );
}

// --- MAIN EXPORT ---
export default function TimelineDive() {
  return (
    // Wrap in a container holding the height you want the section to take up
    <section className="relative h-screen w-full bg-[#0d0d0d]">
      
      {/* Intro UI Layer - Fades out naturally as user scrolls past */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
        <span className="font-mono text-[11px] tracking-[0.2em] text-white/35 uppercase mb-4">
          ▶ SYSTEM.LOGS // TIMELINE
        </span>
        <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter">
          The <span className="text-[#4FAEF3]">Mainframe</span>
        </h2>
        <p className="mt-4 font-mono text-xs text-white/50 tracking-widest animate-pulse">
          [ SCROLL TO INITIATE DIVE ]
        </p>
      </div>

      {/* R3F Canvas */}
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        {/* ScrollControls intercepts the scroll wheel.
          pages={4} means the user has to scroll 4 screen-heights to reach the end.
          damping={0.2} makes the scroll feel heavy and cinematic.
        */}
        <ScrollControls pages={4} damping={0.2}>
          <CameraRig />
          
          <DataCore />
          <MemoryNodes />

          {/* Deep space background with data particles */}
          <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
          
          {/* Fog helps fade things into the deep black distance */}
          <fog attach="fog" args={["#0d0d0d", 10, 40]} />
        </ScrollControls>
      </Canvas>
    </section>
  );
}