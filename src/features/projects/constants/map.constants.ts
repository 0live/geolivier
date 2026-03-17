import type { LayerId } from "../types";

export const POSITRON_STYLE_URL = "https://tiles.openfreemap.org/styles/positron";
export const PLACES_PMTILES_URL =
  "https://overturemaps-tiles-us-west-2-beta.s3.amazonaws.com/2024-08-20/places.pmtiles";
export const BUILDINGS_PMTILES_URL =
  "https://overturemaps-tiles-us-west-2-beta.s3.amazonaws.com/2024-08-20/buildings.pmtiles";

// MapLibre layer IDs grouped by logical layer.
export const LAYER_MAP: Record<LayerId, string[]> = {
  poi: ["places-circles"],
  buildings: ["buildings", "buildings-fill"],
  building_part: ["building-part", "building-part-fill"],
};

// Maps a MapLibre layer ID to its i18n label key.
export const LAYER_LABEL_KEY: Record<string, string> = {
  "places-circles": "demo.map.layers.poi",
  "buildings": "demo.map.layers.buildings",
  "buildings-fill": "demo.map.layers.buildings",
  "building-part": "demo.map.layers.building_part",
  "building-part-fill": "demo.map.layers.building_part",
};

export const CLICK_MIN_ZOOM = 14;
// All clickable layer IDs (order determines priority in multi-feature results).
export const CLICKABLE_LAYERS = ["places-circles", "buildings", "buildings-fill", "building-part", "building-part-fill"];

export const DEFAULT_CENTER: [number, number] = [2.3, 46.6];
export const DEFAULT_ZOOM = 0.5;

// Colors
export const MAP_PRIMARY_COLOR = "#80001e"; 
export const MAP_SECONDARY_COLOR = "#218f9c"; 
export const MAP_TERTIARY_COLOR = "#facc15"; // Yellow
export const MAP_UI_COLOR = "#80001e"; 

export const MAP_OVERLAY_BG = "rgba(255,255,255,0.55)";
export const MAP_BADGE_BG = "rgba(0,0,0,0.45)";
