import { Icons } from "@/components/ui/icons";
import { ThemeToggle } from "@/components/ui/ThemeToggl";
import { Page } from "@/types/Page";
import { MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link, NavLink } from "react-router";
import { LanguageSelector } from "./LanguageSelector";

export function Header() {
  const { t } = useTranslation();

  return (
    <header className="border-b bg-card">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <span className="flex items-center text-lg font-bold tracking-tight text-foreground">
              ge
              <MapPin className="h-[0.85em] w-[0.85em] mx-[0.5px] text-primary" strokeWidth={3} />
              livier
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <nav className="flex items-center gap-4 mr-10">
            {Object.values(Page).map((page) => (
              <NavLink 
                key={page}
                to={`/${page}`} 
                className={({ isActive }) => 
                  `text-sm font-medium hover:underline transition-colors ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`
                }
              >
                {t(`nav.${page}`)}
              </NavLink>
            ))}
          </nav>
          
          <div className="flex items-center gap-4 border-r pr-4 mr-2">
            <a 
              href="https://github.com/0live" 
              target="_blank" 
              rel="noreferrer" 
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Icons.github className="h-5 w-5" />
            </a>
            <a 
              href="https://linkedin.com/in/olivier-ribiere" 
              target="_blank" 
              rel="noreferrer" 
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <Icons.linkedin className="h-5 w-5" />
            </a>
          </div>

          <LanguageSelector />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
