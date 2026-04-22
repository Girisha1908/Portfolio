import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { GithubIcon } from './icons';

const projects = [
  {
    name: 'INVENTIX AI',
    desc: 'Inventix AI is a comprehensive AI-powered research validation platform built to accelerate academic and enterprise R&D. By automatically ingesting the latest publications and cross-referencing proposed topics against a massive data context, it ensures teams only invest time in genuinely groundbreaking work.',
    problem: 'Historically, researchers waste countless hours pursuing non-novel ideas due to fragmented literature and limited scope.',
    solution: 'Detects novelty using strict evidence-based validation, radically streamlining research pipelines before redundant effort begins.',
    tech: ['React', 'FastAPI', 'Python', 'PostgreSQL'],
    image: '/project-inventix.png',
    github: 'https://github.com/Girisha1908/Inventix-AI',
    demo: 'https://drive.google.com/file/d/1NGtYq5AJLLrwn464NDIVdQKvuQnJ_l-t/view?usp=sharing',
  },
  {
    name: "COCO'S PLAYGROUND",
    desc: "Coco's Playground is a real-time collaborative code editor designed to remove the friction from remote pair programming. Developers can spin up secure collaboration instances directly in the browser in seconds, allowing multiple contributors to edit, debug, and review code concurrently without the usual painful setup.",
    problem: 'Traditional IDEs either lack seamless multiplayer capabilities or require heavy, resource-intensive local installations.',
    solution: 'Utilizes a lightweight WebSocket-based architecture to provide instant cursor presence, live code synchronization, and robust room management.',
    tech: ['React', 'Node.js', 'Socket.io', 'Express'],
    image: '/project-coco.png',
    github: 'https://github.com/Girisha1908/Collaborative-Code-editor',
    demo: null,
  },
  {
    name: 'TASKFLOW',
    desc: 'Taskflow is an enterprise-grade task management SaaS engineered for strict organizational environments. It delivers the speed of a modern startup tool with the rigorous security posture required by massive enterprise compliance. Managers can distribute workloads confidently, knowing status updates push instantly.',
    problem: 'Scaling teams consistently struggle with chaotic task tracking software that fails to enforce granular role-based access controls.',
    solution: 'Implements a severe RBAC architecture paired with real-time Supabase syncing, keeping data visibility tightly regulated across clients.',
    tech: ['React', 'Supabase', 'Tailwind', 'PostgreSQL'],
    image: '/project-taskflow.png',
    github: 'https://github.com/Girisha1908/teamtask-flow',
    demo: null,
  },
  {
    name: 'SAHAY',
    desc: 'Sahay is an intelligent mobile companion application focused exclusively on elderly safety and accessible navigation. The platform empowers users with independence while drastically reducing response times when physical accidents or displacements occur in daily routine environments.',
    problem: 'Elderly individuals often struggle with complex modern interfaces, making it critically difficult to signal for help safely during emergencies.',
    solution: 'Replaces hurdles with an intuitive voice-driven interface equipped with passive AI-powered fall detection and one-tap SOS alerts.',
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
        <h3 className="text-[32px] md:text-[40px] font-bold text-white tracking-tight mb-8 leading-tight group-hover:text-blue-500 transition-colors duration-500">
          {p.name}
        </h3>

        {/* Problem / Solution fields - UN-CRAMPED */}
        <div className="flex flex-col gap-8 mb-10">
          <div>
            <span className="text-white/30 text-[11px] tracking-[0.15em] font-bold uppercase block mb-2">Problem:</span>
            <p className="text-[16px] text-white/70 leading-[1.7]">{p.problem}</p>
          </div>
          <div>
            <span className="text-white/30 text-[11px] tracking-[0.15em] font-bold uppercase block mb-2">Solution:</span>
            <p className="text-[16px] text-white/70 leading-[1.7]">{p.solution}</p>
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
