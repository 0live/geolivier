import { MdxContentManager } from "@/shared/lib/mdxManager";
import type { ComponentType, LazyExoticComponent } from "react";
import type { BlogMeta } from "../types";

export class BlogPostsService {
  private static blogLazy = import.meta.glob("../../../shared/assets/content/blog/*.mdx");
  private static mdxManager = new MdxContentManager<BlogMeta>(this.blogLazy);

  static async fetchAll(lang: string): Promise<BlogMeta[]> {
    const posts = await this.mdxManager.fetchAll(lang);
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  static getComponent(slug: string, lang: string): LazyExoticComponent<ComponentType> {
    return this.mdxManager.getComponent(slug, lang);
  }
}

