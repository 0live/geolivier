import type { ComponentType } from "react";
import { lazy } from "react";
import type { BlogMeta } from "../types";

export class BlogPostsService {
  private static blogLazy = import.meta.glob("../../../assets/content/blog/*.mdx");
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
      Object.entries(this.blogLazy).forEach(([path, importFn]) => {
        const { slug, lang } = this.extractSlugAndLang(path);
        this.componentsMap!.set(
          `${lang}:${slug}`,
          lazy(importFn as () => Promise<{ default: ComponentType }>)
        );
      });
    }
    return this.componentsMap;
  }

  static async fetchAll(lang: string): Promise<BlogMeta[]> {
    const posts = await Promise.all(
      Object.entries(this.blogLazy).map(async ([path, importFn]) => {
        const { slug, lang: docLang } = this.extractSlugAndLang(path);
        if (docLang !== lang) return null;

        const mod = (await importFn()) as { frontmatter: Omit<BlogMeta, "slug"> };
        return {
          slug,
          ...mod.frontmatter,
        };
      })
    );
    const validPosts = posts.filter((p) => p !== null) as BlogMeta[];
    return validPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  static getComponent(slug: string, lang: string): React.LazyExoticComponent<ComponentType> {
    const map = this.getComponentsMap();
    const Component = map.get(`${lang}:${slug}`);
    if (!Component) throw new Error(`Blog post not found: ${slug} (${lang})`);
    return Component;
  }
}

