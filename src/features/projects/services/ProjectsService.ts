import { MdxContentManager } from "@/lib/mdxManager";
import type { ComponentType, LazyExoticComponent } from "react";
import type { ProjectMeta } from "../types";

export class ProjectsService {
  private static projectLazy = import.meta.glob("../../../assets/content/projects/*.mdx");
  private static mdxManager = new MdxContentManager<ProjectMeta>(this.projectLazy);

  static async fetchAll(lang: string): Promise<ProjectMeta[]> {
    return this.mdxManager.fetchAll(lang);
  }

  static getComponent(slug: string, lang: string): LazyExoticComponent<ComponentType> {
    return this.mdxManager.getComponent(slug, lang);
  }
}

