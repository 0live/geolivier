import { Badge } from "@/components/ui/badge";
import { Building2, Calendar, GraduationCap } from "lucide-react";
import { useTimeline } from "@/features/about/hooks/useTimeline";
import { Link } from "react-router";

export default function Timeline() {
  const { experiences } = useTimeline();

  const formatText = (text: string) => {
    // Basic Markdown-like parser for [text](url)
    const parts = text.split(/(\[.*?\]\(.*?\))/g);
    return parts.map((part, index) => {
      const match = part.match(/\[(.*?)\]\((.*?)\)/);
      if (match) {
        const [, label, url] = match;
        const isExternal = url.startsWith("http");
        const className =
          "text-primary hover:underline font-medium transition-colors hover:text-primary/80";

        if (isExternal) {
          return (
            <a
              className={className}
              href={url}
              key={index}
              rel="noopener noreferrer"
              target="_blank"
            >
              {label}
            </a>
          );
        }

        return (
          <Link className={className} key={index} to={url}>
            {label}
          </Link>
        );
      }
      return part;
    });
  };

  return (
    <div className="mx-auto max-w-(--breakpoint-sm) px-6 py-12 md:py-20">
      <div className="relative ml-3">
        {/* Timeline line */}
        <div className="absolute top-4 bottom-0 left-0 border-l-2" />

        {experiences.map(
          (
            {
              company,
              description,
              tagline,
              highlights,
              period,
              technologies,
              title,
              type,
            },
            index
          ) => (
            <div className="relative pb-12 pl-8 last:pb-0" key={index}>
              {/* Timeline dot */}
              <div className="absolute top-3 left-px h-3 w-3 -translate-x-1/2 rounded-full border-2 border-primary bg-background" />

              {/* Content */}
              <div className="space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent">
                    {type === "education" ? (
                      <GraduationCap className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <Building2 className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                  <span className="font-medium text-base">{company}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-xl tracking-[-0.01em]">
                    {title}
                  </h3>
                  <div className="mt-2 flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4" />
                    <span>{period}</span>
                  </div>
                </div>

                {tagline && (
                  <p className="font-medium text-muted-foreground/80 text-sm">
                    {formatText(tagline)}
                  </p>
                )}
                {description && (
                  <p className="whitespace-pre-line text-pretty text-muted-foreground text-sm sm:text-base">
                    {formatText(description)}
                  </p>
                )}
                {highlights && highlights.length > 0 && (
                  <ul className="list-disc space-y-1.5 pl-4 text-muted-foreground text-sm sm:text-base">
                    {highlights.map((highlight, i) => {
                      const colonIndex = highlight.indexOf(":");
                      if (colonIndex !== -1) {
                        const header = highlight.substring(0, colonIndex).trim();
                        const content = highlight
                          .substring(colonIndex + 1)
                          .trim();
                        return (
                          <li key={i} className="text-pretty">
                            <span className="font-semibold text-foreground/90">
                              {header}
                            </span>
                            {" : "}
                            {formatText(content)}
                          </li>
                        );
                      }
                      return (
                        <li key={i} className="text-pretty">
                          {formatText(highlight)}
                        </li>
                      );
                    })}
                  </ul>
                )}
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech) => (
                    <Badge
                      className="rounded-full"
                      key={tech}
                      variant="secondary"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
