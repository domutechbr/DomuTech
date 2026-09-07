export interface Project {
  tag: string;
  title: string;
  description: string;
  image?: string;
  link?: string;
  stats?: {
    icon: React.ComponentType<{ className?: string }>;
    value: string;
  }[];
  isFeatured?: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}
