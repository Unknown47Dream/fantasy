export interface PlayerLeague {
  id: number;
  image_url: null;
  modified_at: string;
  name: string;
  series: Series[];
  slug: string;
  url: null;
  videogame: Videogame;
}

interface Videogame {
  current_version: string;
  id: number;
  name: string;
  slug: string;
}

interface Series {
  begin_at: string;
  end_at: string;
  full_name: string;
  id: number;
  league_id: number;
  modified_at: string;
  name: null;
  season: string;
  slug: string;
  winner_id: null;
  winner_type: null;
  year: number;
}
