import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Leadership from './components/Leadership';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

export default function App() {
  return (
    <div className="bg-black min-h-screen selection:bg-[#3b82f6] selection:text-white font-sans text-white/90 cursor-none">
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Experience />
        <Skills />
        <Projects />
        <Leadership />
      </main>
      <Footer />
    </div>
  );
}
