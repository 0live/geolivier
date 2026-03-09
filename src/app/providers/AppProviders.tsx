import "@/app/config/i18n"; // Import i18n configuration
import { I18nProvider } from "./I18nProvider";
import { QueryProvider } from "./QueryProvider";
import { ThemeProvider } from "./ThemeProvider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <I18nProvider defaultLocale="en" storageKey="geolivier-locale">
        <ThemeProvider defaultTheme="dark" storageKey="geolivier-theme">
          {children}
        </ThemeProvider>
      </I18nProvider>
    </QueryProvider>
  );
}
