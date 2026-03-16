import { useTranslation } from "react-i18next";

export type LayerId = "poi" | "buildings";

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
      style={{ background: "rgba(0,0,0,0.45)", zIndex: 10 }}
    >
      <span className="text-xs font-semibold text-white/70 mb-0.5">
        {t("demo.map.layers.title")}
      </span>
      {LAYERS.map(({ id, labelKey }) => {
        const active = visibleLayers.has(id);
        return (
          <button
            key={id}
            onClick={() => onToggle(id)}
            className="flex items-center gap-2 text-xs font-medium text-white transition-opacity"
            style={{ opacity: active ? 1 : 0.4 }}
          >
            {/* Color swatch */}
            <span
              className="inline-block rounded-sm flex-shrink-0"
              style={{
                width: 10,
                height: 10,
                background: id === "poi" ? "#80001e" : "#218f9c",
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
