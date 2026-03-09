import { Button } from "@/shared/components/ui/button";
import { useI18n } from "@/app/providers/I18nProvider";
import { Globe } from "lucide-react";

export function LanguageSelector() {
  const { locale, setLocale } = useI18n();

  const toggleLanguage = () => {
    const newLocale = locale === "fr" ? "en" : "fr";
    setLocale(newLocale);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className="w-9 px-0"
      onClick={toggleLanguage}
    >
      <Globe className="h-[1.2rem] w-[1.2rem] mr-1 hidden sm:block" />
      <span className="text-xs font-bold uppercase">
        {locale}
      </span>
    </Button>
  );
}
