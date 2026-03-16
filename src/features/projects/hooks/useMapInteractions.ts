import type maplibregl from "maplibre-gl";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { CLICKABLE_LAYERS, CLICK_MIN_ZOOM, DEFAULT_ZOOM, LAYER_LABEL_KEY } from "../constants/map.constants";
import type { FeatureProperties, MapFeature } from "../types";

export function useMapInteractions(mapRef: React.RefObject<maplibregl.Map | null>) {
  const { t } = useTranslation();
  const zoomRef = useRef(DEFAULT_ZOOM);
  const [zoomLevel, setZoomLevel] = useState(DEFAULT_ZOOM);
  
  const [selectedFeatures, setSelectedFeatures] = useState<MapFeature[]>([]);
  const [featureIndex, setFeatureIndex] = useState(0);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const handleZoom = () => {
      const z = map.getZoom();
      zoomRef.current = z;
      setZoomLevel(z);
      if (z < CLICK_MIN_ZOOM) setSelectedFeatures([]);
    };

    map.on("zoom", handleZoom);

    const setupInteractions = () => {
      // ── Interactions ──────────────────────────────────────────
      CLICKABLE_LAYERS.forEach((layerId) => {
        map.on("mouseenter", layerId, () => {
          if (zoomRef.current >= CLICK_MIN_ZOOM)
            map.getCanvas().style.cursor = "pointer";
        });
        map.on("mouseleave", layerId, () => {
          map.getCanvas().style.cursor = "";
        });
      });

      // Unified click: collect all features from all clickable layers at the point.
      map.on("click", (e) => {
        if (zoomRef.current < CLICK_MIN_ZOOM) return;

        const features = map.queryRenderedFeatures(e.point, {
          layers: CLICKABLE_LAYERS.filter((id) => map.getLayer(id)),
        });

        if (!features.length) return;

        const mapped: MapFeature[] = features
          .map((f) => ({
            properties: f.properties as FeatureProperties,
            layerLabel: t(LAYER_LABEL_KEY[f.layer.id] ?? f.layer.id),
          }))
          .filter((f) => f.properties != null);

        if (!mapped.length) return;

        setSelectedFeatures(mapped);
        setFeatureIndex(0);
      });
    };

    if (map.loaded()) {
      setupInteractions();
    } else {
      map.on("load", setupInteractions);
    }

    return () => {
      map.off("zoom", handleZoom);
      map.off("load", setupInteractions);
    };
  }, [mapRef, t]);

  return { zoomLevel, selectedFeatures, featureIndex, setSelectedFeatures, setFeatureIndex };
}
