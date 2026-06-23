"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugin outside of component lifecycle
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function GalaxyDive() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const portalMaskRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  const galaxyContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Wrap everything inside gsap.context()
    // This is crucial for React/Next.js to prevent double-mounting bugs
    let ctx = gsap.context(() => {
      
      const section = sectionRef.current;
      const portal = portalMaskRef.current;
      const text = textContentRef.current;
      const galaxy = galaxyContainerRef.current;

      if (!section || !portal || !text || !galaxy) return;

      // Select all images inside the scoped context
      const images = gsap.utils.toArray('.galaxy-img');

      // Set initial 3D positions deep in the background
      images.forEach((img: any, i) => {
        gsap.set(img, { 
          z: -1500 * (i + 1), // Stagger depths: -1500, -3000, -4500
          opacity: 0 
        });
      });

      // Create the main timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top", // Start when the top of the section hits top of viewport
          end: "+=4000",    // Pin it for 4000px of scrolling
          scrub: 1,         // 1 second of smoothing
          pin: true,        // Lock the section in place
          anticipatePin: 1,
        }
      });

      // PHASE 1: Expand Window & Fade Text (0% to ~25% of scroll)
      tl.to(text, { 
        opacity: 0, 
        x: 100, 
        duration: 1 
      }, 0);
      
      tl.to(portal, {
        clipPath: "inset(0% 0% 0% 0% round 0px)",
        duration: 1.5,
        ease: "power2.inOut"
      }, 0);

      // Fade images in right as the window opens
      tl.to(images, { 
        opacity: 0.8, 
        duration: 0.5 
      }, 0.8);

      // PHASE 2: Dive Through Space (25% to 100% of scroll)
      tl.to(galaxy, {
        z: 8000, // Push the whole container way forward
        duration: 4,
        ease: "none" // Linear speed feels like real space travel
      }, 1.2);

    }, sectionRef); // Scope the context to this specific section

    // 2. CRITICAL: Cleanup function reverts all GSAP changes when unmounted
    return () => ctx.revert();
    
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen w-full bg-[#0d0d0d] text-white">
      
      {/* THE PORTAL MASK */}
      <div 
        ref={portalMaskRef} 
        className="absolute inset-0 z-20 pointer-events-none"
        style={{ 
          clipPath: "inset(20% 50% 20% 5% round 12px)",
          WebkitClipPath: "inset(20% 50% 20% 5% round 12px)",
          perspective: "1500px", // Increased perspective for dramatic depth
          backgroundColor: "#050505" // The deep space background
        }}
      >
        {/* THE 3D GALAXY CONTAINER */}
        <div ref={galaxyContainerRef} className="absolute inset-0 w-full h-full [transform-style:preserve-3d]">
          
          {/* IMAGE 1 */}
          <div className="galaxy-img absolute top-[40%] left-[30%] w-[350px] h-[250px] border border-[#4FAEF3]/20 bg-neutral-900 rounded-md overflow-hidden">
            <img src="https://images.unsplash.com/photo-1518770660439-4636190af475" alt="Memory" className="w-full h-full object-cover opacity-60" />
            <div className="absolute bottom-3 left-4 font-mono text-[10px] text-[#4FAEF3]">ROBOWARS 2024</div>
          </div>
          
          {/* IMAGE 2 */}
          <div className="galaxy-img absolute top-[20%] left-[60%] w-[400px] h-[220px] border border-[#4FAEF3]/20 bg-neutral-900 rounded-md overflow-hidden">
            <img src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e" alt="Memory" className="w-full h-full object-cover opacity-60" />
            <div className="absolute bottom-3 left-4 font-mono text-[10px] text-[#4FAEF3]">CIRCUIT CARAVAN</div>
          </div>

          {/* IMAGE 3 */}
          <div className="galaxy-img absolute top-[60%] left-[45%] w-[280px] h-[350px] border border-[#4FAEF3]/20 bg-neutral-900 rounded-md overflow-hidden">
            <img src="https://images.unsplash.com/photo-1581092160562-40aa08e78837" alt="Memory" className="w-full h-full object-cover opacity-60" />
            <div className="absolute bottom-3 left-4 font-mono text-[10px] text-[#4FAEF3]">VORTEX 360</div>
          </div>

          {/* IMAGE 4 */}
          <div className="galaxy-img absolute top-[15%] left-[20%] w-[320px] h-[320px] border border-[#4FAEF3]/20 bg-neutral-900 rounded-md overflow-hidden">
            <img src="https://images.unsplash.com/photo-1555664424-778a1e5e1b48" alt="Memory" className="w-full h-full object-cover opacity-60" />
            <div className="absolute bottom-3 left-4 font-mono text-[10px] text-[#4FAEF3]">HARDWARE LAB</div>
          </div>

          {/* IMAGE 5 */}
          <div className="galaxy-img absolute top-[55%] left-[70%] w-[450px] h-[250px] border border-[#4FAEF3]/20 bg-neutral-900 rounded-md overflow-hidden">
            <img src="https://images.unsplash.com/photo-1531297172864-822d10bf0d2b" alt="Memory" className="w-full h-full object-cover opacity-60" />
            <div className="absolute bottom-3 left-4 font-mono text-[10px] text-[#4FAEF3]">SYSTEM INCEPTION</div>
          </div>

        </div>
      </div>

      {/* RIGHT SIDE TEXT */}
      <div 
        ref={textContentRef} 
        className="absolute z-10 top-[35%] right-[8%] w-[35vw] flex flex-col pointer-events-none"
      >
        <span className="font-mono text-[11px] tracking-[0.2em] text-[#4FAEF3] mb-4 uppercase">
          ▶ ARCHIVE // TIMELINE
        </span>
        <h2 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter mb-6" style={{ fontFamily: '"Inter", "Arial Black", sans-serif' }}>
          Explore Our <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">History.</span>
        </h2>
        <p className="font-mono text-xs text-white/60 leading-relaxed max-w-sm">
          Scroll to initiate the dive sequence. Traverse through the legacy of projects, outreach, and combat robotics that built this chapter.
        </p>
      </div>

    </section>
  );
}