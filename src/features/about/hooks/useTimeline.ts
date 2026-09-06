import { useTranslation } from "react-i18next";
import type { Experience } from "../types";

export function useTimeline() {
  const { t } = useTranslation();

  const experiences: Experience[] = [
    {
      title: t("about.experience.0.title"),
      company: t("about.experience.0.company"),
      period: t("about.experience.0.period"),
      type: "work",
      tagline: t("about.experience.0.tagline"),
      description: t("about.experience.0.description"),
      technologies: ["Django", "QGIS Server", "QField", "Python", "PostGIS", "Docker"],
    },
    {
      title: t("about.experience.1.title"),
      company: t("about.experience.1.company"),
      period: t("about.experience.1.period"),
      type: "work",
      tagline: t("about.experience.1.tagline"),
      highlights: t("about.experience.1.highlights", { returnObjects: true }) as string[],
      technologies: ["Vue.js", "Symfony", "FastAPI", "React", "Maplibre/Mapbox", "D3.js", "AWS", "Azure", "ArcGIS Enterprise", "Gitlab CI/CD", "Github Actions", "Docker", "Supabase", "Tippecanoe", "TileServer GL", "QGIS Server", "Caddy"],
    },
    {
      title: t("about.experience.2.title"),
      company: t("about.experience.2.company"),
      period: t("about.experience.2.period"),
      type: "work",
      tagline: t("about.experience.2.tagline"),
      highlights: t("about.experience.2.highlights", { returnObjects: true }) as string[],
      technologies: ["jQuery", "GeoExt","Leaflet", "PostgreSQL", "Python", "PHP", "QGIS", "FME", "GDAL", "Cesium", "Google Earth", "MapServer", "Nginx"],
    },
    {
      title: t("about.experience.3.title"),
      company: t("about.experience.3.company"),
      period: t("about.experience.3.period"),
      type: "work",
      description: t("about.experience.3.description"),
      technologies: ["ArcGIS", "GeoExt", "GeoServer"],
    },
    {
      title: t("about.experience.4.title"),
      company: t("about.experience.4.company"),
      period: t("about.experience.4.period"),
      type: "education",
      description: t("about.experience.4.description"),
      technologies: ["PHP", "PostgreSQL", "ArcGIS", "Python", "QGIS"],
    },
    {
      title: t("about.experience.5.title"),
      company: t("about.experience.5.company"),
      period: t("about.experience.5.period"),
      type: "education",
      description: t("about.experience.5.description"),
      technologies: ["QGIS", "FME", "Remote Sensing"],
    },
  ];

  return { experiences };
}
