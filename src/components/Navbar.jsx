import { motion } from 'framer-motion';

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-[100]"
    >
      <div className="nav bg-black/40 backdrop-blur-md rounded-2xl border border-white/5 mt-6 items-center">
        {/* Logo */}
        <a href="#hero" className="text-xl font-bold text-white tracking-tight">
          G<span className="text-blue-500">.</span>
        </a>

        {/* Links */}
        <div className="flex items-center gap-8 text-[14px]">
          <a
            href="#experience"
            className="text-white/60 hover:text-white transition-colors relative group"
          >
            Experience
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
          </a>
          <a
            href="#leadership"
            className="text-white/60 hover:text-white transition-colors relative group"
          >
            Volunteering
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
          </a>
          <a
            href="#projects"
            className="text-white/60 hover:text-white transition-colors relative group"
          >
            Projects
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
          </a>
          <a
            href="/GIRISHA_RES.pdf"
            target="_blank"
            className="text-white/60 hover:text-white transition-colors relative group"
          >
            Resume
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
