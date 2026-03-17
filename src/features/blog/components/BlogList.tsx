import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import type { BlogMeta } from "../types";

export function BlogList({ posts }: { posts: BlogMeta[] }) {
  const { t } = useTranslation();

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
      {posts.map((post) => (
        <Card key={post.slug} className="flex flex-col h-full hover:border-primary/50 transition-colors duration-200">
          <Link key={post.slug} to={`/blog/${post.slug}`} className="flex-1">
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-medium text-muted-foreground bg-muted px-2 py-1 rounded-md">
                  {new Date(post.date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                  })}
                </span>
                <div className="flex gap-2 flex-wrap justify-end">
                  {post.audience.map((audience: string) => (
                    <span
                      key={audience}
                      className="text-[10px] tracking-widest font-bold border border-accent/50 text-accent-foreground px-2 py-0.5 rounded-sm shadow-sm"
                    >
                      {audience}
                    </span>
                  ))}
                </div>
              </div>
              <CardTitle className="line-clamp-2">{post.title}</CardTitle>
              <CardDescription className="line-clamp-3 mt-2 normal-case">
                {post.description}
              </CardDescription>
            </CardHeader>
          </Link>
        </Card>
      ))}
      {posts.length === 0 && (
        <p className="text-muted-foreground col-span-full text-center py-10 opacity-70">
          {t("blog.empty", "No articles found matching your criteria.")}
        </p>
      )}
    </div>
  );
}
