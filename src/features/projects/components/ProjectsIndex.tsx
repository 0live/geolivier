import { useTranslation } from "react-i18next";
import { useProjectFilters } from "../hooks/useProjectFilters";
import { ProjectFilters } from "./ProjectFilters";
import { ProjectList } from "./ProjectList";

export function ProjectsIndex() {
  const { t } = useTranslation();
  const {
    filteredProjects,
    availableTags,
    availableYears,
    selectedTags,
    selectedYears,
    setProjectFilters,
    clearProjectFilters,
  } = useProjectFilters();

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          {t("nav.projects")}
        </h1>
        <p className="text-xl text-muted-foreground">
          {t("projects.description", "My open-source work and personal projects.")}
        </p>
      </div>

      <ProjectFilters
        availableTags={availableTags}
        availableYears={availableYears}
        selectedTags={selectedTags}
        selectedYears={selectedYears}
        setProjectFilters={setProjectFilters}
        clearProjectFilters={clearProjectFilters}
      />

      <ProjectList projects={filteredProjects} />
    </div>
  );
}
