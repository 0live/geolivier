import { useAppStore } from '@/app/store';
import { useLoaderData } from 'react-router';
import type { ProjectMeta } from '../types';

export function useProjectFilters() {
  const projects = useLoaderData() as ProjectMeta[];
  const { tags: selectedTags, years: selectedYears } = useAppStore((state) => state.projectFilters);
  const setProjectFilters = useAppStore((state) => state.setProjectFilters);
  const clearProjectFilters = useAppStore((state) => state.clearProjectFilters);

  const availableTags = Array.from(new Set(projects.flatMap((project) => project.tags))).sort();
  const availableYears = Array.from(new Set(projects.map((project) => project.year))).sort((a, b) => b - a);

  const filteredProjects = projects.filter((project) => {
    const matchesTags =
      selectedTags.length === 0 || selectedTags.some((tag) => project.tags.includes(tag));

    const matchesYears =
      selectedYears.length === 0 || selectedYears.includes(project.year);

    return matchesTags && matchesYears;
  });

  return {
    filteredProjects,
    availableTags,
    availableYears,
    selectedTags,
    selectedYears,
    setProjectFilters,
    clearProjectFilters,
  };
}
