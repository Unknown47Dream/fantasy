export interface SeriesTournament {
  id: number;
  name: string;
  type: string;
  matches: Match[];
  country: null;
  begin_at: string;
  detailed_stats: boolean;
  end_at: string;
  winner_id: number | null;
  teams: Team[];
  slug: string;
  winner_type: string;
  serie_id: number;
  serie: Serie;
  videogame: Videogame;
  modified_at: string;
  league_id: number;
  league: League;
  prizepool: null;
  tier: string;
  videogame_title: null;
  has_bracket: boolean;
  region: string;
  live_supported: boolean;
  expected_roster: Expectedroster[];
}

interface Expectedroster {
  team: Team;
  players: Player[];
}

interface Player {
  active: boolean;
  id: number;
  name: string;
  role: string;
  slug: string;
  modified_at: string;
  age: null | number;
  birthday: null | string;
  first_name: null | string;
  last_name: null | string;
  nationality: null | string;
  image_url: null | string;
}

interface League {
  id: number;
  name: string;
  url: null;
  slug: string;
  modified_at: string;
  image_url: string;
}

interface Videogame {
  id: number;
  name: string;
  slug: string;
}

interface Serie {
  id: number;
  name: string;
  year: number;
  begin_at: string;
  end_at: string;
  winner_id: null;
  slug: string;
  winner_type: string;
  modified_at: string;
  league_id: number;
  season: null;
  full_name: string;
}

interface Team {
  id: number;
  name: string;
  location: string;
  slug: string;
  modified_at: string;
  acronym: null | string;
  image_url: null | string;
}

interface Match {
  id: number;
  name: string;
  status: string;
  live: Live;
  begin_at: string;
  detailed_stats: boolean;
  draw: boolean;
  end_at: null;
  forfeit: boolean;
  winner_id: null;
  slug: string;
  winner_type: string;
  tournament_id: number;
  modified_at: string;
  match_type: string;
  number_of_games: number;
  scheduled_at: string;
  original_scheduled_at: string;
  game_advantage: null;
  streams_list: Streamslist[];
  rescheduled: boolean;
}

interface Streamslist {
  main: boolean;
  language: string;
  embed_url: string;
  official: boolean;
  raw_url: string;
}

interface Live {
  supported: boolean;
  url: null;
  opens_at: null;
}
