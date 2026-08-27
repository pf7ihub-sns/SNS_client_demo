export interface Domain {
  id: string;
  name: string;
  description: string;
  iconName: string;
  featured: boolean;
  products: string[]; // array of product IDs
}


export interface Product {
  id: string;
  name: string;
  slug: string;
  domainId: string;
  category: string;
  shortDescription: string;
  useCase: string;
  descriptionPoints: string[];
  keyCapabilities: string[];
  status: 'Active' | 'Beta' | 'Coming Soon';
  featured: boolean;
  isNew: boolean;
  tags: string[];
  heroImageUrl?: string;
  demoUrl?: string;
  siteUrl?: string;
  workflowSteps?: string[];
  workflowImageUrl?: string;
}
