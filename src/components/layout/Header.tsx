import { ThemeToggle } from "@/components/ui/ThemeToggl";
import { MapPin } from "lucide-react";
import { Link } from "react-router";

export function Header() {
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
          <Link to="/about" className="text-sm font-medium hover:underline text-muted-foreground">
            About
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
