import { useTranslation } from "react-i18next";
import { useProjectFilters } from "../hooks/useProjectFilters";
import { ProjectFilters } from "./ProjectFilters";
import { ProjectList } from "./ProjectList";

export function ProjectsIndex() {
  const { t } = useTranslation();
  const {
    filteredProjects,
    availableTags,
    selectedTags,
    setProjectFilters,
    clearProjectFilters,
  } = useProjectFilters();

  return (
  <div className="w-full max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
      <div className="flex flex-col w-full lg:w-1/2">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          {t("nav.projects")}
        </h1>
        <p className="text-xl text-muted-foreground">
          {t("projects.description", "My open-source work and personal projects.")}
        </p>
      </div>

      <div className="flex flex-col w-full lg:w-1/2">
        <ProjectFilters
          availableTags={availableTags}
          selectedTags={selectedTags}
          setProjectFilters={setProjectFilters}
          clearProjectFilters={clearProjectFilters}
        />
      </div>
    </div>

    <ProjectList projects={filteredProjects} />
  </div>
);
}
