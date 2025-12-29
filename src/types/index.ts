export type UserRole = 'entrepreneur' | 'ngo' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  location?: string;
  profileImage?: string;
  bio?: string;
  skillCategory?: string;
  createdAt: Date;
}

export interface Product {
  id: string;
  userId: string;
  title: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  status: 'active' | 'in_review' | 'draft';
  views: number;
  sales: number;
  createdAt: Date;
}

export interface Story {
  id: string;
  title: string;
  description: string;
  image: string;
  authorName: string;
  location: string;
  createdAt: Date;
}

export interface FundingRecord {
  id: string;
  entrepreneurId: string;
  ngoId: string;
  status: 'pending' | 'approved' | 'completed';
  amount?: number;
  notes?: string;
  createdAt: Date;
}

export interface SkillRecommendation {
  id: string;
  skillName: string;
  description: string;
  reason: string;
  priority: 'high' | 'medium' | 'low';
}
