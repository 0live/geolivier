export interface Experience {
  title: string;
  company: string;
  period: string;
  type?: "work" | "education";
  description?: string;
  tagline?: string;
  highlights?: string[];
  technologies: string[];
}
