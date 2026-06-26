export interface Inquiry {
  id: string;
  name: string;
  email: string;
  businessName: string;
  projectDescription: string;
  budgetEstimate: string;
  submittedAt: string;
  status: 'new' | 'reviewed';
}

export interface PortfolioItem {
  id: string;
  title: string;
  client: string;
  category: 'Boutique' | 'Corporate' | 'Culinary' | 'Architectural';
  year: string;
  image: string;
  description: string;
  brandStory: string;
  colorPalette: string[];
  features: string[];
  typography: string;
}

export interface PricingPackage {
  id: string;
  name: string;
  price: number;
  subtitle: string;
  description: string;
  deliverables: string[];
  timeline: string;
  badge?: string;
}

export interface CustomQuoteOptions {
  pages: number;
  customCopy: boolean;
  seoSetup: boolean;
  prioritySupport: boolean;
  domainConfig: boolean;
}

export type ActiveView = 'home' | 'services' | 'portfolio';
