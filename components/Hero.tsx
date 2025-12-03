import React, { useState } from 'react';
import { Github, Linkedin, Mail, Phone, MapPin, Download, Loader2 } from 'lucide-react';
import { PERSONAL_INFO, EDUCATION, EXPERIENCE, PROJECTS, SKILLS } from '../constants';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadResume = async () => {
    setIsDownloading(true);
    try {
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF();
      
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 20;
      const contentWidth = pageWidth - (margin * 2);
      let y = 20;
      const lineHeight = 6;

      const checkPageBreak = (heightNeeded: number) => {
        if (y + heightNeeded > pageHeight - margin) {
          doc.addPage();
          y = 20;
        }
      };

      // --- Header ---
      doc.setFontSize(24);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(29, 78, 216); // Primary blue
      doc.text(PERSONAL_INFO.name, margin, y);
      y += 10;
      
      doc.setFontSize(14);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(30, 41, 59); // Slate 800
      doc.text(PERSONAL_INFO.role, margin, y);
      y += 8;

      doc.setFontSize(10);
      doc.setTextColor(71, 85, 105); // Slate 600
      const contactInfo = `${PERSONAL_INFO.email} | ${PERSONAL_INFO.phone} | ${PERSONAL_INFO.location}`;
      doc.text(contactInfo, margin, y);
      y += 6;
      doc.text(`LinkedIn: ${PERSONAL_INFO.social.linkedin} | GitHub: ${PERSONAL_INFO.social.github}`, margin, y);
      y += 15;

      // --- Section Helper ---
      const addSectionTitle = (title: string) => {
        checkPageBreak(15);
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(29, 78, 216);
        doc.text(title, margin, y);
        y += 2;
        doc.setDrawColor(203, 213, 225); // Slate 300
        doc.setLineWidth(0.5);
        doc.line(margin, y, margin + contentWidth, y);
        y += 8;
      };

      // --- Summary ---
      addSectionTitle("Summary");
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(51, 65, 85); // Slate 700
      const summaryLines = doc.splitTextToSize(PERSONAL_INFO.summary, contentWidth);
      doc.text(summaryLines, margin, y);
      y += (summaryLines.length * 5) + 10;

      // --- Experience ---
      addSectionTitle("Experience");
      EXPERIENCE.forEach(exp => {
        checkPageBreak(25);
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(15, 23, 42); // Slate 900
        doc.text(exp.role, margin, y);
        
        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(29, 78, 216);
        const dateText = exp.period;
        const dateWidth = doc.getTextWidth(dateText);
        doc.text(dateText, pageWidth - margin - dateWidth, y);
        y += 5;

        doc.setFont("helvetica", "normal");
        doc.setTextColor(71, 85, 105);
        doc.text(`${exp.company} • ${exp.duration || ''}`, margin, y);
        y += 6;

        if (exp.description) {
          const descLines = doc.splitTextToSize(exp.description, contentWidth);
          doc.text(descLines, margin, y);
          y += (descLines.length * 5) + 5;
        } else {
          y += 5;
        }
      });

      // --- Projects ---
      checkPageBreak(30);
      addSectionTitle("Projects");
      PROJECTS.forEach(proj => {
        checkPageBreak(25);
        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(15, 23, 42);
        doc.text(proj.title, margin, y);
        
        doc.setFontSize(10);
        doc.setTextColor(29, 78, 216);
        const projDate = proj.period;
        const projDateWidth = doc.getTextWidth(projDate);
        doc.text(projDate, pageWidth - margin - projDateWidth, y);
        y += 5;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(71, 85, 105);
        
        // Tech stack
        const tech = `Tech: ${proj.technologies.join(", ")}`;
        doc.text(tech, margin, y);
        y += 5;

        // Description bullets
        proj.description.forEach(desc => {
          checkPageBreak(6);
          const bullet = "• ";
          const descLines = doc.splitTextToSize(bullet + desc, contentWidth - 5);
          doc.text(descLines, margin + 2, y);
          y += (descLines.length * 5);
        });
        y += 5;
      });

      // --- Skills ---
      checkPageBreak(30);
      addSectionTitle("Technologies & Skills");
      SKILLS.forEach(skillGroup => {
        checkPageBreak(10);
        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(15, 23, 42);
        const label = `${skillGroup.category}: `;
        doc.text(label, margin, y);
        
        const labelWidth = doc.getTextWidth(label);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(71, 85, 105);
        const items = skillGroup.items.join(", ");
        const itemLines = doc.splitTextToSize(items, contentWidth - labelWidth);
        doc.text(itemLines, margin + labelWidth, y);
        y += (itemLines.length * 5) + 3;
      });
      y += 5;

      // --- Education ---
      checkPageBreak(30);
      addSectionTitle("Education");
      EDUCATION.forEach(edu => {
        checkPageBreak(20);
        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(15, 23, 42);
        doc.text(edu.degree, margin, y);
        
        doc.setFontSize(10);
        doc.setTextColor(29, 78, 216);
        const eduDate = edu.period;
        const eduDateWidth = doc.getTextWidth(eduDate);
        doc.text(eduDate, pageWidth - margin - eduDateWidth, y);
        y += 5;

        doc.setFont("helvetica", "normal");
        doc.setTextColor(71, 85, 105);
        doc.text(`${edu.institution}${edu.grade ? ` • ${edu.grade}` : ''}`, margin, y);
        y += 8;
      });

      doc.save(`${PERSONAL_INFO.name.replace(/\s+/g, '_')}_Resume.pdf`);
    } catch (error) {
      console.error("PDF Generation failed:", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

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
            <button 
              onClick={handleDownloadResume}
              disabled={isDownloading}
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-colors cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isDownloading ? (
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              ) : (
                <Download className="w-5 h-5 mr-2" />
              )}
              {isDownloading ? 'Generating...' : 'Download Resume'}
            </button>
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
