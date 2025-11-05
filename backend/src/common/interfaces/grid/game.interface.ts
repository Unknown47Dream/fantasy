export interface Game {
  id: string;
  name: string;
  slug: string;
  shortName?: string;
  displayName: string;
  isActive: boolean;
  category?: string;
  coverImage?: string;
  backgroundImage?: string;
  description?: string;
}

export interface GamesResponse {
  games: Game[];
}
