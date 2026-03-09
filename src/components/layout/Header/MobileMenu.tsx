import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/ui/ThemeToggl";
import { Menu } from "lucide-react";
import { LanguageSelector } from "../LanguageSelector";
import { NavLinks } from "./NavLinks";
import { SocialLinks } from "./SocialLinks";

export function MobileMenu() {
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
