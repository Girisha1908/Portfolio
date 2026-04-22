import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

const groups = [
  { label: 'Languages', items: ['Python', 'JavaScript', 'TypeScript', 'C++', 'Java', 'Kotlin', 'PHP'] },
  { label: 'Cloud & DevOps', items: ['Docker', 'AWS', 'Linux', 'Shell', 'Git', 'CI/CD'] },
  { label: 'Frameworks', items: ['React', 'Node.js', 'Express', 'FastAPI', 'Tailwind', 'Vite', 'Socket.io'] },
  { label: 'Databases', items: ['PostgreSQL', 'MySQL', 'Supabase', 'Firebase', 'SQLite'] },
];

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" ref={ref} className="bg-black section-pad overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex items-baseline justify-between mb-16 md:mb-20"
        >
          <h2 className="text-3xl md:text-5xl text-white tracking-tight"
            style={{ fontFamily: "'Instrument Serif', serif" }}>
            My{' '}<em className="italic text-white/60">toolbox</em>
          </h2>
          <p className="text-white/40 text-sm hidden md:block">Skills</p>
        </motion.div>

        {/* Grouped pills */}
        <div className="space-y-10">
          {groups.map((g, i) => (
            <motion.div
              key={g.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <p className="text-white/30 text-xs tracking-widest uppercase mb-4">{g.label}</p>
              <div className="flex flex-wrap gap-3">
                {g.items.map((s) => (
                  <span key={s}
                    className="liquid-glass rounded-full px-5 py-2.5 text-sm text-white/60 hover:text-white/90 hover:bg-white/[0.04] transition-all duration-300 cursor-default">
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
