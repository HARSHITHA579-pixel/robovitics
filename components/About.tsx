'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from 'framer-motion';

const aboutDriveLink = 'https://drive.google.com/file/d/1Ycd76P7kxszbPqTYpeSCTFRmOsU1qTWY/view?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAb21jcASgblJleHRuA2FlbQIxMQBzcnRjBmFwcF9pZA81NjcwNjczNDMzNTI0MjcAAaeFsaDj9ZViLc2mc_5dTS9zWV0UHu9Qv8fXSJ2_wBnC-oeSCMO7g5y2VzUt1A_aem_OMmhAV5KvpCJEWMEwO_jRg';

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
      <section id="about-mobile" className="relative z-10 block w-full px-4 py-20 text-white md:hidden">
        <div className="mb-10 font-mono text-[10px] uppercase tracking-[0.2em] text-gray-500">
          <span className="mr-2 font-bold text-white">01.</span> System.Logs // About
        </div>

        <div className="flex flex-col gap-7">
          
          {/* About Us Mobile */}
          <div className="relative overflow-hidden rounded-[4px] border border-white/10 bg-[#0a0a0a] p-4 shadow-[0_18px_45px_rgba(0,0,0,0.35)]">
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background: `
                  linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px),
                  linear-gradient(165deg, rgba(255,255,255,0.08), rgba(255,255,255,0.015) 38%, rgba(0,0,0,0.35))
                `,
                backgroundSize: '18px 18px, 18px 18px, auto',
              }}
            />
            <div className="relative z-10">
              <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-[#4FAEF3]/75">Mission Brief</span>
              <h2 className="mt-3 text-[34px] font-black uppercase leading-none tracking-[-0.02em]">
                About <span className="text-[#4FAEF3]">RoboVITics</span>
              </h2>
              <p className="mt-3 font-mono text-[11px] leading-relaxed text-white/55">
                &quot;Innovation is when imagination meets ambition.&quot;
              </p>

              <div className="my-4 h-px w-full bg-gradient-to-r from-transparent via-[#4FAEF3]/35 to-transparent" />

              <p className="font-mono text-[12px] leading-relaxed text-white/78">
                The official Robotics Club of VIT Vellore. We build bots, run workshops, compete, and turn student ideas into working systems.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {['Since 2010', 'Robotics', 'AI', 'Hardware'].map((chip) => (
                  <span key={chip} className="border border-white/10 bg-white/[0.035] px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-white/65">
                    {chip}
                  </span>
                ))}
              </div>

              <a
                href={aboutDriveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center justify-center border border-[#4FAEF3]/55 bg-[#4FAEF3]/10 px-4 py-2.5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#A9D9FF] transition hover:border-[#4FAEF3] hover:bg-[#4FAEF3]/20 hover:text-white"
              >
                Want to know more?
              </a>

              <div className="mt-5 overflow-hidden rounded-[3px] border border-white/10 bg-black">
                <img src="/AboutUs.png.jpeg" alt="About Us" className="h-48 w-full object-cover opacity-90" />
              </div>
            </div>
          </div>

          {/* About VIT Mobile */}
          <div className="relative overflow-hidden rounded-[4px] border border-white/10 bg-[#0a0a0a] p-4 shadow-[0_18px_45px_rgba(0,0,0,0.35)]">
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background: `
                  linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px),
                  linear-gradient(165deg, rgba(255,255,255,0.08), rgba(255,255,255,0.015) 38%, rgba(0,0,0,0.35))
                `,
                backgroundSize: '18px 18px, 18px 18px, auto',
              }}
            />
            <div className="relative z-10">
              <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-[#4FAEF3]/75">Campus Node</span>
              <h2 className="mt-3 text-[34px] font-black uppercase leading-none tracking-[-0.02em]">
                About <span className="text-[#4FAEF3]">VIT</span>
              </h2>
              <p className="mt-3 font-mono text-[11px] leading-relaxed text-white/55">
                &quot;A place to learn, a chance to grow.&quot;
              </p>

              <div className="my-4 h-px w-full bg-gradient-to-r from-transparent via-[#4FAEF3]/35 to-transparent" />

              <p className="font-mono text-[12px] leading-relaxed text-white/78">
                VIT Vellore is one of India&apos;s leading universities, with a strong engineering culture and global ecosystem.
              </p>
              <p className="mt-3 font-mono text-[12px] leading-relaxed text-white/62">
                It gives communities like RoboVITics the space to build, experiment, and grow.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {['40k+ Students', 'A++ NAAC', 'Global Network'].map((chip) => (
                  <span key={chip} className="border border-white/10 bg-white/[0.035] px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-white/65">
                    {chip}
                  </span>
                ))}
              </div>

              <div className="mt-5 overflow-hidden rounded-[3px] border border-white/10 bg-black">
                <img src="/AboutVit.png.jpeg" alt="About VIT" className="h-48 w-full object-cover opacity-90" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* DESKTOP LAYOUT */}
      <section id="about" ref={sectionRef} className="hidden md:block relative z-10 h-[300vh] w-full text-white pointer-events-none">
        
        <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden px-12 lg:px-24 max-w-[1600px] mx-auto pointer-events-none">
          
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
                        <a
                          href={aboutDriveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="pointer-events-auto mt-1 inline-flex w-fit items-center justify-center border border-[#4FAEF3]/55 bg-[#4FAEF3]/10 px-5 py-3 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[#A9D9FF] transition hover:border-[#4FAEF3] hover:bg-[#4FAEF3]/20 hover:text-white"
                        >
                          Want to know more?
                        </a>
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
