import type maplibregl from "maplibre-gl";
import { useCallback, useEffect, useState } from "react";
import {
  BUILDINGS_PMTILES_URL,
  LAYER_MAP,
  MAP_PRIMARY_COLOR,
  MAP_SECONDARY_COLOR,
  PLACES_PMTILES_URL,
} from "../constants/map.constants";
import type { LayerId } from "../types";

export function useMapLayers(mapRef: React.RefObject<maplibregl.Map | null>) {
  const [visibleLayers, setVisibleLayers] = useState<Set<LayerId>>(
    new Set(["poi", "buildings"])
  );

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const setupLayers = () => {
      // ── POI ──────────────────────────────────────────────────
      if (!map.getSource("overture-places")) {
        map.addSource("overture-places", {
          type: "vector",
          url: `pmtiles://${PLACES_PMTILES_URL}`,
        });

        map.addLayer({
          id: "places-circles",
          type: "circle",
          source: "overture-places",
          "source-layer": "place",
          paint: {
            "circle-radius": [
              "interpolate", ["linear"], ["zoom"],
              0, 2, 14, 4,
            ],
            "circle-color": MAP_PRIMARY_COLOR,
            "circle-opacity": [
              "interpolate", ["linear"], ["zoom"],
              0, 0.2, 12, 0.3, 16, 0.5,
            ],
            "circle-stroke-width": 0,
          },
        });
      }

      // ── Buildings ─────────────────────────────────────────────
      if (!map.getSource("overture-buildings")) {
        map.addSource("overture-buildings", {
          type: "vector",
          url: `pmtiles://${BUILDINGS_PMTILES_URL}`,
        });

        const buildingColor = `${MAP_SECONDARY_COLOR}a1`;

        map.addLayer({
          id: "buildings",
          type: "line",
          source: "overture-buildings",
          "source-layer": "building",
          minzoom: 10,
          paint: {
            "line-color": buildingColor,
            "line-width": [
              "interpolate", ["linear"], ["zoom"],
              10, 0.5, 14, 1, 16, 2,
            ],
          },
        });

        map.addLayer({
          id: "buildings-fill",
          type: "fill",
          source: "overture-buildings",
          "source-layer": "building",
          minzoom: 15,
          paint: {
            "fill-color": buildingColor,
            "fill-opacity": 0.3,
          },
        });
      }
    };

    if (map.loaded()) {
      setupLayers();
    } else {
      map.on("load", setupLayers);
    }

    return () => {
      map.off("load", setupLayers);
    };
  }, [mapRef]);

  // Toggle a logical layer group on/off via MapLibre visibility property.
  const handleLayerToggle = useCallback((layer: LayerId) => {
    const map = mapRef.current;
    if (!map) return;

    setVisibleLayers((prev) => {
      const next = new Set(prev);
      const nowVisible = !next.has(layer);
      
      if (nowVisible) {
        next.add(layer);
      } else {
        next.delete(layer);
      }

      const visibility = nowVisible ? "visible" : "none";
      LAYER_MAP[layer].forEach((id) => {
        if (map.getLayer(id)) map.setLayoutProperty(id, "visibility", visibility);
      });

      return next;
    });
  }, [mapRef]);

  return { visibleLayers, handleLayerToggle };
}
