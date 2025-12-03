export interface Education {
  degree: string;
  institution: string;
  period: string;
  details: string[];
  grade?: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  duration?: string;
  description?: string;
}

export interface Project {
  title: string;
  period: string;
  description: string[];
  technologies: string[];
  links?: {
    demo?: string;
    source?: string;
  };
}

export interface SkillCategory {
  category: string;
  items: string[];
}
