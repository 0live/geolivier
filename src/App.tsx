import { Wrench, MapPin } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { ThemeToggle } from "./components/theme/ThemeToggl";

interface WipHomepageProps {
  brandName?: string;
  title?: string;
  subtitle?: string;
  expectedLaunch?: string;
}

export default function App({
  brandName = "Geolivier",
  title = "Work in progress",
  subtitle = "We're currently building something amazing.",
  expectedLaunch = "Tomorrow, kind off",
}: WipHomepageProps) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background selection:bg-primary/10">
      <header className="border-b bg-card">
        <div className="flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center">
            <MapPin className="h-5 w-5 text-primary" strokeWidth={2.5} />
            <span className="text-lg ml-2 font-bold tracking-tight text-foreground">
              {brandName}
            </span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content Area (centered) */}
      <main className="flex flex-1 flex-col items-center justify-center px-4 text-center md:px-6">
        <div className="max-w-xl space-y-12">
          {/* Visual Section: Spinner & Icon */}
          <div className="relative flex items-center justify-center">
            {/* The Spinner surrounds the main icon, subtle effect */}
            <Spinner className="absolute h-24 w-24 text-primary/20" />

            {/* Main construction icon (modern, muted bg) */}
            <div className="relative z-10 rounded-full border bg-muted/50 p-6 shadow-inner">
              <Wrench className="h-12 w-12 text-primary" strokeWidth={1} />
            </div>
          </div>

          {/* Text Section */}
          <div className="space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tighter text-foreground sm:text-5xl md:text-6xl">
              {title}
            </h1>
            <p className="mx-auto max-w-175 text-lg text-muted-foreground sm:text-xl">
              {subtitle}
            </p>
          </div>

          {/* Optional Launch Date */}
          {expectedLaunch && (
            <div className="mt-8 rounded-full border bg-card px-4 py-1.5 text-sm font-medium text-muted-foreground shadow-sm">
              Estimated Launch:{" "}
              <span className="text-foreground">{expectedLaunch}</span>
            </div>
          )}
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="flex border-t bg-card py-6 items-center justify-center">
        <div className="container px-4 text-center text-sm text-muted-foreground md:px-6">
          © {new Date().getFullYear()} {brandName}. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
