import { useTranslation } from "react-i18next";

export function HomeView() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center space-y-8 py-12 px-4 md:px-6">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-extrabold tracking-tighter text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
          {t("home.title")}
        </h1>
        <p className="mx-auto max-w-[700px] text-lg text-muted-foreground sm:text-xl">
          {t("home.subtitle")}
        </p>
      </div>
    </div>
  );
}
