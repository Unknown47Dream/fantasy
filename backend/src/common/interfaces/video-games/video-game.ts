export interface VideoGame {
  current_version: null;
  id: number;
  leagues: League[];
  name: string;
  slug: string;
}

interface League {
  id: number;
  image_url: string;
  modified_at: string;
  name: string;
  series: Series[];
  slug: string;
  url: null | string;
}

interface Series {
  begin_at: string;
  end_at: null | string;
  full_name: string;
  id: number;
  league_id: number;
  modified_at: string;
  name: null | string;
  season: null | string;
  slug: string;
  winner_id: null | number;
  winner_type: null | string;
  year: number;
}
