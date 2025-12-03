import { Education, Experience, Project, SkillCategory } from './types';
import { 
  Github, 
  Linkedin, 
  Mail, 
  MapPin, 
  Phone, 
  Code2, 
  Layout, 
  Database, 
  Terminal,
  Smartphone
} from 'lucide-react';

export const PERSONAL_INFO = {
  name: "Gulshan Kumar",
  role: "Full Stack Web & Android Developer",
  summary: "I am seeking for an opportunities where I can apply my skills and also learn to navigate real-world challenges. By taking this experience, I can enhance my professional growth.",
  location: "Hazaribagh",
  email: "gulshankr6203@gmail.com",
  phone: "+91 62055 09181",
  social: {
    linkedin: "https://linkedin.com/in/gulshan-kumar",
    github: "https://github.com/Gulshan-kumar",
  },
  lastUpdated: "November 2025"
};

export const EDUCATION: Education[] = [
  {
    degree: "BCA, Computer Science",
    institution: "Vinoba Bhave University",
    period: "July 2022 - July 2025",
    grade: "GPA: 7.94/10",
    details: [
      "Coursework: Software Foundations, Computer Architecture, Algorithms, Software Analysis and Design, Artificial Intelligence, Comparison of Learning Algorithms, DBMS, Computational Theory."
    ]
  },
  {
    degree: "Intermediate, PCM with Computer Science",
    institution: "Inter Science College",
    period: "Mar. 2020 - Mar. 2022",
    grade: "Grade: 91.6%",
    details: [
      "Coursework: Physics, Chemistry, Mathematics, English, Computer Science"
    ]
  },
  {
    degree: "Matriculation, General Studies",
    institution: "National Public School",
    period: "Mar. 2012 - Mar. 2020",
    grade: "Grade: 85%",
    details: [
      "Coursework: Physics, Chemistry, Mathematics, English, Computer Science, Hindi, Social Science"
    ]
  }
];

export const EXPERIENCE: Experience[] = [
  {
    role: "Android App Developer Intern",
    company: "CloudSoft Technology",
    period: "May 2025 - Present",
    duration: "6 months",
    description: "Contributing to the development of mobile applications, implementing UI/UX designs, and integrating backend services."
  }
];

export const PROJECTS: Project[] = [
  {
    title: "CarRental Android App",
    period: "Jan. 2025",
    description: [
      "Developed a CarRent android app where you can book cars.",
      "Integrated database for booking management and user profiles."
    ],
    technologies: ["XML", "Kotlin", "LottieFiles", "SQL"]
  },
  {
    title: "Bike Landing Page",
    period: "Jan. 2023",
    description: [
      "Developed an Electric bike landing page that contains the modern UI of a landing page.",
      "Optimized for responsiveness and user engagement."
    ],
    technologies: ["HTML", "CSS", "JavaScript"],
    links: {
      demo: "#",
      source: "#"
    }
  },
  {
    title: "Hospital Landing Page",
    period: "Jan. 2023",
    description: [
      "Developed a hospital landing page ensuring accessibility and clean design.",
      "Focused on clear information hierarchy for patients."
    ],
    technologies: ["HTML", "CSS", "JavaScript"],
    links: {
      demo: "#",
      source: "#"
    }
  }
];

export const SKILLS: SkillCategory[] = [
  {
    category: "Languages",
    items: ["Java", "C", "C++", "JavaScript", "Python"]
  },
  {
    category: "Development",
    items: ["HTML", "CSS", "Tailwind CSS", "React", "Node.js", "Express.js", "MongoDB", "SQL", "Kotlin", "XML"]
  },
  {
    category: "Software",
    items: ["Visual Studio", "Microsoft SQL Server", "Eclipse", "Android Studio"]
  },
  {
    category: "Soft Skills",
    items: ["Communication", "Leadership", "Problem Solving", "Teamwork"]
  }
];

export const CERTIFICATIONS = [
  "Full Stack Web Development",
  "DSA with Java and System Design",
  "Android App Development"
];

export const HOBBIES = [
  "Playing Cricket",
  "Listening to Music",
  "Traveling",
  "Watching Tech Videos"
];
