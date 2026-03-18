import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/ui/sheet";
import { ThemeToggle } from "@/shared/components/ui/ThemeToggl";
import { Download, Menu } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/shared/components/ui/button";
import { LanguageSelector } from "../LanguageSelector";
import { NavLinks } from "./NavLinks";
import { SocialLinks } from "./SocialLinks";

export function MobileMenu() {
  const { t, i18n } = useTranslation();
  const cvPath = i18n.language === "fr" 
    ? "/src/shared/assets/Olivier_Ribiere_CV_FR.pdf" 
    : "/src/shared/assets/Olivier_Ribiere_CV_EN.pdf";

  return (
    <div className="flex md:hidden items-center">
      <Sheet>
        <SheetTrigger asChild>
          <button 
            className="p-2 mr-[-8px] text-muted-foreground hover:text-foreground"
            aria-label="Open Mobile Menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[80vw] sm:w-[350px]">
          <div className="sr-only">
            <SheetTitle>Mobile Navigation Menu</SheetTitle>
          </div>

          <div className="flex flex-col gap-4 mt-4 ml-4">
            <div className="flex flex-col gap-4">
              <NavLinks baseClass="text-lg" />
            </div>

            <div className="pt-2">
              <a href={cvPath} download className="w-full">
                <Button variant="outline" className="w-full gap-2 justify-start mt-2">
                  <Download className="h-4 w-4" />
                  {t("nav.download_cv")}
                </Button>
              </a>
            </div>
            
            <div className="flex items-center gap-6 pt-6 border-t">
              <SocialLinks iconSizeClass="h-6 w-6" />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <LanguageSelector />
              <ThemeToggle />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
