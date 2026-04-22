import { motion } from 'framer-motion';

const experiences = [
  { role: 'Project Intern', company: 'Sanjay Ghodawat Group', date: 'Oct 2025 – Jan 2026' },
  { role: 'Co-Lead', company: 'FOSS SRMAP', date: 'Jul 2025 – Present' },
  { role: 'Associate', company: 'Next Tech Lab AP', date: 'Jan 2024 – Sept 2025' },
];

const awards = [
  { title: '2nd Place', event: 'Code for Connection Hackathon' },
  { title: 'Oracle Certified', event: 'Java SE 17 Developer' },
];

export default function Experience() {
  return (
    <section id="experience" className="bg-black py-[120px] border-t border-white/5">
      <div className="max-w-[1100px] mx-auto px-6">
        {/* Section Heading with 48px margin bottom */}
        <div className="mb-[48px]">
          <h2 className="text-[clamp(40px,6vw,56px)] font-bold text-white tracking-tight leading-[1.1]">
            Experience & Awards
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {/* Experience Column */}
          <div>
            <h3 className="text-white/40 text-[14px] font-semibold uppercase tracking-widest mb-10">
              Experience
            </h3>
            <div className="flex flex-col">
              {experiences.map((exp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="border-b border-white-[0.03] border-white/5 pb-8 mb-8 last:border-0 last:mb-0 last:pb-0"
                >
                  <h4 className="text-[20px] font-bold text-white/90 mb-1 leading-snug">
                    {exp.role}
                  </h4>
                  <p className="text-[16px] text-white/50 font-normal leading-[1.6]">
                    {exp.company} <span className="mx-1 opacity-50">·</span> {exp.date}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Awards Column */}
          <div>
            <h3 className="text-white/40 text-[14px] font-semibold uppercase tracking-widest mb-10">
              Awards
            </h3>
            <div className="flex flex-col">
              {awards.map((award, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="border-b border-white-5 pb-8 mb-8 last:border-0 last:mb-0 last:pb-0 border-white/5"
                >
                  <h4 className="text-[20px] font-bold text-white/90 mb-1 leading-snug">
                    {award.title}
                  </h4>
                  <p className="text-[16px] text-white/50 font-normal leading-[1.6]">
                    {award.event}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
