import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import Timeline from "./Timeline";

export function AboutView() {
  const { t } = useTranslation();

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
    <div className="flex flex-col w-full max-w-4xl">
      <div className="flex flex-col gap-4 text-justify">
        <span className="text-2xl font-bold">{t("about.title")}</span>
        <p>{formatText(t("about.description1"))}</p>
        <p>{formatText(t("about.description2"))}</p>
        <p>{formatText(t("about.description3"))}</p>
        <p>{formatText(t("about.description4"))}</p>
        <p>{formatText(t("about.description5"))}</p>
      </div>
      <Timeline />
    </div>
  );
}
