import { Page } from "@/shared/types/Page";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router";

interface NavLinksProps {
  baseClass: string;
}

export function NavLinks({ baseClass }: NavLinksProps) {
  const { t } = useTranslation();

  return (
    <>
      {Object.values(Page).map((page) => (
        <NavLink 
          key={page}
          to={`/${page}`} 
          className={({ isActive }) => 
            `${baseClass} font-medium hover:underline transition-colors ${
              isActive ? "text-primary" : "text-muted-foreground"
            }`
          }
        >
          {t(`nav.${page}`)}
        </NavLink>
      ))}
    </>
  );
}
