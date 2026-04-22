import { motion } from 'framer-motion';

const cards = [
  {
    organization: 'Next Tech Lab AP',
    role: 'Associate · Cybersecurity Domain',
    date: 'Jan 2024 – Sept 2025',
    description: 'Actively contributed to India’s first multi-disciplinary undergraduate research lab. Authored technical blogs for the official NTLAP publication Arcana.',
    bullets: [
      'Authored “Understanding Browser-in-the-Middle (BitM) Attacks” — published in Arcana',
      'Contributed to cybersecurity research within a cross-disciplinary undergraduate environment'
    ]
  },
  {
    organization: 'FOSS SRMAP',
    role: 'Co-Lead · Free & Open Source Community',
    date: 'July 2025 – Present',
    description: 'Co-leading a 300+ member tech community at SRM AP promoting open-source software, Linux, and collaborative development culture across campus.',
    bullets: [
      'Organizing workshops, peer-learning sessions, and open-source contribution drives',
      'Building a culture of knowledge sharing around Linux, Git, and open development'
    ]
  }
];

export default function Leadership() {
  return (
    <section id="leadership" className="section bg-black border-t border-white/5">
      <div className="container max-w-[1100px] mx-auto px-6">
        {/* Header Block constraints tightly matched to 600px */}
        <div className="section-header">
          <span className="text-white/30 text-[12px] tracking-[0.15em] font-bold uppercase block mb-3">
            COMMUNITY
          </span>
          <h2 className="section-title font-bold text-white tracking-tight">
            Leadership & Volunteering
          </h2>
          <p className="section-subtext text-white">
            Building communities and contributing to open knowledge beyond the classroom.
          </p>
        </div>

        {/* CSS-Grid Layout */}
        <div className="cards">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card"
            >
              <h3 className="card-title text-white">
                {card.organization}
              </h3>
              <div className="role">
                {card.role}
              </div>
              <div className="date text-white">
                {card.date}
              </div>

              <p className="card-desc text-white">
                {card.description}
              </p>

              <ul>
                {card.bullets.map((bullet, idx) => (
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
