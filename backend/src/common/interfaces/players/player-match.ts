export interface PlayerMatch {
  begin_at: string;
  detailed_stats: boolean;
  draw: boolean;
  end_at: null;
  forfeit: boolean;
  game_advantage: null;
  games: Game[];
  id: number;
  league: League;
  league_id: number;
  live: Live;
  match_type: string;
  modified_at: string;
  name: string;
  number_of_games: number;
  opponents: Opponent2[];
  original_scheduled_at: string;
  rescheduled: boolean;
  results: Result[];
  scheduled_at: string;
  serie: Serie;
  serie_id: number;
  slug: string;
  status: string;
  streams_list: any[];
  tournament: Tournament;
  tournament_id: number;
  videogame: Videogame;
  videogame_title: null;
  videogame_version: null;
  winner: null;
  winner_id: null;
  winner_type: string;
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

interface Serie {
  begin_at: string;
  end_at: null;
  full_name: string;
  id: number;
  league_id: number;
  modified_at: string;
  name: string;
  season: null;
  slug: string;
  winner_id: null;
  winner_type: string;
  year: number;
}

interface Result {
  score: number;
  team_id: number;
}

interface Opponent2 {
  opponent: Opponent;
  type: string;
}

interface Opponent {
  acronym: string;
  id: number;
  image_url: null | string;
  location: string;
  modified_at: string;
  name: string;
  slug: string;
}

interface Live {
  opens_at: null;
  supported: boolean;
  url: null;
}

interface League {
  id: number;
  image_url: null;
  modified_at: string;
  name: string;
  slug: string;
  url: null;
}

interface Game {
  begin_at: null;
  complete: boolean;
  detailed_stats: boolean;
  end_at: null;
  finished: boolean;
  forfeit: boolean;
  id: number;
  length: null;
  match_id: number;
  position: number;
  status: string;
  winner: Winner;
  winner_type: string;
}

interface Winner {
  id: null;
  type: string;
}
