export interface PlayerSeries {
  begin_at: string;
  end_at: null;
  full_name: string;
  id: number;
  league: League;
  league_id: number;
  modified_at: string;
  name: string;
  season: null;
  slug: string;
  tournaments: Tournament[];
  videogame: Videogame;
  videogame_title: null;
  winner_id: null;
  winner_type: string;
  year: number;
}

interface Videogame {
  id: number;
  name: string;
  slug: string;
}

interface Tournament {
  begin_at: string;
  country: null;
  detailed_stats: boolean;
  end_at: null;
  has_bracket: boolean;
  id: number;
  league_id: number;
  live_supported: boolean;
  modified_at: string;
  name: string;
  prizepool: null;
  region: string;
  serie_id: number;
  slug: string;
  tier: string;
  type: string;
  winner_id: null;
  winner_type: string;
}

interface League {
  id: number;
  image_url: null;
  modified_at: string;
  name: string;
  slug: string;
  url: null;
}
