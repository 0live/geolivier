import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Protocol } from "pmtiles";
import { useEffect, useRef, useState } from "react";
import { DEFAULT_CENTER, DEFAULT_ZOOM, POSITRON_STYLE_URL } from "../constants/map.constants";

// Register the pmtiles:// protocol once so MapLibre can resolve PMTiles sources.
const pmtilesProtocol = new Protocol();
maplibregl.addProtocol("pmtiles", pmtilesProtocol.tile);

export function useMapInstance(containerRef: React.RefObject<HTMLDivElement | null>) {
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: POSITRON_STYLE_URL,
      center: DEFAULT_CENTER,
      zoom: DEFAULT_ZOOM,
      attributionControl: {},
    });

    mapRef.current = map;
    map.addControl(new maplibregl.NavigationControl(), "top-right");

    map.on("idle", () => setIsLoading(false));

    return () => {
      mapRef.current = null;
      map.remove();
    };
  }, [containerRef]);

  return { mapRef, isLoading };
}
