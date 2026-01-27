
export type Language = 'en' | 'cn';

export interface Project {
  id: string;
  title: string;
  category: string;
  brandColor: string;
  year: string;
  description: string;
  challenge: string;
  solution: string;
  metrics: string[];
  imageUrl: string;
  longImages: string[];
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string[];
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  period: string;
}

export interface Skill {
  name: string;
  icon: string;
}
