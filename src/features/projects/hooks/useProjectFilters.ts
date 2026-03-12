import { useAppStore } from '@/app/store';
import { useLoaderData } from 'react-router';
import type { ProjectMeta } from '../types';

export function useProjectFilters() {
  const projects = useLoaderData() as ProjectMeta[];
  const { tags: selectedTags } = useAppStore((state) => state.projectFilters);
  const setProjectFilters = useAppStore((state) => state.setProjectFilters);
  const clearProjectFilters = useAppStore((state) => state.clearProjectFilters);

  const availableTags = Array.from(new Set(projects.flatMap((project) => project.tags))).sort();

  const filteredProjects = projects.filter((project) => {
    return selectedTags.length === 0 || selectedTags.some((tag) => project.tags.includes(tag));
  });

  return {
    filteredProjects,
    availableTags,
    selectedTags,
    setProjectFilters,
    clearProjectFilters,
  };
}
