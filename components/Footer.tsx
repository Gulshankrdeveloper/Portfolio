import React from 'react';
import { PERSONAL_INFO } from '../constants';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-white py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold mb-2">{PERSONAL_INFO.name}</h2>
            <p className="text-slate-400 max-w-sm">
              Building digital experiences with modern technologies. 
              Let's create something amazing together.
            </p>
          </div>

          <div className="flex gap-6">
            <a href={`mailto:${PERSONAL_INFO.email}`} className="text-slate-400 hover:text-white transition-colors">
              <Mail className="w-6 h-6" />
            </a>
            <a href={PERSONAL_INFO.social.linkedin} className="text-slate-400 hover:text-white transition-colors">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href={PERSONAL_INFO.social.github} className="text-slate-400 hover:text-white transition-colors">
              <Github className="w-6 h-6" />
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Gulshan Kumar. All rights reserved.</p>
          
          <div className="flex items-center gap-6 mt-4 md:mt-0">
             <span>Last updated: {PERSONAL_INFO.lastUpdated}</span>
             <button 
                onClick={scrollToTop}
                className="flex items-center gap-2 hover:text-white transition-colors"
             >
                Back to Top <ArrowUp className="w-4 h-4" />
             </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
