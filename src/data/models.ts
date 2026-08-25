export interface Domain {
  id: string;
  name: string;
  description: string;
  iconName: string;
  featured: boolean;
  products: string[]; // array of product IDs
}

export interface Capability {
  title: string;
  description: string;
}

export interface VisualSection {
  title: string;
  description: string;
  imageUrl?: string;
  layout: 'image-left' | 'image-right';
}

export interface BusinessOutcome {
  label: string;
  metric?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  domainId: string;
  category: string;
  description: string;
  shortDescription: string;
  status: 'Active' | 'Beta' | 'Coming Soon';
  featured: boolean;
  isNew: boolean;
  tags: string[];
  technologies: string[];
  heroImageUrl?: string;
  visualSections: VisualSection[];
  businessOutcomes?: BusinessOutcome[];
  screenshots: string[];
  videoUrl?: string;
  problem: string;
  solution: string;
  businessValue: string;
  capabilities: Capability[];
  workflowSteps: string[];
  workflowImageUrl?: string;
  architecture?: {
    layers: { name: string; items: string[] }[];
  };
  demoUrl?: string;
  documentationUrl?: string;
  siteUrl?: string;
}
