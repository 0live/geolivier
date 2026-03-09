import type { PropsWithChildren } from "react";

export function MdxLayout({ children }: PropsWithChildren) {
  return (
    <article className="prose prose-zinc dark:prose-invert max-w-none prose-a:text-primary hover:prose-a:text-primary/80 prose-headings:scroll-m-20 w-full pb-16">
      {children}
    </article>
  );
}
