export interface Project {
  id: string;
  title: string;
  category: 'Fullstack' | 'Frontend' | 'Backend' | 'Architecture' | 'FinTech' | 'Enterprise';
  descriptionEs: string;
  descriptionEn: string;
  longDescriptionEs?: string;
  longDescriptionEn?: string;
  technologies: string[];
  imageUrl: string;
  videoUrl?: string;
  githubUrl: string;
  demoUrl?: string;
  docsUrl?: string;
  featured: boolean;
  metrics?: { labelEs: string; labelEn: string; value: string }[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  roleEs: string;
  roleEn: string;
  periodEs: string;
  periodEn: string;
  locationEs: string;
  locationEn: string;
  descriptionEs: string[];
  descriptionEn: string[];
  technologies: string[];
  achievementsEs?: string[];
  achievementsEn?: string[];
  companyLogo?: string;
}

export interface TechSkill {
  name: string;
  categoryEs: string;
  categoryEn: string;
  categoryKey: 'programming' | 'web' | 'databases' | 'automation' | 'tools' | 'systems' | 'cybersecurity' | 'support' | 'methodologies' | 'platforms' | 'languages';
  level: number; // 0 to 100
  icon: string;
  color: string;
  descriptionEs: string;
  descriptionEn: string;
}

export interface ServiceOffering {
  id: string;
  titleEs: string;
  titleEn: string;
  subtitleEs: string;
  subtitleEn: string;
  descriptionEs: string;
  descriptionEn: string;
  icon: string;
  featuresEs: string[];
  featuresEn: string[];
  badge?: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  institution: string;
  issueDate: string;
  hours?: number;
  score?: number;
  expiryDate?: string;
  credentialUrl?: string;
  pdfUrl?: string;
  imageUrl?: string;
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
