export interface BlogMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  audience: BlogAudience[];
}

export type BlogAudience = "developer" | "geographer" | "project-manager" | "recruiter";
