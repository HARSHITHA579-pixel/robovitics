'use client';

import { motion } from 'framer-motion';

export default function Domains() {
  return (
    // z-50 ensures this section slides over the top of the fixed background and gear
    <section id="domains" className="relative z-50 w-full bg-black text-white min-h-screen pt-32 pb-24 px-6 md:px-12 lg:px-24">
      
      {/* THE FADE TRICK: This gradient sits just above the section. As you scroll down, it blends the grid into the black background */}
      <div className="absolute top-[-25vh] left-0 w-full h-[25vh] bg-gradient-to-b from-transparent to-black pointer-events-none" />

      <div className="max-w-[1600px] mx-auto w-full relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="font-mono text-gray-500 text-sm tracking-widest uppercase mb-4">
            <span className="text-white font-bold mr-2">02.</span> System.Logs // Domains
          </div>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter"
          >
            DOMAINS AT <br className="md:hidden" /> 
            <span className="text-gray-300">ROBOVITICS.</span>
          </motion.h2>
        </div>

        {/* Clean Placeholder Card */}
        <div className="w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="w-full h-[400px] rounded-xl border border-gray-800 bg-[#050505] flex flex-col items-center justify-center relative overflow-hidden"
          >
            {/* Subtle inner grid pattern to maintain the tech vibe inside the card */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
            
            <h3 className="text-2xl font-bold text-gray-300 mb-2 z-10 text-center">
              Awaiting Domain Data...
            </h3>
            <p className="text-gray-600 font-mono text-sm z-10 text-center px-4">
              [ Replace this card later with Software, Hardware, and Electronics modules ]
            </p>
            
            {/* Blinking cursor effect */}
            <div className="mt-6 flex items-center z-10">
              <span className="w-3 h-5 bg-gray-500 animate-pulse shadow-[0_0_8px_#6B7280]" />
            </div>
            
          </motion.div>
        </div>

      </div>
    </section>
  );
}