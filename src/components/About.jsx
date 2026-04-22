import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" ref={ref} className="bg-black section-pad overflow-hidden relative">
      {/* Subtle radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.03)_0%,_transparent_70%)] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-white/40 text-sm tracking-widest uppercase mb-6"
        >
          About
        </motion.p>

        {/* Heading — Instrument Serif */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl text-white leading-[1.1] tracking-tight mb-16 md:mb-24"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Building{' '}
          <em className="italic text-white/60">products</em> for
          <br className="hidden md:block" />
          {' '}minds that{' '}
          <em className="italic text-white/60">create, build,</em> and{' '}
          <em className="italic text-white/60">ship.</em>
        </motion.h2>

        {/* Two-column content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {/* Left — Bio */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className="text-white/40 text-xs tracking-widest uppercase mb-4">Who I am</p>
            <p className="text-white/70 text-base md:text-lg leading-relaxed">
              Pre-final year CS student at SRM University AP.
              I build full-stack products — from AI research platforms
              to real-time collaborative editors. Focused on shipping
              clean, well-architected software.
            </p>
            <div className="w-full h-px bg-white/10 my-6" />
            <p className="text-white/40 text-xs tracking-widest uppercase mb-4">Currently</p>
            <p className="text-white/70 text-base md:text-lg leading-relaxed">
              Co-leading FOSS SRMAP (300+ members), writing about
              cybersecurity at Next Tech Lab, and always building
              something new.
            </p>
          </motion.div>

          {/* Right — Education card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="liquid-glass rounded-2xl p-6 md:p-8"
          >
            <p className="text-white/40 text-xs tracking-widest uppercase mb-4">Education</p>
            <h3 className="text-white font-semibold text-lg mb-1">SRM University, Andhra Pradesh</h3>
            <p className="text-white/60 text-sm mb-1">B.Tech Computer Science Engineering</p>
            <p className="text-white/40 text-xs mb-6">2023 — 2027</p>

            <div className="w-full h-px bg-white/10 mb-6" />

            <div className="space-y-3">
              <p className="text-white/70 text-sm">
                <span className="text-white font-medium">CGPA:</span> 8.75 / 10 ·{' '}
                <span className="text-white font-medium">Latest:</span> 9.115
              </p>
              <p className="text-white/70 text-sm">
                2nd Place — Code for Connection Hackathon
              </p>
              <p className="text-white/70 text-sm">
                Oracle Certified Java SE 17 Developer (1Z0-829)
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
