import React from 'react';
import Section from './Section';
import { EXPERIENCE } from '../constants';
import { Briefcase } from 'lucide-react';

const Experience: React.FC = () => {
  return (
    <Section id="experience" title="Work Experience">
      <div className="relative border-l-2 border-slate-200 ml-3 md:ml-6 space-y-12">
        {EXPERIENCE.map((exp, idx) => (
          <div key={idx} className="relative pl-8 md:pl-12">
            <span className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-white border-4 border-primary-600"></span>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
              <h3 className="text-xl font-bold text-slate-900">{exp.role}</h3>
              <span className="text-sm font-semibold text-primary-600 bg-primary-50 px-3 py-1 rounded-full mt-2 sm:mt-0 w-fit">
                {exp.period}
              </span>
            </div>
            
            <div className="flex items-center gap-2 text-slate-700 font-medium mb-4">
              <Briefcase className="w-4 h-4" />
              <span>{exp.company}</span>
              <span className="text-slate-400 mx-1">•</span>
              <span className="text-slate-500 text-sm">{exp.duration}</span>
            </div>
            
            <p className="text-slate-600 leading-relaxed max-w-3xl">
              {exp.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Experience;
