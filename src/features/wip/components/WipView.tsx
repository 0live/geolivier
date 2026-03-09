import { Spinner } from "@/shared/components/ui/spinner";
import { Wrench } from "lucide-react";
import { useTranslation } from "react-i18next";

interface WipHomepageProps {
  title?: string;
  subtitle?: string;
  expectedLaunch?: string;
}

export function WipView({
  title,
  subtitle,
  expectedLaunch,
}: WipHomepageProps) {
  const { t } = useTranslation();

  const displayTitle = title ?? t("wip.title");
  const displaySubtitle = subtitle ?? t("wip.subtitle");
  const displayExpectedLaunch = expectedLaunch ?? t("wip.expectedLaunch");
  return (
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
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-extrabold tracking-tighter text-foreground sm:text-5xl md:text-6xl">
          {displayTitle}
        </h1>
        <p className="mx-auto max-w-175 text-lg text-muted-foreground sm:text-xl">
          {displaySubtitle}
        </p>
      </div>

      {/* Optional Launch Date */}
      {displayExpectedLaunch && (
        <div className="mt-8 mx-auto w-fit rounded-full border bg-card px-4 py-1.5 text-sm font-medium text-muted-foreground shadow-sm">
          {t("wip.estimatedLaunchPrefix")}
          <span className="text-foreground">{displayExpectedLaunch}</span>
        </div>
      )}
    </div>
  );
}
