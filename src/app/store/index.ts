import { createBlogFilterSlice, type BlogFilterSlice } from '@/features/blog/store/blogFilterSlice';
import { createProjectFilterSlice, type ProjectFilterSlice } from '@/features/projects/store/projectFilterSlice';
import { create } from 'zustand';

type AppState = BlogFilterSlice & ProjectFilterSlice;

export const useAppStore = create<AppState>()((...a) => ({
  ...createBlogFilterSlice(...a),
  ...createProjectFilterSlice(...a),
}));
