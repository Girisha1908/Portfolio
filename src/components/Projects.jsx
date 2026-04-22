import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { GithubIcon } from './icons';

const projects = [
  {
    name: 'INVENTIX AI',
    desc: 'AI-powered research validation platform. Detects novelty using evidence-based validation and prevents researchers from wasting time on non-novel ideas.',
    tech: ['React', 'FastAPI', 'Python', 'PostgreSQL'],
    image: '/project-inventix.png',
    github: 'https://github.com/Girisha1908/Inventix-AI',
    demo: 'https://docs.google.com/videos/d/1i5dXiG_SgZljBejRh_vqtxtg3yqISz84poYt0A_lSXM/edit?usp=sharing',
  },
  {
    name: "COCO'S PLAYGROUND",
    desc: 'Real-time collaborative code editor with WebSocket-based live cursors, synchronization, and robust room management.',
    tech: ['React', 'Node.js', 'Socket.io', 'Express'],
    image: '/project-coco.png',
    github: 'https://github.com/Girisha1908/Collaborative-Code-editor',
    demo: null,
  },
  {
    name: 'TASKFLOW',
    desc: 'Enterprise task management SaaS handling RBAC and providing instant Supabase syncing for strict constraint environments.',
    tech: ['React', 'Supabase', 'Tailwind', 'PostgreSQL'],
    image: '/project-taskflow.png',
    github: 'https://github.com/Girisha1908/teamtask-flow',
    demo: null,
  },
  {
    name: 'SAHAY',
    desc: 'Voice navigator and fall-detection AI companion for elderly individuals. Designed for quick, accessible emergency interventions.',
    tech: ['Kotlin', 'TensorFlow', 'Firebase', 'Android'],
    image: '/project-sahay.jpg',
    github: 'https://github.com/Girisha1908/HACKSRM',
    demo: 'https://drive.google.com/file/d/1W8VrXVqOoEYzwtZyWZOFcUfXIZ0IAAXm/view?usp=drivesdk',
  },
];

function ProjectCard({ p, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.1 }}
      className="group flex flex-col lg:flex-row gap-8 mb-[100px] last:mb-0 p-6 md:p-8 rounded-2xl hover:-translate-y-1 hover:bg-white/[0.02] border border-transparent hover:border-white/5 transition-all duration-300 ease-out"
    >
      {/* Left Image (50%) */}
      <div className="w-full lg:w-1/2 flex-shrink-0">
        <div className="w-full h-[320px] md:h-[420px] rounded-2xl overflow-hidden shadow-md group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-300">
          <img
            src={p.image}
            alt={p.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />
        </div>
      </div>

      {/* Right Info (50%) */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center">
        
        {/* Title */}
        <h3 className="text-[32px] md:text-[40px] font-bold text-white tracking-tight mb-4 leading-tight">
          {p.name}
        </h3>
        
        {/* Short Desc (2-3 lines max) */}
        <p className="text-[16px] text-white/50 leading-[1.6] mb-[32px] max-w-[90%]">
          {p.desc}
        </p>

        {/* Tech Stack Pills (Low contrast) */}
        <div className="flex flex-wrap gap-[8px] mb-[40px]">
          {p.tech.map((t) => (
            <span
              key={t}
              className="text-[12px] px-[10px] py-[4px] rounded-full font-medium bg-white/[0.05] text-white/40 tracking-wide border border-white/5"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-[16px] mt-auto">
          {p.demo && (
            <a
              href={p.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="px-[20px] py-[12px] bg-white text-black font-semibold text-[14px] rounded-[10px] hover:bg-white/90 hover:scale-[1.03] shadow-none hover:shadow-[0_8px_20px_rgba(255,255,255,0.15)] transition-all duration-300 flex items-center gap-2 cursor-pointer"
            >
              Live Demo <ArrowUpRight size={16} />
            </a>
          )}
          <a
            href={p.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-[20px] py-[12px] border border-white/10 text-white font-semibold text-[14px] rounded-[10px] hover:bg-white/[0.03] hover:border-white/20 hover:scale-[1.03] shadow-none hover:shadow-[0_8px_20px_rgba(0,0,0,0.2)] transition-all duration-300 flex items-center gap-2 cursor-pointer"
          >
            <GithubIcon size={16} /> View Code
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="bg-black py-[120px] border-t border-white/5">
      <div className="max-w-[1100px] mx-auto px-6">
        
        {/* Section Heading */}
        <div className="mb-[64px]">
          <h2 className="text-[clamp(40px,6vw,56px)] font-bold text-white tracking-tight leading-[1.1]">
            Selected Projects
          </h2>
        </div>

        <div className="flex flex-col">
          {projects.map((p, i) => (
            <ProjectCard key={p.name} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
