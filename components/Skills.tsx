import React from 'react';
import Section from './Section';
import { SKILLS, CERTIFICATIONS } from '../constants';
import { Award, CheckCircle2 } from 'lucide-react';

const Skills: React.FC = () => {
  return (
    <Section id="skills" title="Skills & Technologies" className="bg-slate-50/50">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          {SKILLS.map((skillGroup, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="w-2 h-8 bg-primary-500 rounded-full"></span>
                {skillGroup.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map((skill, sIdx) => (
                  <span 
                    key={sIdx}
                    className="px-3 py-1.5 bg-slate-50 border border-slate-200 text-slate-700 rounded-md text-sm font-medium hover:border-primary-300 hover:bg-primary-50 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-8">
           <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <Award className="w-8 h-8 text-yellow-400" />
                <h3 className="text-2xl font-bold">Certifications</h3>
              </div>
              <ul className="space-y-4">
                {CERTIFICATIONS.map((cert, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                    <span className="text-slate-200 text-lg">{cert}</span>
                  </li>
                ))}
              </ul>
           </div>

           {/* Decorative generic stat card */}
           <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-xl border border-slate-200 text-center">
                <div className="text-4xl font-bold text-primary-600 mb-2">5+</div>
                <div className="text-sm text-slate-500 font-medium uppercase tracking-wide">Programming Languages</div>
              </div>
              <div className="bg-white p-6 rounded-xl border border-slate-200 text-center">
                 <div className="text-4xl font-bold text-primary-600 mb-2">3+</div>
                <div className="text-sm text-slate-500 font-medium uppercase tracking-wide">Major Projects</div>
              </div>
           </div>
        </div>
      </div>
    </Section>
  );
};

export default Skills;
