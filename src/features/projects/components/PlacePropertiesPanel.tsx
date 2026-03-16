import { X } from "lucide-react";
import { useTranslation } from "react-i18next";

type PlaceProperties = Record<string, string | number | boolean | null>;

interface PlacePropertiesPanelProps {
  properties: PlaceProperties | null;
  onClose: () => void;
}

export function PlacePropertiesPanel({ properties, onClose }: PlacePropertiesPanelProps) {
  const { t } = useTranslation();

  const entries = properties ? Object.entries(properties).filter(([, v]) => v !== null) : [];

  return (
    <div
      className="absolute top-0 right-0 h-full w-72 bg-white/90 shadow-xl flex flex-col"
      style={{
        backdropFilter: "blur(6px)",
        transform: properties ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.3s ease",
        // Ensure the panel sits above map controls
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
