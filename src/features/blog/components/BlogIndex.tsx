import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { Link, useLoaderData } from "react-router";
import type { BlogMeta } from "../types";

export function BlogIndex() {
  const { t } = useTranslation();
  const posts = useLoaderData() as BlogMeta[];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          {t("nav.blog")}
        </h1>
        <p className="text-xl text-muted-foreground">{t("blog.description", "Articles and thoughts.")}</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {posts.map((post: BlogMeta) => (
          <Link key={post.slug} to={`/blog/${post.slug}`}>
            <Card className="h-full hover:border-primary/50 transition-colors duration-200">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm text-muted-foreground">
                    {new Date(post.date).toLocaleDateString()}
                  </span>
                  <div className="flex gap-2 flex-wrap justify-end">
                    {post.tags.map((tag: string) => (
                      <span key={tag} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                <CardDescription className="line-clamp-3 mt-2">
                  {post.description}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
        {posts.length === 0 && (
          <p className="text-muted-foreground col-span-full">{t("blog.empty", "No articles found.")}</p>
        )}
      </div>
    </div>
  );
}
