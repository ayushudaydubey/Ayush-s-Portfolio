export interface SkillCategory {
  category: string;
  description?: string;
  skills: {
    name: string;
    level?: string;
    experience?: string;
  }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type?: string;
  description?: string;
  highlights: string[];
  technologies: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  statusOrType?: string;
  description?: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  institution: string;
  period: string;
  description: string;
}

export interface DeveloperProfile {
  name: string;
  role: string;
  secondaryRole: string;
  tagline: string;
  bioSummary: string;
  bioFull: string[];
  location: string;
  phone: string;
  availability: string;
  email: string;
  github: string;
  linkedin: string;
}

export const developerProfile: DeveloperProfile = {
  name: "Ayush Dubey",
  role: "Full Stack Developer | MERN Stack",
  secondaryRole: "MERN & PERN Stack Engineer",
  tagline:
    "Building scalable production applications, high-throughput APIs, and responsive interactive web experiences.",
  bioSummary:
    "Full Stack Developer with professional experience in MERN and PERN stack development, specializing in React.js, Next.js, Node.js, Express.js, REST APIs, MongoDB, and PostgreSQL. Experienced in building and deploying web applications with scalable APIs, authentication, database migration, third-party integrations, real-time systems, and performance optimization. Skilled in large-scale data processing and production troubleshooting. Previously worked as a Full Stack Developer and Mentor, providing technical support and guidance to 100+ students in MERN stack development.",
  bioFull: [
    "Full Stack Developer with professional experience in MERN and PERN stack development, specializing in React.js, Next.js, Node.js, Express.js, REST APIs, MongoDB, and PostgreSQL.",
    "Experienced in building and deploying web applications with scalable APIs, authentication, database migration, third-party integrations, real-time systems, and performance optimization. Skilled in large-scale data processing and production troubleshooting.",
    "Previously worked as a Full Stack Developer and Mentor, providing technical support and guidance to 100+ students in MERN stack development.",
  ],
  location: "Panna, Madhya Pradesh, India",
  phone: "+91 6266993726",
  availability: "Available for Full-Time Roles",
  email: "102001ayushdubey@gmail.com",
  github: "https://github.com/ayushudaydubey",
  linkedin: "https://linkedin.com/in/ayush-dubey",
};

export const skillsData: SkillCategory[] = [
  {
    category: "Languages",
    description: "Core programming and scripting languages.",
    skills: [
      { name: "JavaScript (ES6+)" },
      { name: "TypeScript" },
    ],
  },
  {
    category: "Frontend",
    description: "Modern component architectures, styling, and client state management.",
    skills: [
      { name: "HTML" },
      { name: "CSS" },
      { name: "SCSS" },
      { name: "Bootstrap" },
      { name: "Tailwind CSS" },
      { name: "React" },
      { name: "Context API" },
      { name: "Redux Toolkit" },
      { name: "Next.js" },
      { name: "TanStack Query" },
    ],
  },
  {
    category: "Backend & APIs",
    description: "Robust server runtimes, REST services, auth, and worker processing.",
    skills: [
      { name: "Node.js" },
      { name: "Express.js" },
      { name: "REST APIs" },
      { name: "JWT Authentication" },
      { name: "Role-Based Access Control (RBAC)" },
      { name: "Worker Threads" },
      { name: "Multer" },
      { name: "ExcelJS" },
    ],
  },
  {
    category: "Databases",
    description: "Relational, document, serverless, and in-memory databases.",
    skills: [
      { name: "MongoDB" },
      { name: "PostgreSQL" },
      { name: "Supabase" },
      { name: "Redis" },
    ],
  },
  {
    category: "Real-Time & Integrations",
    description: "WebSockets, payment gateways, asset cloud pipelines, and transactional mailing.",
    skills: [
      { name: "Socket.IO" },
      { name: "Razorpay" },
      { name: "Stripe" },
      { name: "Cloudinary" },
      { name: "ImageKit" },
      { name: "Nodemailer" },
    ],
  },
  {
    category: "AI, Deployment & Tools",
    description: "LLM APIs, vector stores, containers, web servers, and cloud platforms.",
    skills: [
      { name: "Gemini API" },
      { name: "RAG" },
      { name: "Pinecone (Vector Database)" },
      { name: "AWS" },
      { name: "Docker" },
      { name: "Linux" },
      { name: "Nginx" },
      { name: "PM2" },
      { name: "Vercel" },
      { name: "Render" },
      { name: "Git" },
      { name: "GitHub" },
      { name: "Postman" },
    ],
  },
];

export const experiencesData: ExperienceItem[] = [
  {
    id: "exp-dwarkadhish",
    role: "Full-Stack Developer",
    company: "Dwarkadhish E-Commerce Pvt. Ltd.",
    location: "Rajkot",
    period: "04 May 2026 – Present",
    highlights: [
      "Developed and deployed 4+ scalable production applications using React.js, Next.js, Node.js, and Express.js, handling API development, database integration with MongoDB and PostgreSQL, testing, deployment, troubleshooting, and post-release issue resolution.",
      "Built the Prospect Data Engine (PDE), a centralized lead-management platform with REST APIs, bulk Excel processing, Target List assignment, advanced filtering, and real-time activity tracking for Sales and Marketing teams.",
      "Developed the company portfolio using React.js, Vite, and Tailwind CSS with GSAP/Framer Motion animations, project showcases, responsive UI, and performance optimization.",
      "Migrated production applications and databases to the company's self-hosted infrastructure.",
    ],
    technologies: [
      "React.js",
      "Next.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "PostgreSQL",
      "Vite",
      "Tailwind CSS",
      "GSAP",
      "Framer Motion",
      "REST APIs",
    ],
  },
  {
    id: "exp-sheryians",
    role: "Full-Stack Developer & Mentor",
    company: "Sheryians Pvt. Ltd.",
    location: "Bhopal",
    period: "01 July 2025 – 30 April 2026",
    highlights: [
      "Developed and prepared real-world projects for live classes using the MERN stack, focusing on clean, optimized, and maintainable code while implementing practical frontend and backend concepts.",
      "Provided technical support, code guidance, debugging assistance, and one-to-one/group mentorship to 100+ students in MERN stack development.",
      "Helped students understand programming concepts, resolve coding issues, and build practical web applications through online and offline sessions.",
    ],
    technologies: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "MERN Stack",
      "JavaScript",
      "REST APIs",
      "Debugging",
    ],
  },
];

export const educationData: EducationItem[] = [
  {
    id: "edu-mca",
    degree: "Master of Computer Applications (MCA)",
    institution: "Technocrats Institute of Technology (TIT), Bhopal (M.P.)",
    period: "Pursuing",
    statusOrType: "Distance Learning (alongside full-time work)",
  },
  {
    id: "edu-polytechnic",
    degree: "Polytechnic Diploma - Computer Science & Engineering",
    institution: "Rajiv Gandhi Proudyogiki Vishwavidyalaya, Bhopal (M.P.)",
    period: "2021 – 2024",
  },
  {
    id: "edu-bsc",
    degree: "Bachelor of Science - Mathematics",
    institution: "Maharaja Chhatrasal Bundelkhand University, Chhatarpur (M.P.)",
    period: "2018 – 2021",
  },
];

export const certificationsData: CertificationItem[] = [
  {
    id: "cert-mern",
    title: "MERN Full Stack Web Development Program",
    institution: "Sheryians Coding School, Bhopal (M.P.)",
    period: "October 2024 – July 2025",
    description:
      "Completed a comprehensive MERN Full Stack Web Development program covering frontend and backend development, database management, deployment, responsive UI/UX, web animations, Generative AI, and real-world project development.",
  },
];
