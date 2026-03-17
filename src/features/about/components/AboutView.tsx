import { useTranslation } from "react-i18next";
import Timeline from "./Timeline";

export function AboutView() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col w-full max-w-4xl">
      <div className="flex flex-col gap-4 text-justify">
        <span className="text-2xl font-bold">{t("about.title")}</span>
        <p>{t("about.description1")}</p>
        <p>{t("about.description2")}</p>
        <p>{t("about.description3")}</p>
        <p>{t("about.description4")}</p>
        <p>{t("about.description5")}</p>
      </div>
      <Timeline />
    </div>
  );
}
