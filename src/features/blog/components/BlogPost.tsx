import { MdxLayout } from "@/components/layout/MdxLayout";
import { Spinner } from "@/components/ui/spinner";
import { ArrowLeft } from "lucide-react";
import type { ComponentType } from "react";
import { Suspense } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLoaderData } from "react-router";

export function BlogPost() {
  const Component = useLoaderData() as ComponentType;
  const { t } = useTranslation();

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Link
        to="/blog"
        className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        {t("blog.back")}
      </Link>

      <Suspense
        fallback={
          <div className="flex justify-center items-center min-h-[400px]">
            <Spinner className="h-8 w-8 text-primary" />
          </div>
        }
      >
        <MdxLayout>
          <Component />
        </MdxLayout>
      </Suspense>
    </div>
  );
}
