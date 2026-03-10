import type { StateCreator } from 'zustand';

export interface ProjectFilterSlice {
  projectFilters: {
    tags: string[];
    years: number[];
  };
  setProjectFilters: (filters: Partial<ProjectFilterSlice['projectFilters']>) => void;
  clearProjectFilters: () => void;
}

export const createProjectFilterSlice: StateCreator<ProjectFilterSlice> = (set) => ({
  projectFilters: {
    tags: [],
    years: [],
  },
  setProjectFilters: (filters) =>
    set((state) => ({
      projectFilters: { ...state.projectFilters, ...filters },
    })),
  clearProjectFilters: () =>
    set(() => ({
      projectFilters: { tags: [], years: [] },
    })),
});
