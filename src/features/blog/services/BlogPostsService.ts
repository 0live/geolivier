import type { ComponentType } from "react";
import { lazy } from "react";
import type { BlogMeta } from "../types";

export class BlogPostsService {
  private static blogLazy = import.meta.glob("../../../assets/content/blog/*.mdx");
  private static componentsMap: Map<string, React.LazyExoticComponent<ComponentType>> | null = null;

  private static extractSlug(path: string): string {
    const parts = path.split("/");
    const file = parts[parts.length - 1];
    return file.replace(".mdx", "");
  }

  private static getComponentsMap(): Map<string, React.LazyExoticComponent<ComponentType>> {
    if (!this.componentsMap) {
      this.componentsMap = new Map();
      Object.entries(this.blogLazy).forEach(([path, importFn]) => {
        this.componentsMap!.set(
          this.extractSlug(path),
          lazy(importFn as () => Promise<{ default: ComponentType }>)
        );
      });
    }
    return this.componentsMap;
  }

  static async fetchAll(): Promise<BlogMeta[]> {
    const posts = await Promise.all(
      Object.entries(this.blogLazy).map(async ([path, importFn]) => {
        const mod = (await importFn()) as { frontmatter: Omit<BlogMeta, "slug"> };
        return {
          slug: this.extractSlug(path),
          ...mod.frontmatter,
        };
      })
    );
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  static getComponent(slug: string): React.LazyExoticComponent<ComponentType> {
    const map = this.getComponentsMap();
    const Component = map.get(slug);
    if (!Component) throw new Error(`Blog post not found: ${slug}`);
    return Component;
  }
}

