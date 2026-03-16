import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useTranslation } from "react-i18next";

type FeatureProperties = Record<string, string | number | boolean | null>;

export type MapFeature = {
  properties: FeatureProperties;
  layerLabel: string;
};

interface PlacePropertiesPanelProps {
  features: MapFeature[];
  currentIndex: number;
  onPrev: () => void;
  onNext: () => void;
  onClose: () => void;
}

export function PlacePropertiesPanel({
  features,
  currentIndex,
  onPrev,
  onNext,
  onClose,
}: PlacePropertiesPanelProps) {
  const { t } = useTranslation();

  const isOpen = features.length > 0;
  const current = features[currentIndex] ?? null;
  const properties = current?.properties ?? null;
  const layerLabel = current?.layerLabel ?? "";
  const entries = properties ? Object.entries(properties).filter(([, v]) => v !== null) : [];
  const hasMany = features.length > 1;

  return (
    <div
      className="absolute top-0 right-0 h-full w-72 bg-white/90 shadow-xl flex flex-col"
      style={{
        backdropFilter: "blur(6px)",
        transform: isOpen ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.3s ease",
        zIndex: 10,
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <span className="text-sm font-semibold text-gray-700">
          {t("demo.map.panel.title")}
        </span>
        <button
          onClick={onClose}
          aria-label={t("demo.map.panel.close")}
          className="rounded-md p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      {/* Multi-feature navigator */}
      {hasMany && (
        <div className="flex items-center justify-between px-3 py-1.5 border-b border-gray-100 bg-gray-50">
          <button
            onClick={onPrev}
            aria-label={t("demo.map.panel.prev")}
            className="rounded p-1 text-gray-500 hover:bg-gray-200 disabled:opacity-30 transition-colors"
            disabled={currentIndex === 0}
          >
            <ChevronLeft size={14} />
          </button>
          <span className="text-xs text-gray-500 font-medium tabular-nums">
            {currentIndex + 1} / {features.length}
          </span>
          <button
            onClick={onNext}
            aria-label={t("demo.map.panel.next")}
            className="rounded p-1 text-gray-500 hover:bg-gray-200 disabled:opacity-30 transition-colors"
            disabled={currentIndex === features.length - 1}
          >
            <ChevronRight size={14} />
          </button>
        </div>
      )}

      {/* Layer label */}
      {layerLabel && (
        <div className="flex justify-center px-4 pt-2 pb-1">
          <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">
            {layerLabel}
          </span>
        </div>
      )}

      {/* Properties table */}
      <div className="flex-1 overflow-y-auto">
        <table className="w-full text-xs">
          <tbody>
            {entries.map(([key, value]) => (
              <tr key={key} className="border-b border-gray-100 last:border-0">
                <td className="px-4 py-2 font-medium text-gray-500 align-top w-1/3 break-all">
                  {key}
                </td>
                <td className="px-4 py-2 text-gray-800 align-top break-all">
                  {String(value)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
