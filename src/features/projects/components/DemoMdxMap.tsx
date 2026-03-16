import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Protocol } from "pmtiles";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { LayerSelector, type LayerId } from "./LayerSelector";
import { PlacePropertiesPanel, type MapFeature } from "./PlacePropertiesPanel";

const POSITRON_STYLE_URL = "https://tiles.openfreemap.org/styles/positron";
const PLACES_PMTILES_URL =
  "https://overturemaps-tiles-us-west-2-beta.s3.amazonaws.com/2024-08-20/places.pmtiles";
const BUILDINGS_PMTILES_URL =
  "https://overturemaps-tiles-us-west-2-beta.s3.amazonaws.com/2024-08-20/buildings.pmtiles";

// Register the pmtiles:// protocol once so MapLibre can resolve PMTiles sources.
const pmtilesProtocol = new Protocol();
maplibregl.addProtocol("pmtiles", pmtilesProtocol.tile);

type FeatureProperties = Record<string, string | number | boolean | null>;

// MapLibre layer IDs grouped by logical layer.
const LAYER_MAP: Record<LayerId, string[]> = {
  poi: ["places-circles"],
  buildings: ["buildings", "buildings-fill"],
};

// Maps a MapLibre layer ID to its i18n label key.
const LAYER_LABEL_KEY: Record<string, string> = {
  "places-circles": "demo.map.layers.poi",
  "buildings": "demo.map.layers.buildings",
  "buildings-fill": "demo.map.layers.buildings",
};

const CLICK_MIN_ZOOM = 14;
// All clickable layer IDs (order determines priority in multi-feature results).
const CLICKABLE_LAYERS = ["places-circles", "buildings", "buildings-fill"];

export function DemoMdxMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  // zoomRef gives click/hover handlers always-fresh zoom without stale closure.
  const zoomRef = useRef(0.5);
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(0.5);
  const [visibleLayers, setVisibleLayers] = useState<Set<LayerId>>(
    new Set(["poi", "buildings"]),
  );

  // Multi-feature panel state.
  const [selectedFeatures, setSelectedFeatures] = useState<MapFeature[]>([]);
  const [featureIndex, setFeatureIndex] = useState(0);

  // Toggle a logical layer group on/off via MapLibre visibility property.
  const handleLayerToggle = useCallback((layer: LayerId) => {
    const map = mapRef.current;
    if (!map) return;

    setVisibleLayers((prev) => {
      const next = new Set(prev);
      const nowVisible = !next.has(layer);
      nowVisible ? next.add(layer) : next.delete(layer);

      const visibility = nowVisible ? "visible" : "none";
      LAYER_MAP[layer].forEach((id) => {
        if (map.getLayer(id)) map.setLayoutProperty(id, "visibility", visibility);
      });

      return next;
    });
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: POSITRON_STYLE_URL,
      center: [2.3, 46.6],
      zoom: 0.5,
      attributionControl: {},
    });

    mapRef.current = map;
    map.addControl(new maplibregl.NavigationControl(), "top-right");

    // Sync zoom indicator and auto-close panel below threshold.
    map.on("zoom", () => {
      const z = map.getZoom();
      zoomRef.current = z;
      setZoomLevel(z);
      if (z < CLICK_MIN_ZOOM) setSelectedFeatures([]);
    });

    map.on("load", () => {
      // ── POI ──────────────────────────────────────────────────
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
          "circle-color": "#80001eff",
          "circle-opacity": [
            "interpolate", ["linear"], ["zoom"],
            0, 0.2, 12, 0.3, 16, 0.5,
          ],
          "circle-stroke-width": 0,
        },
      });

      // ── Buildings ─────────────────────────────────────────────
      map.addSource("overture-buildings", {
        type: "vector",
        url: `pmtiles://${BUILDINGS_PMTILES_URL}`,
      });

      map.addLayer({
        id: "buildings",
        type: "line",
        source: "overture-buildings",
        "source-layer": "building",
        minzoom: 10,
        paint: {
          "line-color": "#218f9ca1",
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
          "fill-color": "#218f9ca1",
          "fill-opacity": 0.3,
        },
      });

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

      map.on("idle", () => setIsLoading(false));
    });

    return () => {
      mapRef.current = null;
      map.remove();
    };
  }, []);

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
          style={{ background: "rgba(255,255,255,0.55)", backdropFilter: "blur(4px)" }}
        >
          <span
            className="block rounded-full border-4 border-transparent animate-spin"
            style={{
              width: 36,
              height: 36,
              borderTopColor: "#800080",
              borderRightColor: "#80008066",
            }}
          />
          <span className="text-sm font-medium" style={{ color: "#800080" }}>
            {t("demo.map.loading")}
          </span>
        </div>
      )}

      {/* Zoom level badge + hint — top-left corner */}
      <div className="absolute top-2 left-2 flex flex-col gap-1" style={{ zIndex: 10 }}>
        <div
          className="px-2 py-1 rounded text-xs font-mono font-semibold text-white"
          style={{ background: "rgba(0,0,0,0.45)" }}
        >
          z {zoomLevel.toFixed(2)}
        </div>
        <div
          className="px-2 py-1 rounded text-xs font-semibold text-white"
          style={{
            background: "rgba(0,0,0,0.45)",
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
