import "@/config/i18n"; // Import i18n configuration
import { QueryProvider } from "./QueryProvider";
import { ThemeProvider } from "./ThemeProvider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <ThemeProvider defaultTheme="dark" storageKey="geolivier-theme">
        {children}
      </ThemeProvider>
    </QueryProvider>
  );
}
