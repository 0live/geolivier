import { useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  CLICK_MIN_ZOOM,
  MAP_BADGE_BG,
  MAP_OVERLAY_BG,
  MAP_UI_COLOR,
} from "../constants/map.constants";
import { useMapInstance } from "../hooks/useMapInstance";
import { useMapInteractions } from "../hooks/useMapInteractions";
import { useMapLayers } from "../hooks/useMapLayers";
import { LayerSelector } from "./LayerSelector";
import { PlacePropertiesPanel } from "./PlacePropertiesPanel";

export function DemoMdxMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const { mapRef, isLoading } = useMapInstance(containerRef);
  const { visibleLayers, handleLayerToggle } = useMapLayers(mapRef);
  const {
    zoomLevel,
    selectedFeatures,
    featureIndex,
    setSelectedFeatures,
    setFeatureIndex,
  } = useMapInteractions(mapRef);

  return (
    <div
      style={{ width: "100%", height: "400px" }}
      className="relative rounded-lg overflow-hidden my-4"
    >
      <div ref={containerRef} style={{ width: "100%", height: "100%" }} />

      {/* Loading overlay */}
      {isLoading && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-3"
          style={{ background: MAP_OVERLAY_BG, backdropFilter: "blur(4px)" }}
        >
          <span
            className="block rounded-full border-4 border-transparent animate-spin"
            style={{
              width: 36,
              height: 36,
              borderTopColor: MAP_UI_COLOR,
              borderRightColor: `${MAP_UI_COLOR}66`,
            }}
          />
          <span className="text-sm font-medium" style={{ color: MAP_UI_COLOR }}>
            {t("demo.map.loading")}
          </span>
        </div>
      )}

      {/* Zoom level badge + hint — top-left corner */}
      <div className="absolute top-2 left-2 flex flex-col gap-1" style={{ zIndex: 10 }}>
        <div
          className="px-2 py-1 rounded text-xs font-mono font-semibold text-white"
          style={{ background: MAP_BADGE_BG }}
        >
          z {zoomLevel.toFixed(2)}
        </div>
        <div
          className="px-2 py-1 rounded text-xs font-semibold text-white"
          style={{
            background: MAP_BADGE_BG,
            maxWidth: 200,
            opacity: zoomLevel < CLICK_MIN_ZOOM ? 1 : 0,
            transform: zoomLevel < CLICK_MIN_ZOOM ? "translateY(0)" : "translateY(-6px)",
            transition: "opacity 0.25s ease, transform 0.25s ease",
            pointerEvents: "none",
          }}
        >
          {t("demo.map.zoomHint")}
        </div>
      </div>

      {/* Layer selector — bottom-left */}
      <LayerSelector visibleLayers={visibleLayers} onToggle={handleLayerToggle} />

      {/* Feature properties side panel */}
      <PlacePropertiesPanel
        features={selectedFeatures}
        currentIndex={featureIndex}
        onPrev={() => setFeatureIndex((i) => Math.max(0, i - 1))}
        onNext={() => setFeatureIndex((i) => Math.min(selectedFeatures.length - 1, i + 1))}
        onClose={() => setSelectedFeatures([])}
      />
    </div>
  );
}
