import React from 'react';
import Section from './Section';
import { PROJECTS } from '../constants';
import { ExternalLink, Github, Smartphone, Layout, Monitor } from 'lucide-react';

const Projects: React.FC = () => {
  return (
    <Section id="projects" title="Featured Projects" className="bg-slate-50">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PROJECTS.map((project, idx) => {
          const isApp = project.title.toLowerCase().includes('app') || project.technologies.includes('Android');
          
          return (
            <div key={idx} className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl hover:shadow-primary-900/5 transition-all duration-300 flex flex-col h-full">
              <div className="h-48 bg-slate-100 relative overflow-hidden flex items-center justify-center">
                 {/* Placeholder for project image - using abstract pattern or icon */}
                 <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-slate-200 opacity-50"></div>
                 {isApp ? (
                    <Smartphone className="w-16 h-16 text-slate-300 group-hover:text-primary-500 transition-colors duration-300 transform group-hover:scale-110" />
                 ) : (
                    <Layout className="w-16 h-16 text-slate-300 group-hover:text-primary-500 transition-colors duration-300 transform group-hover:scale-110" />
                 )}
                 <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-slate-500 shadow-sm">
                    {project.period}
                 </div>
              </div>
              
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary-700 transition-colors">
                  {project.title}
                </h3>
                
                <div className="space-y-2 mb-6 flex-1">
                  {project.description.map((desc, dIdx) => (
                    <p key={dIdx} className="text-slate-600 text-sm leading-relaxed">
                      • {desc}
                    </p>
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, tIdx) => (
                    <span key={tIdx} className="text-xs font-medium px-2 py-1 bg-slate-100 text-slate-600 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center gap-4 mt-auto pt-4 border-t border-slate-100">
                  {project.links ? (
                    <>
                      <a href={project.links.source} className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors">
                        <Github className="w-4 h-4" />
                        Source
                      </a>
                      <a href={project.links.demo} className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors ml-auto">
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </a>
                    </>
                  ) : (
                     <span className="text-xs text-slate-400 italic">Internal Project / No Public Link</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
};

export default Projects;
