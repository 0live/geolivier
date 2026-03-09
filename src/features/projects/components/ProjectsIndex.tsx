import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/shared/components/ui/card";
import { ExternalLink, Github } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link, useLoaderData } from "react-router";
import type { ProjectMeta } from "../types";

export function ProjectsIndex() {
  const { t } = useTranslation();
  const projects = useLoaderData() as ProjectMeta[];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          {t("nav.projects")}
        </h1>
        <p className="text-xl text-muted-foreground">{t("projects.description", "My open-source work and personal projects.")}</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {projects.map((project: ProjectMeta) => (
          <Card key={project.slug} className="flex flex-col h-full hover:border-primary/50 transition-colors duration-200">
            <Link to={`/projects/${project.slug}`} className="flex-1">
              <CardHeader>
                <div className="flex justify-end items-start mb-2">
                  <div className="flex gap-2 flex-wrap justify-end">
                    {project.tags.map((tag: string) => (
                      <span key={tag} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <CardTitle className="line-clamp-2">{project.title}</CardTitle>
                <CardDescription className="line-clamp-3 mt-2">
                  {project.description}
                </CardDescription>
              </CardHeader>
            </Link>
            <CardFooter className="flex gap-4">
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github className="mr-2 h-4 w-4" />
                  Code
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center text-sm text-primary hover:text-primary/80 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Live
                </a>
              )}
            </CardFooter>
          </Card>
        ))}
        {projects.length === 0 && (
          <p className="text-muted-foreground col-span-full">{t("projects.empty", "No projects found.")}</p>
        )}
      </div>
    </div>
  );
}
