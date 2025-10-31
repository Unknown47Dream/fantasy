export interface Dota2Tournament {
  begin_at: string;
  country: null;
  detailed_stats: boolean;
  end_at: null;
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

interface Match {
  begin_at: string;
  detailed_stats: boolean;
  draw: boolean;
  end_at: null | string;
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
  streams_list: any[];
  tournament_id: number;
  winner_id: null | number;
  winner_type: string;
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

interface Expectedroster {
  players: Player[];
  team: Team;
}

interface Team {
  acronym: null | string;
  id: number;
  image_url: null | string;
  location: null | string;
  modified_at: string;
  name: string;
  slug: string;
}

interface Player {
  active: boolean;
  age: null | number;
  birthday: null | string;
  first_name: null | string;
  id: number;
  image_url: null;
  last_name: null | string;
  modified_at: string;
  name: string;
  nationality: null | string;
  role: null | string;
  slug: string;
}
