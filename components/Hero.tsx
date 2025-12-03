import React, { useState } from 'react';
import { Github, Linkedin, Mail, Phone, MapPin, Download, Loader2 } from 'lucide-react';
import { PERSONAL_INFO, EDUCATION, EXPERIENCE, PROJECTS, SKILLS, CERTIFICATIONS, HOBBIES } from '../constants';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadResume = async () => {
    setIsDownloading(true);
    try {
      // Access jsPDF from the global window object (loaded via script tag in index.html)
      // This is more reliable than dynamic imports in some environments
      const jsPDFLib = (window as any).jspdf;
      
      if (!jsPDFLib) {
        throw new Error("PDF library not loaded. Please refresh the page.");
      }

      const { jsPDF } = jsPDFLib;
      const doc = new jsPDF();
      
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 15; // Slightly tighter margin to fit content like original
      const contentWidth = pageWidth - (margin * 2);
      let y = 15;

      const checkPageBreak = (heightNeeded: number) => {
        if (y + heightNeeded > pageHeight - margin) {
          doc.addPage();
          y = 15;
        }
      };

      // --- Header (Replicating the PDF Design) ---
      
      // Last Updated (Top Right)
      doc.setFontSize(8);
      doc.setFont("helvetica", "italic");
      doc.setTextColor(100, 116, 139); // Slate 500
      const updatedText = `Last updated in ${PERSONAL_INFO.lastUpdated}`;
      doc.text(updatedText, pageWidth - margin - doc.getTextWidth(updatedText), y);
      y += 5;

      // Name (Centered, Blue)
      doc.setFontSize(22);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(29, 78, 216); // Primary 700 blue
      const nameWidth = doc.getTextWidth(PERSONAL_INFO.name);
      doc.text(PERSONAL_INFO.name, (pageWidth - nameWidth) / 2, y);
      y += 8;

      // Contact Info Row (Centered, Icons simulated with text)
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(30, 41, 59); // Slate 800
      
      const contactLine1 = `${PERSONAL_INFO.phone}  |  ${PERSONAL_INFO.email}  |  ${PERSONAL_INFO.location}`;
      const contactLine1Width = doc.getTextWidth(contactLine1);
      doc.text(contactLine1, (pageWidth - contactLine1Width) / 2, y);
      y += 5;

      const contactLine2 = `LinkedIn: linkedin.com/in/gulshan-kumar  |  GitHub: github.com/Gulshan-kumar`;
      const contactLine2Width = doc.getTextWidth(contactLine2);
      doc.setTextColor(29, 78, 216); // Make links blue
      doc.text(contactLine2, (pageWidth - contactLine2Width) / 2, y);
      y += 10;

      // --- Section Title Helper ---
      const addSectionTitle = (title: string) => {
        checkPageBreak(12);
        y += 2;
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(29, 78, 216); // Blue Headers
        doc.text(title, margin, y);
        y += 2;
        doc.setDrawColor(29, 78, 216); // Blue Line
        doc.setLineWidth(0.5);
        doc.line(margin, y, margin + contentWidth, y);
        y += 6;
      };

      // --- Summary ---
      addSectionTitle("Summary");
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(0, 0, 0);
      const summaryLines = doc.splitTextToSize(PERSONAL_INFO.summary, contentWidth);
      doc.text(summaryLines, margin, y);
      y += (summaryLines.length * 5) + 4;

      // --- Education ---
      addSectionTitle("Education");
      EDUCATION.forEach(edu => {
        checkPageBreak(18);
        // Degree + University
        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(0, 0, 0);
        
        // Split degree line if too long, or keep simple
        const degreeText = `${edu.degree}, ${edu.institution}`;
        doc.text(degreeText, margin, y);
        
        // Date Right Aligned
        doc.setFont("helvetica", "normal");
        const dateWidth = doc.getTextWidth(edu.period);
        doc.text(edu.period, pageWidth - margin - dateWidth, y);
        y += 5;

        // Details (GPA / Coursework)
        doc.setFontSize(9);
        doc.setTextColor(50, 50, 50);
        if (edu.grade) {
          doc.text(`• ${edu.grade}`, margin + 5, y);
          y += 4;
        }
        edu.details.forEach(detail => {
          if (!detail.startsWith("Coursework")) {
             // For non-coursework details if any
          }
        });
        // Find coursework in details to print cleanly
        const coursework = edu.details.find(d => d.includes("Coursework"));
        if (coursework) {
           const cwLines = doc.splitTextToSize(`• ${coursework}`, contentWidth - 5);
           doc.text(cwLines, margin + 5, y);
           y += (cwLines.length * 4);
        }
        y += 3;
      });

      // --- Certification Courses ---
      checkPageBreak(25);
      addSectionTitle("Certification Courses");
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(0, 0, 0);
      CERTIFICATIONS.forEach((cert, idx) => {
        doc.text(`${idx + 1}. ${cert}`, margin, y);
        y += 5;
      });
      y += 2;

      // --- Experience ---
      checkPageBreak(25);
      addSectionTitle("Experience");
      EXPERIENCE.forEach(exp => {
        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(0, 0, 0);
        // "Company, Role" format from resume
        const titleLine = `${exp.company}, ${exp.role}`;
        doc.text(titleLine, margin, y);
        
        doc.setFont("helvetica", "normal");
        const expDate = exp.period + (exp.duration ? `\n${exp.duration}` : "");
        const expDateWidth = doc.getTextWidth(exp.period);
        
        // Handle multiline date if needed (usually just one line in resume header)
        doc.text(exp.period, pageWidth - margin - expDateWidth, y);
        // If duration exists, put it below date or next to it? Resume implies right aligned block
        if (exp.duration) {
           const durWidth = doc.getTextWidth(exp.duration);
           doc.text(exp.duration, pageWidth - margin - durWidth, y + 4);
        }

        y += 5;
        if (exp.description) {
           const descLines = doc.splitTextToSize(exp.description, contentWidth);
           doc.text(descLines, margin, y);
           y += (descLines.length * 5) + 3;
        } else {
           y += 5;
        }
      });

      // --- Technologies ---
      checkPageBreak(35);
      addSectionTitle("Technologies");
      SKILLS.forEach(skillGroup => {
        checkPageBreak(8);
        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(0, 0, 0);
        const label = `${skillGroup.category}: `;
        doc.text(label, margin, y);
        
        const labelWidth = doc.getTextWidth(label);
        doc.setFont("helvetica", "normal");
        const items = skillGroup.items.join(", ");
        const itemLines = doc.splitTextToSize(items, contentWidth - labelWidth);
        doc.text(itemLines, margin + labelWidth, y);
        y += (itemLines.length * 5);
      });
      y += 3;

      // --- Projects ---
      checkPageBreak(40);
      addSectionTitle("Projects");
      PROJECTS.forEach(proj => {
        checkPageBreak(20);
        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(0, 0, 0);
        
        // Project Title
        let titleText = proj.title;
        // The resume has "Title | Links | Source Code" format
        if (proj.links) {
           // Simplified for PDF generation
           titleText += " | Links | Source Code";
        }
        doc.text(titleText, margin, y);
        
        doc.setFont("helvetica", "normal");
        const pDateWidth = doc.getTextWidth(proj.period);
        doc.text(proj.period, pageWidth - margin - pDateWidth, y);
        y += 5;

        // Bullets
        doc.setFontSize(9);
        proj.description.forEach(desc => {
          const bullet = "• ";
          const descLines = doc.splitTextToSize(bullet + desc, contentWidth - 5);
          doc.text(descLines, margin + 5, y);
          y += (descLines.length * 4);
        });
        
        // Used Tech
        const used = `• Used ${proj.technologies.join(", ")}`;
        doc.text(used, margin + 5, y);
        y += 7;
      });

      // --- Hobbies ---
      checkPageBreak(20);
      addSectionTitle("Hobbies");
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(0, 0, 0);
      HOBBIES.forEach(hobby => {
        doc.text(hobby, margin, y);
        y += 5;
      });

      doc.save(`Gulshan_Kumar_Resume.pdf`);
    } catch (error: any) {
      console.error("PDF Generation failed:", error);
      alert("Failed to generate PDF. Please ensure your browser allows scripts from cdnjs.cloudflare.com");
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