import { useState, useEffect, useCallback, useRef } from 'react';
import Lenis from 'lenis';
import store from './store';
import Loader from './components/Loader';
import ThreeScene from './components/ThreeScene';
import Navbar from './components/Navbar';
import SectionIndicator from './components/SectionIndicator';
import Hero from './components/Hero';
import About from './components/About';
import SelectedWork from './components/SelectedWork';
import Experience from './components/Experience';
import Achievements from './components/Achievements';
import Skills from './components/Skills';
import Recognition from './components/Recognition';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import GlitchEffect from './components/GlitchEffect';
import ResumeButton from './components/ResumeButton';

const sectionIds = ['hero', 'about', 'work', 'experience', 'impact', 'skills', 'recognition', 'education', 'contact'];

export default function App() {
  const [threeReady, setThreeReady] = useState(false);
  const [currentSection, setCurrentSection] = useState('hero');
  const lenisRef = useRef(null);

  const handleThreeCreated = useCallback(() => {
    setThreeReady(true);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    const onScroll = ({ scroll, limit }) => {
      store.scroll = limit > 0 ? scroll / limit : 0;
    };
    lenis.on('scroll', onScroll);

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const observers = [];
    const handleIntersect = (id) => (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setCurrentSection(id);
          store.currentSection = sectionIds.indexOf(id);
        }
      });
    };

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(handleIntersect(id), {
        threshold: 0.15,
        rootMargin: '-5% 0px -5% 0px',
      });
      observer.observe(el);
      observers.push(observer);

      const lineObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) el.classList.add('line-visible');
        },
        { threshold: 0.05 }
      );
      lineObserver.observe(el);
      observers.push(lineObserver);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <>
      <Loader ready={threeReady} />
      <GlitchEffect />
      <ThreeScene onCreated={handleThreeCreated} />
      <Navbar currentSection={currentSection} />
      <SectionIndicator currentSection={currentSection} />
      <ResumeButton />
      <main className="content-wrapper">
        <Hero />
        <About />
        <SelectedWork />
        <Experience />
        <Achievements />
        <Skills />
        <Recognition />
        <Education />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
