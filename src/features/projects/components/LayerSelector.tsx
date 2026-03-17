import { Checkbox } from "@/components/ui/checkbox";
import { useTranslation } from "react-i18next";
import {
  MAP_BADGE_BG,
  MAP_PRIMARY_COLOR,
  MAP_SECONDARY_COLOR,
  MAP_TERTIARY_COLOR,
} from "../constants/map.constants";
import type { LayerId } from "../types";

interface LayerSelectorProps {
  visibleLayers: Set<LayerId>;
  onToggle: (layer: LayerId) => void;
}

const LAYERS: { id: LayerId; labelKey: string }[] = [
  { id: "poi", labelKey: "demo.map.layers.poi" },
  { id: "buildings", labelKey: "demo.map.layers.buildings" },
  { id: "building_part", labelKey: "demo.map.layers.building_part" },
];

export function LayerSelector({ visibleLayers, onToggle }: LayerSelectorProps) {
  const { t } = useTranslation();

  return (
    <div
      className="absolute bottom-6 left-2 flex flex-col gap-2 p-3 rounded-lg border border-white/10 shadow-2xl transition-all duration-300"
      style={{ background: MAP_BADGE_BG, zIndex: 10, backdropFilter: "blur(8px)" }}
    >
      <span className="text-[10px] uppercase tracking-wider font-bold text-white/50 mb-1 px-1">
        {t("demo.map.layers.title")}
      </span>
      <div className="flex flex-col gap-1.5">
        {LAYERS.map(({ id, labelKey }) => {
          const active = visibleLayers.has(id);
          const color =
            id === "poi"
              ? MAP_PRIMARY_COLOR
              : id === "buildings"
              ? MAP_SECONDARY_COLOR
              : MAP_TERTIARY_COLOR;

          return (
            <label
              key={id}
              className="group flex items-center gap-3 px-1 py-0.5 rounded-md cursor-pointer hover:bg-white/5 transition-colors"
            >
              <Checkbox
                id={id}
                checked={active}
                onCheckedChange={() => onToggle(id)}
                className="size-3.5 border-white/30 data-[state=checked]:bg-white data-[state=checked]:border-white data-[state=checked]:text-black dark:data-[state=checked]:bg-white dark:data-[state=checked]:text-black"
                style={{
                  "--tw-ring-color": color,
                } as React.CSSProperties}
              />
              <div className="flex items-center gap-2 flex-1">
                {/* Color swatch */}
                <span
                  className="inline-block rounded-[2px] flex-shrink-0 shadow-sm"
                  style={{
                    width: 8,
                    height: 8,
                    background: color,
                    opacity: active ? 1 : 0.4,
                  }}
                />
                <span 
                  className="text-xs font-medium text-white/90 selection:bg-transparent transition-opacity"
                  style={{ opacity: active ? 1 : 0.6 }}
                >
                  {t(labelKey)}
                </span>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}
