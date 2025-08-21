export interface Feature {
  id: string;
  name: string;
  description?: string | null;
  icon_path: string;
}

export interface NewFeature {
  name: string;
  description?: string | null;
  icon_path: string;
}
