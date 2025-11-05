export interface Title {
  id: string;
  name: string;
  slug?: string;
  shortName?: string;
  displayName?: string;
  isActive?: boolean;
  category?: string;
  coverImage?: string;
  backgroundImage?: string;
  description?: string;
}

export interface TitlesResponse {
  titles: Title[];
}
