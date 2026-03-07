import type { ComponentType } from "react";
import { lazy } from "react";
import type { ProjectMeta } from "../types";

export class ProjectsService {
  private static projectLazy = import.meta.glob("../../../assets/content/projects/*.mdx");
  private static componentsMap: Map<string, React.LazyExoticComponent<ComponentType>> | null = null;

  private static extractSlug(path: string): string {
    const parts = path.split("/");
    const file = parts[parts.length - 1];
    return file.replace(".mdx", "");
  }

  private static getComponentsMap(): Map<string, React.LazyExoticComponent<ComponentType>> {
    if (!this.componentsMap) {
      this.componentsMap = new Map();
      Object.entries(this.projectLazy).forEach(([path, importFn]) => {
        this.componentsMap!.set(
          this.extractSlug(path),
          lazy(importFn as () => Promise<{ default: ComponentType }>)
        );
      });
    }
    return this.componentsMap;
  }

  static async fetchAll(): Promise<ProjectMeta[]> {
    const projects = await Promise.all(
      Object.entries(this.projectLazy).map(async ([path, importFn]) => {
        const mod = (await importFn()) as { frontmatter: Omit<ProjectMeta, "slug"> };
        return {
          slug: this.extractSlug(path),
          ...mod.frontmatter,
        };
      })
    );
    return projects;
  }

  static getComponent(slug: string): React.LazyExoticComponent<ComponentType> {
    const map = this.getComponentsMap();
    const Component = map.get(slug);
    if (!Component) throw new Error(`Project not found: ${slug}`);
    return Component;
  }
}

