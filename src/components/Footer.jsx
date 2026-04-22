export default function Footer() {
  return (
    <footer className="bg-black py-[80px] border-t border-white/5">
      <div className="max-w-[1100px] mx-auto px-6 flex flex-col md:flex-row items-center md:items-start justify-between gap-8 md:gap-0">
        
        {/* Left: Name and Tagline */}
        <div className="text-center md:text-left">
          <h2 className="text-[20px] font-bold text-white mb-1">
            Girish Anamala.
          </h2>
          <p className="text-[14px] text-white/50">
            Building scalable systems.
          </p>
          <p className="text-[12px] text-white/30 mt-6">
            © 2026 Girish Anamala
          </p>
        </div>

        {/* Right: Social Links */}
        <div className="flex items-center gap-[24px] text-[14px]">
          <a href="https://github.com/Girisha1908" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">
            GitHub
          </a>
          <a href="https://linkedin.com/in/girishaanamala" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">
            LinkedIn
          </a>
          <a href="mailto:anamalagirisha@gmail.com" className="text-white/60 hover:text-white transition-colors">
            Email
          </a>
        </div>
        
      </div>
    </footer>
  );
}
