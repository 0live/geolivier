import { useTranslation } from "react-i18next";

/** Animated badge indicating a project is currently in progress. */
export function WipBadge() {
  const { t } = useTranslation();

  return (
    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase text-emerald-400 border border-emerald-500/40 bg-emerald-500/10 px-2 py-0.5 rounded-full">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 animate-pulse-dot" />
      </span>
      {t("projects.wip")}
    </span>
  );
}
