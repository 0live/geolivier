import { useAppStore } from '@/app/store';
import { useLoaderData } from 'react-router';
import type { BlogMeta } from '../types';

export function useBlogFilters() {
  const posts = useLoaderData() as BlogMeta[];
  const { tags: selectedTags, dateRange } = useAppStore((state) => state.blogFilters);
  const setBlogFilters = useAppStore((state) => state.setBlogFilters);
  const clearBlogFilters = useAppStore((state) => state.clearBlogFilters);

  const availableTags = Array.from(new Set(posts.flatMap((post) => post.audience))).sort();

  const timestamps = posts.map((post) => new Date(post.date).getTime());
  const minTimestamp = timestamps.length > 0 ? Math.min(...timestamps) : 0;
  const maxTimestamp = timestamps.length > 0 ? Math.max(...timestamps) : 0;

  const filteredPosts = posts.filter((post) => {
    const postTimestamp = new Date(post.date).getTime();
    
    const matchesTags =
      selectedTags.length === 0 || selectedTags.some((audience) => post.audience.includes(audience));

    const matchesDate =
      !dateRange || (postTimestamp >= dateRange[0] && postTimestamp <= dateRange[1]);

    return matchesTags && matchesDate;
  });

  return {
    filteredPosts,
    availableTags,
    selectedTags,
    minTimestamp,
    maxTimestamp,
    dateRange,
    setBlogFilters,
    clearBlogFilters,
  };
}
