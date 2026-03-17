import { useTranslation } from "react-i18next";
import type { Experience } from "../types";

export function useTimeline() {
  const { t } = useTranslation();

  const experiences: Experience[] = [
    {
      title: t("about.experience.0.title"),
      company: t("about.experience.0.company"),
      period: t("about.experience.0.period"),
      description: t("about.experience.0.description"),
      technologies: ["Vue.js", "Symfony", "Maplibre/Mapbox", "D3.js", "AWS", "PostgreSQL", "ESRI", "DevOps", "Supabase"],
    },
    {
      title: t("about.experience.1.title"),
      company: t("about.experience.1.company"),
      period: t("about.experience.1.period"),
      description: t("about.experience.1.description"),
      technologies: ["jQuery", "Leaflet", "PostgreSQL", "Python", "QGIS"],
    },
    {
      title: t("about.experience.2.title"),
      company: t("about.experience.2.company"),
      period: t("about.experience.2.period"),
      description: t("about.experience.2.description"),
      technologies: ["QGIS", "ArcGIS", "ArcPy"],
    },
  ];

  return { experiences };
}
