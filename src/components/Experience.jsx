import { motion } from 'framer-motion';

const experiences = [
  { 
    role: 'Data Analytics & Research Intern', 
    company: 'Sanjay Ghodawat Group', 
    date: 'Oct 2025 – Jan 2026',
    description: 'Worked on data-driven insights and reporting to support decision-making across L&D and GCC divisions.',
    bullets: [
      'Analyzed operational datasets to uncover trends and generate actionable insights for internal reporting',
      'Conducted market research and benchmarking to evaluate industry trends and compiled structured stakeholder reports',
      'Built Power BI dashboards to visualize key metrics, enabling non-technical teams to make faster, data-informed decisions'
    ]
  }
];

export default function Experience() {
  return (
    <section id="experience" className="section bg-black border-t border-white/5">
      <div className="container max-w-[1100px] mx-auto px-6">
        
        {/* Section Heading */}
        <div className="section-header">
          <span className="text-white/30 text-[12px] tracking-[0.15em] font-bold uppercase block mb-3">
            CAREER
          </span>
          <h2 className="section-title font-bold text-white tracking-tight">
            Experience & Awards
          </h2>
        </div>

        <div className="cards">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card"
            >
              <h3 className="card-title text-white">
                {exp.company}
              </h3>
              <div className="role">
                {exp.role}
              </div>
              <div className="date text-white">
                {exp.date}
              </div>

              <p className="card-desc text-white">
                {exp.description}
              </p>

              <ul>
                {exp.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start text-white/50">
                    <span className="leading-[1.6] text-[14px]">{bullet}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
