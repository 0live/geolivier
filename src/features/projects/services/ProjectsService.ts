import type { ComponentType } from "react";
import { lazy } from "react";
import type { ProjectMeta } from "../types";

export class ProjectsService {
  private static projectLazy = import.meta.glob("../../../assets/content/projects/*.mdx");
  private static componentsMap: Map<string, React.LazyExoticComponent<ComponentType>> | null = null;

  private static extractSlugAndLang(path: string): { slug: string; lang: string } {
    const parts = path.split("/");
    const file = parts[parts.length - 1];
    const match = file.match(/^(.*?)\.([a-z]{2})\.mdx$/);
    if (match) {
      return { slug: match[1], lang: match[2] };
    }
    return { slug: file.replace(".mdx", ""), lang: "en" };
  }

  private static getComponentsMap(): Map<string, React.LazyExoticComponent<ComponentType>> {
    if (!this.componentsMap) {
      this.componentsMap = new Map();
      Object.entries(this.projectLazy).forEach(([path, importFn]) => {
        const { slug, lang } = this.extractSlugAndLang(path);
        this.componentsMap!.set(
          `${lang}:${slug}`,
          lazy(importFn as () => Promise<{ default: ComponentType }>)
        );
      });
    }
    return this.componentsMap;
  }

  static async fetchAll(lang: string): Promise<ProjectMeta[]> {
    const projects = await Promise.all(
      Object.entries(this.projectLazy).map(async ([path, importFn]) => {
        const { slug, lang: docLang } = this.extractSlugAndLang(path);
        if (docLang !== lang) return null;

        const mod = (await importFn()) as { frontmatter: Omit<ProjectMeta, "slug"> };
        return {
          slug,
          ...mod.frontmatter,
        };
      })
    );
    return projects.filter((p) => p !== null) as ProjectMeta[];
  }

  static getComponent(slug: string, lang: string): React.LazyExoticComponent<ComponentType> {
    const map = this.getComponentsMap();
    const Component = map.get(`${lang}:${slug}`);
    if (!Component) throw new Error(`Project not found: ${slug} (${lang})`);
    return Component;
  }
}

