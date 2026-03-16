export interface ProjectMeta {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  year: number;
  repoUrl?: string;
  liveUrl?: string;
  publicationUrl?: string;
}

export type LayerId = "poi" | "buildings";

export type FeatureProperties = Record<string, string | number | boolean | null>;

export type MapFeature = {
  properties: FeatureProperties;
  layerLabel: string;
};
