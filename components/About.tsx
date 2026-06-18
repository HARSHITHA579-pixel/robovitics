'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from 'framer-motion';

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.45) {
      setActiveIndex(0);
    } else if (latest >= 0.45 && latest < 0.55) {
      setActiveIndex(-1);
    } else {
      setActiveIndex(1);
    }
  });
  
  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <>
      {/* MOBILE LAYOUT */}
      <section id="about-mobile" className="relative z-40 w-full text-white px-6 py-24 block md:hidden">
        <div className="font-mono text-gray-500 text-sm tracking-widest uppercase mb-12">
          <span className="font-bold mr-2" style={{ color: '#22D3EE' }}>01.</span> System.Logs // About
        </div>

        <div className="flex flex-col gap-16">
          <div className="flex flex-col justify-center">
            <h2 className="text-5xl font-black tracking-tighter mb-4 drop-shadow-lg">
              WE ARE <br/> <span style={{ color: 'rgba(34,211,238,0.45)' }}>ROBOVITICS.</span>
            </h2>
            <p className="text-gray-400 font-mono text-base leading-relaxed drop-shadow-md">
              The official robotics club of VIT Vellore. We are a collective of engineers, designers, and innovators dedicated to pushing the boundaries of autonomous systems. We don&apos;t just study robotics; we solder the circuits, write the algorithms, and machine the parts that bring machines to life.
            </p>
          </div>

          <div className="flex flex-col justify-center">
            <h2 className="text-5xl font-black tracking-tighter mb-4 drop-shadow-lg">
              POWERED BY <br/> <span style={{ color: 'rgba(34,211,238,0.45)' }}>VIT VELLORE.</span>
            </h2>
            <p className="text-gray-400 font-mono text-base leading-relaxed drop-shadow-md">
              Vellore Institute of Technology provides the launchpad for our ambitions. Backed by world-class infrastructure and a culture that champions disruptive tech, we leverage the university&apos;s cutting-edge manufacturing labs and research facilities to turn theoretical blueprints into heavy-duty reality.
            </p>
          </div>
        </div>
      </section>

      {/* DESKTOP LAYOUT */}
      <section id="about" ref={sectionRef} className="hidden md:block relative z-40 h-[300vh] w-full text-white pointer-events-none">
        
        <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden px-12 lg:px-24 max-w-[1600px] mx-auto pointer-events-auto">
          
          <div className="absolute top-24 left-12 lg:left-24 font-mono text-gray-500 text-sm tracking-widest uppercase">
            <span className="font-bold mr-2" style={{ color: '#22D3EE' }}>01.</span> System.Logs // About
          </div>

          <div className="relative w-full h-[400px] flex items-center mt-12">
            
            {/* Scroll Progress Bar */}
            <div
              className="absolute left-0 top-0 bottom-0 w-[2px] rounded-full"
              style={{ background: 'rgba(34,211,238,0.08)' }}
            >
              <motion.div
                style={{ height: progressHeight }}
                className="w-full rounded-full"
                css={{ background: '#22D3EE', boxShadow: '0 0 10px rgba(34,211,238,0.6)' }}
              />
            </div>

            <div className="relative w-full h-full ml-12 lg:ml-20">
              <AnimatePresence mode="wait">
                
                {activeIndex === 0 && (
                  <motion.div
                    key="robo"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="absolute inset-0 flex flex-col justify-center"
                  >
                    <h2 className="text-6xl lg:text-7xl font-black tracking-tighter mb-6 drop-shadow-lg">
                      WE ARE <br/> <span style={{ color: 'rgba(34,211,238,0.45)' }}>ROBOVITICS.</span>
                    </h2>
                    <p className="text-gray-400 font-mono text-lg max-w-2xl leading-relaxed drop-shadow-md">
                      The official robotics club of VIT Vellore. We are a collective of engineers, designers, and innovators dedicated to pushing the boundaries of autonomous systems. We don&apos;t just study robotics; we solder the circuits, write the algorithms, and machine the parts that bring machines to life.
                    </p>
                  </motion.div>
                )}

                {activeIndex === 1 && (
                  <motion.div
                    key="vit"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="absolute inset-0 flex flex-col justify-center"
                  >
                    <h2 className="text-6xl lg:text-7xl font-black tracking-tighter mb-6 drop-shadow-lg">
                      POWERED BY <br/> <span style={{ color: 'rgba(34,211,238,0.45)' }}>VIT VELLORE.</span>
                    </h2>
                    <p className="text-gray-400 font-mono text-lg max-w-2xl leading-relaxed drop-shadow-md">
                      Vellore Institute of Technology provides the launchpad for our ambitions. Backed by world-class infrastructure and a culture that champions disruptive tech, we leverage the university&apos;s cutting-edge manufacturing labs and research facilities to turn theoretical blueprints into heavy-duty reality.
                    </p>
                  </motion.div>
                )}
                
              </AnimatePresence>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}