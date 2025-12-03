import React from 'react';
import Section from './Section';
import { EDUCATION } from '../constants';
import { GraduationCap, Calendar } from 'lucide-react';

const Education: React.FC = () => {
  return (
    <Section id="education" title="Education">
      <div className="space-y-8 max-w-4xl mx-auto">
        {EDUCATION.map((edu, idx) => (
          <div key={idx} className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm hover:border-primary-200 transition-colors">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900">{edu.degree}</h3>
                <div className="flex items-center gap-2 text-primary-700 font-medium mt-1">
                  <GraduationCap className="w-5 h-5" />
                  <span>{edu.institution}</span>
                </div>
              </div>
              <div className="flex flex-col items-start md:items-end gap-1">
                <div className="flex items-center gap-2 text-slate-500 text-sm bg-slate-100 px-3 py-1 rounded-full">
                  <Calendar className="w-4 h-4" />
                  {edu.period}
                </div>
                {edu.grade && (
                  <span className="text-sm font-bold text-slate-900 bg-green-50 text-green-700 px-3 py-1 rounded-full border border-green-100">
                    {edu.grade}
                  </span>
                )}
              </div>
            </div>
            
            <div className="mt-4 text-slate-600">
              {edu.details.map((detail, dIdx) => (
                <p key={dIdx} className="text-sm leading-relaxed mb-2">
                  {detail}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Education;
