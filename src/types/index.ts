export interface Product {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  price: number;
  mrp: number;
  category: string;
  isPrescription: boolean;
  composition?: string;
  manufacturer?: string;
  consumeType?: string;
  expiryDate?: string;
  features: string[];
  images: {
    main: string;
    gallery: string[];
  };
  details: {
    about: string;
    uses: {
      title: string;
      description: string;
    }[];
    benefits: string[];
    howItWorks: string;
    directions: string[];
    storage: string[];
    warnings: string[];
    glossary?: {
      title: string;
      content: string;
    };
  };
}

export interface SlideContent {
  id: number;
  title: string;
  description: string;
  buttonText: string;
  gradient: string;
}

export interface AboutCard {
  icon: string;
  title: string;
  description: string;
}
