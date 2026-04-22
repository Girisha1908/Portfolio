import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
  return (
    <section id="hero" className="hero bg-black overflow-hidden">
      {/* Background Video with stronger gradient mask */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-black">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/hero-bg-2.mp4" type="video/mp4" />
        </video>
        {/* Stronger overlay to separate text from background */}
        <div className="hero-overlay" />
      </div>

      <div className="relative z-10 container flex-1 flex flex-col justify-center">
        <div className="hero-content">
          
          {/* Animated Headline Structure with dynamic rhythm */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col font-bold text-white tracking-tighter"
          >
            {/* Line 1 -> slightly smaller */}
            <span className="text-[clamp(40px,7vw,80px)] text-white/90">
              Building performant,
            </span>
            {/* Line 2 -> Focus line, larger, added spacing between words */}
            <span className="text-[clamp(48px,9vw,110px)] text-white">
              <span className="text-blue-500 mr-5 md:mr-8 inline-block">scalable</span>
              digital
            </span>
            {/* Line 3 -> same as line 1 */}
            <span className="text-[clamp(40px,7vw,80px)] text-white/90">
              experiences.
            </span>
          </motion.h1>

          {/* Subheading to ground the claim */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[16px] leading-[1.6] text-white/50 font-light tracking-wide"
          >
            Full-stack developer focused on performance, scalability, and clean system design.
          </motion.p>

          {/* Action Buttons: High Intent & Contrast */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="cta-group"
          >
            <a
              href="#projects"
              className="btn-primary hover:bg-white/90 shadow-[0_0_40px_rgba(255,255,255,0.15)] cursor-pointer"
            >
              View Projects
            </a>
            <a
              href="/GIRISHA_RES.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary hover:bg-white/10 hover:border-white/40 cursor-pointer"
            >
              Resume
            </a>
          </motion.div>
        </div>
      </div>

      {/* Footer Info & Scroll Hint */}
      <div className="relative z-10 container flex justify-between items-end pb-4 border-t border-white/5 pt-8 mt-auto">
         <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.6 }}
            className="flex flex-col gap-1"
         >
            <span className="text-white/20 text-[10px] tracking-widest uppercase font-bold">Based in</span>
            <span className="text-white/60 text-xs tracking-wider">INDIA</span>
         </motion.div>

         {/* Scroll Hint */}
         <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex flex-col items-center gap-3 absolute left-1/2 -translate-x-1/2 bottom-8"
         >
            <span className="text-white/20 text-[10px] tracking-widest uppercase font-bold">Scroll</span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
               <ArrowDown size={16} className="text-white/40" />
            </motion.div>
         </motion.div>

         <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.8 }}
            className="flex flex-col items-end gap-1"
         >
            <span className="text-white/20 text-[10px] tracking-widest uppercase font-bold">Status</span>
            <div className="flex items-center gap-2">
               <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
               <span className="text-white/60 text-xs tracking-wider uppercase">Available</span>
            </div>
         </motion.div>
      </div>
    </section>
  );
}
