import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Protocol } from "pmtiles";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { PlacePropertiesPanel } from "./PlacePropertiesPanel";

const POSITRON_STYLE_URL = "https://tiles.openfreemap.org/styles/positron";
const PLACES_PMTILES_URL =
  "https://overturemaps-tiles-us-west-2-beta.s3.amazonaws.com/2024-08-20/places.pmtiles";

// Register the pmtiles:// protocol once so MapLibre can resolve PMTiles sources.
const pmtilesProtocol = new Protocol();
maplibregl.addProtocol("pmtiles", pmtilesProtocol.tile);

type PlaceProperties = Record<string, string | number | boolean | null>;

export function DemoMdxMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  // zoomRef gives the click handler always-fresh access without a stale closure.
  const zoomRef = useRef(0.5);
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProperties, setSelectedProperties] = useState<PlaceProperties | null>(null);
  const [zoomLevel, setZoomLevel] = useState(0.5);

  const CLICK_MIN_ZOOM = 14;

  useEffect(() => {
    if (!containerRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: POSITRON_STYLE_URL,
      center: [2.3, 46.6],
      zoom: 0.5,
      attributionControl: {},
    });

    map.addControl(new maplibregl.NavigationControl(), "top-right");

    // Sync zoom level indicator on every camera move.
    map.on("zoom", () => {
      const z = map.getZoom();
      zoomRef.current = z;
      setZoomLevel(z);
      // Auto-close the panel when the user zooms below the interaction threshold.
      if (z < CLICK_MIN_ZOOM) setSelectedProperties(null);
    });

    map.on("load", () => {
      // Add the Overture Maps places PMTiles as a vector tile source.
      map.addSource("overture-places", {
        type: "vector",
        url: `pmtiles://${PLACES_PMTILES_URL}`,
      });

      // Render each place as a small purple circle with 50% opacity.
      map.addLayer({
        id: "places-circles",
        type: "circle",
        source: "overture-places",
        "source-layer": "place",
        paint: {
          "circle-radius": [
            "interpolate",
            ["linear"],
            ["zoom"],
            0, 2,
            14, 4,
          ],
          "circle-color": "#80001eff",
          "circle-opacity": 0.2,
          "circle-stroke-width": 0,
        },
      });

      // Show pointer cursor on hover only when zoom allows interaction.
      map.on("mouseenter", "places-circles", () => {
        if (zoomRef.current >= CLICK_MIN_ZOOM)
          map.getCanvas().style.cursor = "pointer";
      });
      map.on("mouseleave", "places-circles", () => {
        map.getCanvas().style.cursor = "";
      });

      // Open the properties panel on click — gated by zoom level.
      map.on("click", "places-circles", (e) => {
        if (zoomRef.current < CLICK_MIN_ZOOM) return;
        const feature = e.features?.[0];
        if (!feature?.properties) return;
        setSelectedProperties(feature.properties as PlaceProperties);
      });

      // Hide the loader once the PMTiles source tiles are rendered for the first time.
      map.on("idle", () => setIsLoading(false));
    });

    return () => {
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

      {/* Feature properties side panel */}
      <PlacePropertiesPanel
        properties={selectedProperties}
        onClose={() => setSelectedProperties(null)}
      />
    </div>
  );
}
