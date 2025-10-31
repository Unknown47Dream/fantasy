export interface Dota2GameDetails {
  begin_at: string;
  complete: boolean;
  detailed_stats: boolean;
  end_at: string;
  finished: boolean;
  first_blood: null;
  forfeit: boolean;
  id: number;
  length: number;
  match: Match;
  match_id: number;
  players: null;
  position: number;
  status: string;
  teams: null;
  winner: Winner2;
  winner_type: string;
}

interface Winner2 {
  id: number;
  type: string;
}

interface Match {
  begin_at: string;
  detailed_stats: boolean;
  draw: boolean;
  end_at: string;
  forfeit: boolean;
  game_advantage: null;
  games: any[];
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
  winner: Winner;
  winner_id: number;
  winner_type: string;
}

interface Winner {
  acronym: string;
  id: number;
  image_url: null;
  location: null;
  modified_at: string;
  name: string;
  slug: string;
}

interface Tournament {
  begin_at: string;
  country: null;
  detailed_stats: boolean;
  end_at: string;
  has_bracket: boolean;
  id: number;
  league_id: number;
  live_supported: boolean;
  modified_at: string;
  name: string;
  prizepool: null;
  region: null;
  serie_id: number;
  slug: string;
  tier: null;
  type: null;
  winner_id: null;
  winner_type: string;
}

interface Serie {
  begin_at: string;
  end_at: string;
  full_name: string;
  id: number;
  league_id: number;
  modified_at: string;
  name: string;
  season: null;
  slug: string;
  winner_id: null;
  winner_type: null;
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
  location: null;
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
  image_url: string;
  modified_at: string;
  name: string;
  slug: string;
  url: null;
}
