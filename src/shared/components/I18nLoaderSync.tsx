import i18n from "@/app/config/i18n";
import { useEffect } from "react";
import { useLocation, useRevalidator } from "react-router";

const REVALIDATION_ROUTES = ["/projects", "/blog"] as const;

/**
 * Bridges i18next language changes with React Router loaders.
 * When the language changes and the user is on a route that uses
 * locale-dependent loaders, triggers a revalidation to refresh data.
 */
export function I18nLoaderSync() {
  const revalidator = useRevalidator();
  const { pathname } = useLocation();

  useEffect(() => {
    const handleLanguageChanged = () => {
      const shouldRevalidate = REVALIDATION_ROUTES.some((route) =>
        pathname.startsWith(route)
      );
      if (shouldRevalidate) {
        revalidator.revalidate();
      }
    };

    i18n.on("languageChanged", handleLanguageChanged);
    return () => {
      i18n.off("languageChanged", handleLanguageChanged);
    };
  }, [pathname, revalidator]);

  return null;
}
