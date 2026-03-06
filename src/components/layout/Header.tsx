import { ThemeToggle } from "@/components/ui/ThemeToggl";
import { Page } from "@/types/Page";
import { MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { LanguageSelector } from "./LanguageSelector";

export function Header() {
  const { t } = useTranslation();

  return (
    <header className="border-b bg-card">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <MapPin className="h-5 w-5 text-primary" strokeWidth={2.5} />
            <span className="text-lg ml-2 font-bold tracking-tight text-foreground">
              geolivier
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <nav className="flex items-center gap-4 mr-10">
            {Object.values(Page).map((page) => (
              <Link 
                key={page}
                to={`/${page}`} 
                className="text-sm font-medium hover:underline text-muted-foreground"
              >
                {t(`nav.${page}`)}
              </Link>
            ))}
          </nav>
          <LanguageSelector />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
