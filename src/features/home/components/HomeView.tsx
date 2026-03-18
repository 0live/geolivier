import { Page } from "@/shared/types/Page";
import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router";

export function HomeView() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col flex-1 items-center justify-center md:px-6">
        <div className="mx-auto max-w-[800px] space-y-4 text-lg text-muted-foreground sm:text-xl text-left md:text-center">
          <p className="font-semibold text-foreground text-xl md:text-2xl">
            {t("home.greeting")}
          </p>
          <p>{t("home.description1")}</p>
          <p>
            <Trans 
              i18nKey="home.description2"
              components={{
                1: <Link to={`/${Page.Projects}`} className="text-primary hover:underline font-semibold" />,
                2: <Link to={`/${Page.Blog}`} className="text-primary hover:underline font-semibold" />,
                3: <Link to={`/${Page.About}`} className="text-primary hover:underline font-semibold" />
              }}
            />
          </p>
          <p className="italic text-primary font-medium">
            {t("home.hiring_status")}
          </p>

          <div className="pt-8 space-y-4">
            <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground/70">
              {t("home.working_with")}
            </p>
            <div className="flex flex-wrap gap-3 justify-start md:justify-center">
              {[
                "React",
                "Maplibre",
                "FastApi",
                "Martin",
                "PostGIS",
                "Cloud native formats",
              ].map((tech) => (
                <span
                  key={tech}
                  className="text-[11px] tracking-widest font-bold border border-accent/80 text-accent-foreground px-3 py-1 rounded-sm shadow-sm bg-accent/45"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
    </div>
  );
}
