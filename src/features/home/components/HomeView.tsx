import { Page } from "@/types/Page";
import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router";

export function HomeView() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center space-y-8 py-12 px-4 md:px-6">
      <div className="space-y-6 text-center">
        {/* <h1 className="text-4xl font-extrabold tracking-tighter text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
          {t("home.title")}
        </h1> */}
        <div className="mx-auto max-w-[800px] space-y-4 text-lg text-muted-foreground sm:text-xl text-left md:text-center mt-8">
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
        </div>
      </div>
    </div>
  );
}
