import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ui/ThemeToggl";
import { MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";

export function AboutView() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen w-full flex-col bg-background selection:bg-primary/10">
      <header className="border-b bg-card">
        <div className="flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center">
            <MapPin className="h-5 w-5 text-primary" strokeWidth={2.5} />
            <span className="text-lg ml-2 font-bold tracking-tight text-foreground">
              Geolivier
            </span>
          </div>
          <ThemeToggle />
        </div>
      </header>
      <main className="flex flex-1 flex-col items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>About Feature</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold">{t("hello")}</p>
            <p className="text-muted-foreground mt-4">
              This is a demonstration of the vertical slice architecture.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
