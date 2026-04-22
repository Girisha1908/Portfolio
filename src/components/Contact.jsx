import { motion, useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Mail, Copy, Check } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './icons';

const socials = [
  { Icon: GithubIcon, label: 'GitHub', href: 'https://github.com/Girisha1908' },
  { Icon: LinkedinIcon, label: 'LinkedIn', href: 'https://linkedin.com/in/girishaanamala' },
  { Icon: ({ size }) => <Mail size={size} />, label: 'Email', href: 'mailto:anamalagirisha@gmail.com' },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText('anamalagirisha@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" ref={ref} className="bg-black py-24 md:py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-white/40 text-xs tracking-widest uppercase mb-4"
        >
          Contact
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-4"
        >
          Let's connect
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-white/35 text-sm mb-12"
        >
          Open to opportunities and interesting conversations.
        </motion.p>

        {/* Social icons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center gap-4 mb-10"
        >
          {socials.map((s) => {
            const { Icon } = s;
            return (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="bg-white/[0.04] border border-white/[0.06] rounded-xl p-4 text-white/60 hover:text-white hover:border-white/[0.15] transition-all duration-300"
              >
                <Icon size={22} />
              </a>
            );
          })}
        </motion.div>

        {/* Email */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="inline-flex items-center gap-3 bg-white/[0.03] border border-white/[0.06] rounded-xl px-6 py-3"
        >
          <Mail size={14} className="text-white/25" />
          <span className="text-white/50 text-sm font-mono">anamalagirisha@gmail.com</span>
          <button
            onClick={copy}
            className="p-1.5 rounded-lg hover:bg-white/[0.06] text-white/25 hover:text-white transition-all"
            aria-label="Copy email"
          >
            {copied ? <Check size={14} className="text-blue-400" /> : <Copy size={14} />}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
