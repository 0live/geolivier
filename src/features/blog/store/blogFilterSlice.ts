import type { StateCreator } from 'zustand';

export interface BlogFilterSlice {
  blogFilters: {
    tags: string[];
    dateRange: [number, number] | null;
  };
  setBlogFilters: (filters: Partial<BlogFilterSlice['blogFilters']>) => void;
  clearBlogFilters: () => void;
}

export const createBlogFilterSlice: StateCreator<BlogFilterSlice> = (set) => ({
  blogFilters: {
    tags: [],
    dateRange: null,
  },
  setBlogFilters: (filters) =>
    set((state) => ({
      blogFilters: { ...state.blogFilters, ...filters },
    })),
  clearBlogFilters: () =>
    set(() => ({
      blogFilters: { tags: [], dateRange: null },
    })),
});
