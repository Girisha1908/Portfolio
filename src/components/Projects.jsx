import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { GithubIcon } from './icons';

const projects = [
  {
    name: 'INVENTIX AI',
    desc: 'AI-powered research validation platform.',
    problem: 'Researchers waste time on non-novel ideas',
    solution: 'Detects novelty using evidence-based validation',
    tech: ['React', 'FastAPI', 'Python', 'PostgreSQL'],
    image: '/project-inventix.png',
    github: 'https://github.com/Girisha1908/Inventix-AI',
    demo: 'https://docs.google.com/videos/d/1i5dXiG_SgZljBejRh_vqtxtg3yqISz84poYt0A_lSXM/edit?usp=sharing',
  },
  {
    name: "COCO'S PLAYGROUND",
    desc: 'Real-time collaborative code editor.',
    problem: 'No lightweight editor supports real-time multi-user collaboration',
    solution: 'WebSocket-based editor with live cursors and room management',
    tech: ['React', 'Node.js', 'Socket.io', 'Express'],
    image: '/project-coco.png',
    github: 'https://github.com/Girisha1908/Collaborative-Code-editor',
    demo: null,
  },
  {
    name: 'TASKFLOW',
    desc: 'Enterprise task management SaaS.',
    problem: 'Teams lack a simple way to track tasks with role constraints',
    solution: 'Full-featured SaaS with RBAC and instant Supabase syncing',
    tech: ['React', 'Supabase', 'Tailwind', 'PostgreSQL'],
    image: '/project-taskflow.png',
    github: 'https://github.com/Girisha1908/teamtask-flow',
    demo: null,
  },
  {
    name: 'SAHAY',
    desc: 'AI companion for elderly safety and navigation.',
    problem: 'Elderly individuals lack accessible tools for emergencies',
    solution: 'Voice navigation, fall detection, and one-tap SOS alerts',
    tech: ['Kotlin', 'TensorFlow', 'Firebase', 'Android'],
    image: '/project-sahay.jpg',
    github: 'https://github.com/Girisha1908/HACKSRM',
    demo: 'https://drive.google.com/file/d/1W8VrXVqOoEYzwtZyWZOFcUfXIZ0IAAXm/view?usp=drivesdk',
  },
];

function ProjectCard({ p }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.1 }}
      className="project-card group p-6 md:p-8 rounded-2xl hover:bg-white/[0.03] outline outline-1 outline-transparent hover:outline-white/10 hover:shadow-[0_20px_60px_rgba(255,255,255,0.03)] transition-all duration-500 ease-out"
    >
      {/* Left Image */}
      <div className="w-full h-[320px] md:h-[420px] rounded-2xl overflow-hidden bg-white/5 flex-shrink-0">
        <img
          src={p.image}
          alt={p.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
        />
      </div>

      {/* Right Info */}
      <div className="flex flex-col justify-center">
        
        {/* Title */}
        <h3 className="text-[32px] md:text-[40px] font-bold text-white tracking-tight mb-4 leading-tight group-hover:text-blue-500 transition-colors duration-500">
          {p.name}
        </h3>
        
        {/* Short Desc */}
        <p className="text-[16px] text-white/50 leading-[1.6] mb-6">
          {p.desc}
        </p>

        {/* Problem / Solution fields */}
        <div className="flex flex-col gap-4 mb-8">
          <div>
            <span className="text-white/30 text-xs tracking-widest font-bold uppercase block mb-1">Problem:</span>
            <p className="text-[15px] text-white/70 leading-[1.6]">{p.problem}</p>
          </div>
          <div>
            <span className="text-white/30 text-xs tracking-widest font-bold uppercase block mb-1">Solution:</span>
            <p className="text-[15px] text-white/70 leading-[1.6]">{p.solution}</p>
          </div>
        </div>

        {/* Tech Stack Pills via .tech-tag */}
        <div className="flex flex-wrap gap-[8px] mb-[40px]">
          {p.tech.map((t) => (
            <span key={t} className="tech-tag text-white/60 border border-white/5 bg-white/5">
              {t}
            </span>
          ))}
        </div>

        {/* Action Buttons via global classes */}
        <div className="cta-group mt-auto">
          {p.demo && (
            <a
              href={p.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary hover:bg-white/90 hover:scale-[1.03] shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_8px_30px_rgba(255,255,255,0.15)] flex gap-2 cursor-pointer transition-all duration-300"
            >
              Live Demo <ArrowUpRight size={16} />
            </a>
          )}
          <a
            href={p.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary hover:bg-white/[0.05] hover:border-white/30 hover:scale-[1.03] shadow-none hover:shadow-[0_8px_20px_rgba(0,0,0,0.2)] flex gap-2 cursor-pointer transition-all duration-300"
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
    <section id="projects" className="section bg-black border-t border-white/5">
      <div className="container">
        <div className="section-title">
          <h2 className="text-[clamp(40px,6vw,56px)] font-bold text-white tracking-tight leading-[1.1]">
            Selected Projects
          </h2>
        </div>

        <div>
          {projects.map((p) => (
            <ProjectCard key={p.name} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
