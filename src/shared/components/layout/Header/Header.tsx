import { ThemeToggle } from "@/shared/components/ui/ThemeToggl";
import { Download, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { Button } from "@/shared/components/ui/button";
import { LanguageSelector } from "../LanguageSelector";
import { MobileMenu } from "./MobileMenu";
import { NavLinks } from "./NavLinks";
import { SocialLinks } from "./SocialLinks";
import cvEn from "@/shared/assets/Olivier_Ribiere_CV_EN.pdf";
import cvFr from "@/shared/assets/Olivier_Ribiere_CV_FR.pdf";

const Logo = () => (
  <Link to="/" className="flex items-center">
    <span className="flex items-center text-lg font-bold tracking-tight text-foreground">
      ge
      <MapPin className="h-[0.85em] w-[0.85em] mx-[0.5px] text-primary" strokeWidth={3} />
      livier
    </span>
  </Link>
);



export function Header() {
  const { t, i18n } = useTranslation();
  const cvPath = i18n.language === "fr" ? cvFr : cvEn;

  return (
    <header className="border-b bg-card">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center">
          <Logo />
        </div>

        {/* Desktop Navigation & Actions */}
        <div className="hidden md:flex items-center gap-4">
          <nav className="flex items-center gap-4 mr-10">
            <NavLinks baseClass="text-sm" />
          </nav>
          
          <div className="flex items-center gap-4 border-r pr-4 mr-2">
            <SocialLinks />
          </div>

          <a href={cvPath} download>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              {t("nav.download_cv")}
            </Button>
          </a>

          <LanguageSelector />
          <ThemeToggle />
        </div>

        {/* Mobile Navigation (Sheet) */}
        <MobileMenu />
      </div>
    </header>
  );
}
