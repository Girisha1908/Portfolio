import { motion } from 'framer-motion';

const skillGroups = [
  {
    title: 'LANGUAGES',
    skills: [
      { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
      { name: 'JavaScript (ES6+)', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
      { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
      { name: 'C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg' },
      { name: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg' },
      { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
      { name: 'Kotlin', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg' },
    ]
  },
  {
    title: 'FRAMEWORKS',
    skills: [
      { name: 'React.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
      { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
      { name: 'Express.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg' },
      { name: 'FastAPI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg' },
      { name: 'Bootstrap', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg' },
      { name: 'Jetpack Compose', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/android/android-original.svg' },
    ]
  },
  {
    title: 'DEVOPS & CLOUD',
    skills: [
      { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' },
      { name: 'Docker Compose', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-plain.svg' },
      { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
      { name: 'Linux/Unix', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg' },
      { name: 'Shell Scripting', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg' },
    ]
  },
  {
    title: 'DATABASES & TOOLS',
    skills: [
      { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg' },
      { name: 'Supabase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg' },
      { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg' },

      { name: 'SQLite', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg' },
      { name: 'Socket.IO', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/socketio/socketio-original.svg' },
      { name: 'Git / GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg' },
    ]
  }
];

export default function Skills() {
  return (
    <section id="skills" className="section bg-black border-t border-white/5">
      <div className="container max-w-[1100px] mx-auto px-6">
        <div className="section-header">
          <h2 className="section-title font-bold text-white tracking-tight">
            Skills & Technologies
          </h2>
          <p className="section-subtext text-white">
            Tools and technologies I reach for when building products.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[32px]">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 hover:bg-white/[0.03] hover:border-white/10 transition-all duration-300"
            >
              <h3 className="text-white/40 text-[11px] tracking-[0.15em] font-bold uppercase border-b border-white/5 pb-4 mb-6">
                {group.title}
              </h3>
              
              <div className="grid grid-cols-2 gap-y-6 gap-x-6 pl-2 py-4">
                {group.skills.map((skill) => {
                  const invertIcon = skill.name.includes("GitHub") || skill.name.includes("Socket") || skill.name.includes("Express") || skill.name.includes("AWS");
                  
                  return (
                    <div
                      key={skill.name}
                      className="flex items-center gap-3 w-full opacity-60 hover:opacity-100 transition-opacity cursor-default"
                    >
                      <img 
                        src={skill.icon} 
                        alt={skill.name} 
                        className="w-[16px] h-[16px] object-contain grayscale opacity-80" 
                        style={invertIcon ? { filter: 'invert(1) grayscale(1)' } : {}} 
                      />
                      <span className="text-white text-[14px] font-medium tracking-wide">
                        {skill.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
