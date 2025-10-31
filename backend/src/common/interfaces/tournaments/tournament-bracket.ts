export interface TournamentBracket {
  id: number;
  name: string;
  status: string;
  results: any[];
  live: Live;
  begin_at: string;
  detailed_stats: boolean;
  end_at: null;
  forfeit: boolean;
  winner_id: null;
  winner_type: string;
  draw: boolean;
  slug: string;
  modified_at: string;
  tournament_id: number;
  match_type: string;
  number_of_games: number;
  scheduled_at: string;
  opponents: any[];
  previous_matches: Previousmatch[];
  games: Game[];
  original_scheduled_at: string;
  game_advantage: null;
  streams_list: Streamslist[];
}

interface Streamslist {
  main: boolean;
  language: string;
  embed_url: string;
  official: boolean;
  raw_url: string;
}

interface Game {
  complete: boolean;
  id: number;
  position: number;
  status: string;
  length: null;
  finished: boolean;
  begin_at: null;
  detailed_stats: boolean;
  end_at: null;
  forfeit: boolean;
  match_id: number;
  winner_type: string;
  winner: Winner;
}

interface Winner {
  id: null;
  type: string;
}

interface Previousmatch {
  type: string;
  match_id: number;
}

interface Live {
  supported: boolean;
  url: null;
  opens_at: null;
}
