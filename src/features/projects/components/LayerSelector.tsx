import { useTranslation } from "react-i18next";
import {
  MAP_BADGE_BG,
  MAP_PRIMARY_COLOR,
  MAP_SECONDARY_COLOR,
} from "../constants/map.constants";
import type { LayerId } from "../types";

interface LayerSelectorProps {
  visibleLayers: Set<LayerId>;
  onToggle: (layer: LayerId) => void;
}

const LAYERS: { id: LayerId; labelKey: string }[] = [
  { id: "poi", labelKey: "demo.map.layers.poi" },
  { id: "buildings", labelKey: "demo.map.layers.buildings" },
];

export function LayerSelector({ visibleLayers, onToggle }: LayerSelectorProps) {
  const { t } = useTranslation();

  return (
    <div
      className="absolute bottom-6 left-2 flex flex-col gap-1 p-2 rounded"
      style={{ background: MAP_BADGE_BG, zIndex: 10 }}
    >
      <span className="text-xs font-semibold text-white/70 mb-0.5">
        {t("demo.map.layers.title")}
      </span>
      {LAYERS.map(({ id, labelKey }) => {
        const active = visibleLayers.has(id);
        const color = id === "poi" ? MAP_PRIMARY_COLOR : MAP_SECONDARY_COLOR;

        return (
          <button
            key={id}
            onClick={() => onToggle(id)}
            className="cursor-pointer flex items-center gap-2 text-xs font-medium text-white transition-opacity"
            style={{ opacity: active ? 1 : 0.4 }}
          >
            {/* Color swatch */}
            <span
              className="inline-block rounded-sm flex-shrink-0"
              style={{
                width: 10,
                height: 10,
                background: color,
                opacity: active ? 1 : 0.4,
              }}
            />
            {t(labelKey)}
          </button>
        );
      })}
    </div>
  );
}
