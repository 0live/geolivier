import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { ExternalLink, Github } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import type { ProjectMeta } from "../types";

export function ProjectList({ projects }: { projects: ProjectMeta[] }) {
  const { t } = useTranslation();

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
      {projects.sort((a, b) => b.year - a.year).map((project) => (
        <Card key={project.slug} className="flex flex-col h-full hover:border-primary/50 transition-colors duration-200">
          <Link to={`/projects/${project.slug}`} className="flex-1">
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-medium text-muted-foreground bg-muted px-2 py-1 rounded-md">
                  {project.year}
                </span>
                <div className="flex gap-2 flex-wrap justify-end">
                  {project.tags.map((tag: string) => (
                    <span key={tag} className="text-[10px] tracking-widest font-bold border border-accent/50 text-accent-foreground px-2 py-0.5 rounded-sm shadow-sm">
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
            {project.publicationUrl && (
              <a
                href={project.publicationUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center text-sm text-primary hover:text-primary/80 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Publication
              </a>
            )}
          </CardFooter>
        </Card>
      ))}
      {projects.length === 0 && (
        <p className="text-muted-foreground col-span-full text-center py-10 opacity-70">
          {t("projects.empty", "No projects found matching your criteria.")}
        </p>
      )}
    </div>
  );
}
