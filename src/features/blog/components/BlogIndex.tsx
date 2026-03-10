import { useTranslation } from "react-i18next";
import { useBlogFilters } from "../hooks/useBlogFilters";
import { BlogFilters } from "./BlogFilters";
import { BlogList } from "./BlogList";

export function BlogIndex() {
  const { t } = useTranslation();
  const {
    filteredPosts,
    availableTags,
    selectedTags,
    minTimestamp,
    maxTimestamp,
    dateRange,
    setBlogFilters,
    clearBlogFilters,
  } = useBlogFilters();

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          {t("nav.blog")}
        </h1>
        <p className="text-xl text-muted-foreground">
          {t("blog.description", "Articles and thoughts.")}
        </p>
      </div>

      <BlogFilters
        availableTags={availableTags}
        selectedTags={selectedTags}
        minTimestamp={minTimestamp}
        maxTimestamp={maxTimestamp}
        dateRange={dateRange}
        setBlogFilters={setBlogFilters}
        clearBlogFilters={clearBlogFilters}
      />

      <BlogList posts={filteredPosts} />
    </div>
  );
}
