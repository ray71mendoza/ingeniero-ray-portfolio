export interface Project {
  id: string;
  title: string;
  category: 'Fullstack' | 'Frontend' | 'Backend' | 'Architecture' | 'AI & Cloud';
  description: string;
  longDescription?: string;
  technologies: string[];
  imageUrl: string;
  videoUrl?: string;
  githubUrl: string;
  demoUrl?: string;
  docsUrl?: string;
  featured: boolean;
  metrics?: { label: string; value: string }[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  description: string[];
  technologies: string[];
  achievements: string[];
  companyLogo?: string;
}

export interface TechSkill {
  name: string;
  category: 'Frontend' | 'Backend' | 'Databases' | 'DevOps' | 'CMS' | 'Testing' | 'Tools' | 'Cybersecurity' | 'AI';
  level: number; // 0 to 100
  icon: string;
  color: string;
  description: string;
}

export interface ServiceOffering {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  features: string[];
  badge?: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  institution: string;
  issueDate: string;
  expiryDate?: string;
  credentialUrl?: string;
  pdfUrl?: string;
  imageUrl: string;
  skills: string[];
}

export interface GithubRepoInfo {
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  url: string;
  updatedAt: string;
  topics: string[];
}

export interface ContactFormModel {
  name: string;
  email: string;
  subject: string;
  message: string;
  serviceInterest?: string;
}
