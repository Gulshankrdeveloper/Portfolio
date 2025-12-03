import React from 'react';
import { Github, Linkedin, Mail, Phone, MapPin, Download } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <section id="about" className="pt-32 pb-16 md:pt-48 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        <div className="flex-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-primary-100 text-primary-800 text-sm font-semibold mb-6">
              Available for Jobs
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-slate-900 tracking-tight mb-6">
              Hello, I'm <br />
              <span className="text-primary-700">{PERSONAL_INFO.name}</span>
            </h1>
            <p className="text-xl sm:text-2xl text-slate-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {PERSONAL_INFO.role} with a passion for building robust applications and solving complex problems.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10"
          >
            <a 
              href={`mailto:${PERSONAL_INFO.email}`} 
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary-700 text-white font-medium hover:bg-primary-800 transition-colors shadow-lg shadow-primary-500/30"
            >
              <Mail className="w-5 h-5 mr-2" />
              Contact Me
            </a>
            <a 
              href="#" 
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-colors"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Resume
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-slate-500"
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary-600" />
              <span>{PERSONAL_INFO.location}</span>
            </div>
            <a href={`tel:${PERSONAL_INFO.phone}`} className="flex items-center gap-2 hover:text-primary-600 transition-colors">
              <Phone className="w-5 h-5 text-primary-600" />
              <span>{PERSONAL_INFO.phone}</span>
            </a>
            <div className="w-px h-6 bg-slate-300 hidden sm:block"></div>
            <div className="flex gap-4">
              <a href={PERSONAL_INFO.social.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-white rounded-full border border-slate-200 hover:border-primary-500 hover:text-primary-600 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href={PERSONAL_INFO.social.github} target="_blank" rel="noopener noreferrer" className="p-2 bg-white rounded-full border border-slate-200 hover:border-primary-500 hover:text-primary-600 transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>
        
        {/* Abstract shape decoration or Image placeholder if user had one */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="flex-1 max-w-md lg:max-w-full"
        >
          <div className="relative">
             {/* Decorative abstract blob */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary-400 to-purple-400 rounded-full opacity-30 blur-3xl animate-pulse"></div>
            <div className="relative bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Summary</h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                {PERSONAL_INFO.summary}
              </p>
              
              <div className="pt-6 border-t border-slate-100">
                 <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-3">Hobbies & Interests</h4>
                 <div className="flex flex-wrap gap-2">
                    {['Cricket', 'Music', 'Traveling', 'Tech'].map(hobby => (
                      <span key={hobby} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium">
                        {hobby}
                      </span>
                    ))}
                 </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
