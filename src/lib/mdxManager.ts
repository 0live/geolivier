import type { ComponentType, LazyExoticComponent } from "react";
import { lazy } from "react";

export class MdxContentManager<T extends { slug: string }> {
  private componentsMap: Map<string, LazyExoticComponent<ComponentType>> | null = null;
  private globResult: Record<string, () => Promise<unknown>>;

  constructor(globResult: Record<string, () => Promise<unknown>>) {
    this.globResult = globResult;
  }

  private extractSlugAndLang(path: string): { slug: string; lang: string } {
    const parts = path.split("/");
    const file = parts[parts.length - 1];
    const match = file.match(/^(.*?)\.([a-z]{2})\.mdx$/);
    if (match) {
      return { slug: match[1], lang: match[2] };
    }
    return { slug: file.replace(".mdx", ""), lang: "en" };
  }

  private getComponentsMap(): Map<string, LazyExoticComponent<ComponentType>> {
    if (!this.componentsMap) {
      this.componentsMap = new Map();
      Object.entries(this.globResult).forEach(([path, importFn]) => {
        const { slug, lang } = this.extractSlugAndLang(path);
        this.componentsMap!.set(
          `${lang}:${slug}`,
          lazy(importFn as () => Promise<{ default: ComponentType }>)
        );
      });
    }
    return this.componentsMap;
  }

  async fetchAll(lang: string): Promise<T[]> {
    const items = await Promise.all(
      Object.entries(this.globResult).map(async ([path, importFn]) => {
        const { slug, lang: docLang } = this.extractSlugAndLang(path);
        if (docLang !== lang) return null;

        const mod = (await importFn()) as { frontmatter: Omit<T, "slug"> };
        return { slug, ...mod.frontmatter } as T;
      })
    );
    return items.filter((p) => p !== null) as T[];
  }

  getComponent(slug: string, lang: string): LazyExoticComponent<ComponentType> {
    const map = this.getComponentsMap();
    const Component = map.get(`${lang}:${slug}`);
    if (!Component) throw new Error(`Document not found: ${slug} (${lang})`);
    return Component;
  }
}
