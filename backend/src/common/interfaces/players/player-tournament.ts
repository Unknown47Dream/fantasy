export interface PlayerTournament {
  begin_at: string;
  country: string;
  detailed_stats: boolean;
  end_at: string;
  expected_roster: Expectedroster[];
  has_bracket: boolean;
  id: number;
  league: League;
  league_id: number;
  live_supported: boolean;
  matches: Match[];
  modified_at: string;
  name: string;
  prizepool: null;
  region: string;
  serie: Serie;
  serie_id: number;
  slug: string;
  teams: Team[];
  tier: string;
  type: string;
  videogame: Videogame;
  videogame_title: null;
  winner_id: null;
  winner_type: string;
}

interface Videogame {
  id: number;
  name: string;
  slug: string;
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
  winner_type: string;
  year: number;
}

interface Match {
  begin_at: string;
  detailed_stats: boolean;
  draw: boolean;
  end_at: null;
  forfeit: boolean;
  game_advantage: null;
  id: number;
  live: Live;
  match_type: string;
  modified_at: string;
  name: string;
  number_of_games: number;
  original_scheduled_at: string;
  rescheduled: boolean;
  scheduled_at: string;
  slug: string;
  status: string;
  streams_list: Streamslist[];
  tournament_id: number;
  winner_id: null;
  winner_type: string;
}

interface Streamslist {
  embed_url: null | string;
  language: string;
  main: boolean;
  official: boolean;
  raw_url: string;
}

interface Live {
  opens_at: string;
  supported: boolean;
  url: string;
}

interface League {
  id: number;
  image_url: string;
  modified_at: string;
  name: string;
  slug: string;
  url: null;
}

interface Expectedroster {
  players: Player[];
  team: Team;
}

interface Team {
  acronym: string;
  id: number;
  image_url: string;
  location: string;
  modified_at: string;
  name: string;
  slug: string;
}

interface Player {
  active: boolean;
  age: number;
  birthday: string;
  first_name: string;
  id: number;
  image_url: string;
  last_name: string;
  modified_at: string;
  name: string;
  nationality: string;
  role: string;
  slug: string;
}
