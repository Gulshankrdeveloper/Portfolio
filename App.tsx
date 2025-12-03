import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Education from './components/Education';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 relative">
      <Header />
      <main>
        <Hero />
        <Experience />
        <Skills />
        <Projects />
        <Education />
      </main>
      <Footer />
    </div>
  );
};

export default App;
