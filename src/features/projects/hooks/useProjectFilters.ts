import { useAppStore } from '@/app/store';
import { useLoaderData } from 'react-router';
import type { ProjectMeta } from '../types';

export function useProjectFilters() {
  const projects = useLoaderData() as ProjectMeta[];
  const { tags: selectedTags, years: selectedYears } = useAppStore((state) => state.projectFilters);
  const setProjectFilters = useAppStore((state) => state.setProjectFilters);
  const clearProjectFilters = useAppStore((state) => state.clearProjectFilters);

  // Compute available unique tags and years
  const availableTags = Array.from(new Set(projects.flatMap((project) => project.tags))).sort();
  const availableYears = Array.from(new Set(projects.map((project) => project.year))).sort((a, b) => b - a); // Descending

  // Filter projects
  const filteredProjects = projects.filter((project) => {
    // Tag filter (intersection: all selected tags must be present)
    const matchesTags =
      selectedTags.length === 0 || selectedTags.every((tag) => project.tags.includes(tag));

    // Year filter (union: project year must be in selected years)
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
