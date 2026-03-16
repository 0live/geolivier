import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Protocol } from "pmtiles";
import { useEffect, useRef } from "react";

const POSITRON_STYLE_URL = "https://tiles.openfreemap.org/styles/positron";
const PLACES_PMTILES_URL =
  "https://overturemaps-tiles-us-west-2-beta.s3.amazonaws.com/2024-08-20/places.pmtiles";

// Register the pmtiles:// protocol once so MapLibre can resolve PMTiles sources.
const pmtilesProtocol = new Protocol();
maplibregl.addProtocol("pmtiles", pmtilesProtocol.tile);

export function DemoMdxMap() {
  const containerRef = useRef<HTMLDivElement>(null);

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
          "circle-radius": 2,
          "circle-color": "#80001eff",
          "circle-opacity": 0.2,
          "circle-stroke-width": 0,
        },
      });
    });

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "400px" }}
      className="rounded-lg overflow-hidden my-4"
    />
  );
}
