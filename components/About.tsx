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
          <span className="font-bold mr-2 text-white">01.</span> System.Logs // About
        </div>

        <div className="flex flex-col gap-24">
          
          {/* About Us Mobile */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col justify-center">
              <h2 className="text-5xl font-black tracking-tighter mb-4 drop-shadow-lg">
                About Us <br/> <span className="text-xl md:text-2xl font-medium tracking-tight mt-3 block" style={{ color: 'rgba(255,255,255,0.7)' }}>&quot;Innovation is when Imagination meets Ambition&quot;</span>
              </h2>
              <div className="flex flex-col gap-5 mt-2">
                <p className="text-white/90 text-base md:text-lg leading-relaxed drop-shadow-md tracking-normal font-light">
                  RoboVITics, the official Robotics Club of VIT Vellore, is a community of passionate innovators exploring robotics, automation, and emerging technologies. Through hands-on projects, workshops, and technical events, we provide students with opportunities to learn, create, and transform ideas into reality.
                </p>
                <p className="text-white/90 text-base md:text-lg leading-relaxed drop-shadow-md tracking-normal font-light">
                  Over the years, RoboVITics has grown into a hub of innovation and excellence, empowering students to build impactful solutions, compete on prestigious platforms, and continuously expand their technical expertise. Driven by creativity, collaboration, and ambition, we strive to shape the next generation of engineers and innovators.
                </p>
              </div>
            </div>
            <div className="w-full flex justify-center mt-2">
              <img src="/AboutUs.png.jpeg" alt="About Us" className="w-full max-w-[400px] rounded-2xl object-cover shadow-[0_0_40px_rgba(79,174,243,0.15)] ring-1 ring-white/10" />
            </div>
          </div>

          {/* About VIT Mobile */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col justify-center">
              <h2 className="text-5xl font-black tracking-tighter mb-4 drop-shadow-lg">
                About VIT <br/> <span className="text-xl md:text-2xl font-medium tracking-tight mt-3 block" style={{ color: 'rgba(255,255,255,0.7)' }}>&quot;A place to learn, a chance to grow&quot;</span>
              </h2>
              <div className="flex flex-col gap-5 mt-2">
                <p className="text-white/90 text-base md:text-lg leading-relaxed drop-shadow-md tracking-normal font-light">
                  Vellore Institute of Technology (VIT) is one of India&apos;s leading private universities, accredited with A++ by NAAC and consistently ranked among the top institutions by NIRF. With a thriving community of 40,000+ students, strong industry partnerships, and global collaborations, VIT fosters an environment that encourages innovation, research, and hands-on learning.
                </p>
                <p className="text-white/90 text-base md:text-lg leading-relaxed drop-shadow-md tracking-normal font-light">
                  This dynamic ecosystem empowers students to explore their interests, develop practical skills, and contribute to impactful initiatives, serving as the foundation for communities like RoboVITics to learn, innovate, and grow.
                </p>
              </div>
            </div>
            <div className="w-full flex justify-center mt-2">
              <img src="/AboutVit.png.jpeg" alt="About VIT" className="w-full max-w-[400px] rounded-2xl object-cover shadow-[0_0_40px_rgba(79,174,243,0.15)] ring-1 ring-white/10" />
            </div>
          </div>

        </div>
      </section>

      {/* DESKTOP LAYOUT */}
      <section id="about" ref={sectionRef} className="hidden md:block relative z-40 h-[300vh] w-full text-white pointer-events-none">
        
        <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden px-12 lg:px-24 max-w-[1600px] mx-auto pointer-events-auto">
          
          <div className="absolute top-24 left-12 lg:left-24 font-mono text-gray-500 text-sm tracking-widest uppercase">
            <span className="font-bold mr-2 text-white">01.</span> System.Logs // About
          </div>

          <div className="relative w-full h-[500px] flex items-center mt-12">
            
            {/* Scroll Progress Bar - FIXED */}
            <div
              className="absolute left-0 top-0 bottom-0 w-[2px] rounded-full"
              style={{ background: 'rgba(255,255,255,0.1)' }}
            >
              <motion.div
                className="w-full rounded-full"
                style={{ 
                  height: progressHeight,
                  background: 'rgba(255,255,255,0.85)', 
                  boxShadow: '0 0 12px rgba(255,255,255,0.6)' 
                }}
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
                    className="absolute inset-0 flex items-center justify-between gap-12 lg:gap-20"
                  >
                    <div className="flex-1 flex flex-col justify-center">
                      <h2 className="text-6xl lg:text-7xl font-black tracking-tighter mb-6 drop-shadow-lg">
                        About Us <br/> <span className="text-xl lg:text-2xl font-medium tracking-tight mt-4 block" style={{ color: '#4FAEF3' }}>&quot;Innovation is when Imagination meets Ambition&quot;</span>
                      </h2>
                      <div className="flex flex-col gap-5">
                        <p className="text-white/90 text-[1.1rem] lg:text-lg xl:text-xl leading-relaxed drop-shadow-md tracking-normal font-light">
                          RoboVITics, the official Robotics Club of VIT Vellore, is a community of passionate innovators exploring robotics, automation, and emerging technologies. Through hands-on projects, workshops, and technical events, we provide students with opportunities to learn, create, and transform ideas into reality.
                        </p>
                        <p className="text-white/90 text-[1.1rem] lg:text-lg xl:text-xl leading-relaxed drop-shadow-md tracking-normal font-light">
                          Over the years, RoboVITics has grown into a hub of innovation and excellence, empowering students to build impactful solutions, compete on prestigious platforms, and continuously expand their technical expertise. Driven by creativity, collaboration, and ambition, we strive to shape the next generation of engineers and innovators.
                        </p>
                      </div>
                    </div>

                    <div className="hidden md:flex flex-1 max-w-[450px] lg:max-w-[550px] xl:max-w-[650px] justify-center items-center">
                      <img 
                        src="/AboutUs.png.jpeg" 
                        alt="About Us" 
                        className="w-full h-auto object-contain rounded-2xl shadow-[0_0_60px_rgba(79,174,243,0.15)] ring-1 ring-white/10"
                      />
                    </div>
                  </motion.div>
                )}

                {activeIndex === 1 && (
                  <motion.div
                    key="vit"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="absolute inset-0 flex items-center justify-between gap-12 lg:gap-20"
                  >
                    <div className="flex-1 flex flex-col justify-center">
                      <h2 className="text-6xl lg:text-7xl font-black tracking-tighter mb-6 drop-shadow-lg">
                        About VIT <br/> <span className="text-xl lg:text-2xl font-medium tracking-tight mt-4 block" style={{ color: '#4FAEF3' }}>&quot;A place to learn, a chance to grow&quot;</span>
                      </h2>
                      <div className="flex flex-col gap-5">
                        <p className="text-white/90 text-[1.1rem] lg:text-lg xl:text-xl leading-relaxed drop-shadow-md tracking-normal font-light">
                          Vellore Institute of Technology (VIT) is one of India&apos;s leading private universities, accredited with A++ by NAAC and consistently ranked among the top institutions by NIRF. With a thriving community of 40,000+ students, strong industry partnerships, and global collaborations, VIT fosters an environment that encourages innovation, research, and hands-on learning.
                        </p>
                        <p className="text-white/90 text-[1.1rem] lg:text-lg xl:text-xl leading-relaxed drop-shadow-md tracking-normal font-light">
                          This dynamic ecosystem empowers students to explore their interests, develop practical skills, and contribute to impactful initiatives, serving as the foundation for communities like RoboVITics to learn, innovate, and grow.
                        </p>
                      </div>
                    </div>

                    <div className="hidden md:flex flex-1 max-w-[450px] lg:max-w-[550px] xl:max-w-[650px] justify-center items-center">
                      <img 
                        src="/AboutVit.png.jpeg" 
                        alt="About VIT" 
                        className="w-full h-auto object-contain rounded-2xl shadow-[0_0_60px_rgba(79,174,243,0.15)] ring-1 ring-white/10"
                      />
                    </div>
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