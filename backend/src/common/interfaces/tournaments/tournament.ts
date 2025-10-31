export interface Tournament {
  id: number;
  name: string;
  type: string;
  matches: (Match | Matches2 | Matches3 | Matches4 | Matches5)[];
  country: string;
  begin_at: string;
  detailed_stats: boolean;
  end_at: string;
  winner_id: null;
  winner_type: string;
  teams: (Team | Teams2 | Teams3)[];
  slug: string;
  serie_id: number;
  serie: Serie;
  videogame: Videogame;
  modified_at: string;
  league_id: number;
  league: League;
  prizepool: null | string;
  tier: string;
  videogame_title: Videogametitle | null;
  has_bracket: boolean;
  region: string;
  live_supported: boolean;
  expected_roster: (
    | Expectedroster
    | Expectedroster2
    | Expectedroster3
    | Expectedroster4
    | Expectedroster5
    | Expectedroster6
    | Expectedroster7
    | Expectedroster8
    | Expectedroster9
    | Expectedroster10
    | Expectedroster11
  )[];
}

interface Expectedroster11 {
  team: Teams2;
  players: Player10[];
}

interface Player10 {
  active: boolean;
  id: number;
  name: string;
  role: null;
  slug: string;
  modified_at: string;
  age: number;
  birthday: string;
  first_name: string;
  last_name: string;
  nationality: string;
  image_url: null | string;
}

interface Expectedroster10 {
  team: Teams2;
  players: Player9[];
}

interface Player9 {
  active: boolean;
  id: number;
  name: string;
  role: null;
  slug: string;
  modified_at: string;
  age: null | number;
  birthday: null | string;
  first_name: null | string;
  last_name: null | string;
  nationality: string;
  image_url: null | string;
}

interface Expectedroster9 {
  team: Teams2;
  players: Player8[];
}

interface Player8 {
  active: boolean;
  id: number;
  name: string;
  role: string;
  slug: string;
  modified_at: string;
  age: number;
  birthday: string;
  first_name: string;
  last_name: string;
  nationality: string;
  image_url: string;
}

interface Expectedroster8 {
  team: Teams2;
  players: Player7[];
}

interface Player7 {
  active: boolean;
  id: number;
  name: string;
  role: null;
  slug: string;
  modified_at: string;
  age: number;
  birthday: null | string;
  first_name: string;
  last_name: string;
  nationality: string;
  image_url: null | string;
}

interface Expectedroster7 {
  team: Team;
  players: Player6[];
}

interface Player6 {
  active: boolean;
  id: number;
  name: string;
  role: null | string;
  slug: string;
  modified_at: string;
  age: null | number;
  birthday: null | string;
  first_name: null | string;
  last_name: null | string;
  nationality: string;
  image_url: null | string;
}

interface Expectedroster6 {
  team: Teams2;
  players: Player5[];
}

interface Player5 {
  active: boolean;
  id: number;
  name: string;
  role: null;
  slug: string;
  modified_at: string;
  age: number;
  birthday: null | string;
  first_name: string;
  last_name: string;
  nationality: string;
  image_url: null | string;
}

interface Expectedroster5 {
  team: Teams2;
  players: Player4[];
}

interface Player4 {
  active: boolean;
  id: number;
  name: string;
  role: null;
  slug: string;
  modified_at: string;
  age: number;
  birthday: string;
  first_name: string;
  last_name: string;
  nationality: string;
  image_url: null | string;
}

interface Expectedroster4 {
  team: Teams3;
  players: any[];
}

interface Expectedroster3 {
  team: Teams3;
  players: Player3[];
}

interface Player3 {
  active: boolean;
  id: number;
  name: string;
  role: null | string;
  slug: string;
  modified_at: string;
  age: null | number;
  birthday: null | string;
  first_name: null | string;
  last_name: null | string;
  nationality: string;
  image_url: null | string;
}

interface Expectedroster2 {
  team: Teams3;
  players: Player2[];
}

interface Player2 {
  active: boolean;
  id: number;
  name: string;
  role: null | string;
  slug: string;
  modified_at: string;
  age: null | number;
  birthday: null | string;
  first_name: null | string;
  last_name: null | string;
  nationality: string;
  image_url: null | string;
}

interface Expectedroster {
  team: Teams2;
  players: Player[];
}

interface Player {
  active: boolean;
  id: number;
  name: string;
  role: null;
  slug: string;
  modified_at: string;
  age: null | number;
  birthday: null | string;
  first_name: null | string;
  last_name: null | string;
  nationality: string;
  image_url: null | string;
}

interface Videogametitle {
  id: number;
  name: string;
  slug: string;
  videogame_id: number;
}

interface League {
  id: number;
  name: string;
  url: null;
  slug: string;
  modified_at: string;
  image_url: null | string;
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
  winner_type: string;
  slug: string;
  modified_at: string;
  league_id: number;
  season: null | string;
  full_name: string;
}

interface Teams3 {
  id: number;
  name: string;
  location: null | string;
  slug: string;
  modified_at: string;
  acronym: string;
  image_url: string;
}

interface Teams2 {
  id: number;
  name: string;
  location: string;
  slug: string;
  modified_at: string;
  acronym: string;
  image_url: string;
}

interface Team {
  id: number;
  name: string;
  location: null | string;
  slug: string;
  modified_at: string;
  acronym: null | string;
  image_url: string;
}

interface Matches5 {
  id: number;
  name: string;
  status: string;
  live: Live3;
  begin_at: string;
  detailed_stats: boolean;
  end_at: null;
  forfeit: boolean;
  winner_id: null;
  winner_type: string;
  draw: boolean;
  slug: string;
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

interface Matches4 {
  id: number;
  name: string;
  status: string;
  live: Live;
  begin_at: string;
  detailed_stats: boolean;
  end_at: null;
  forfeit: boolean;
  winner_id: null;
  winner_type: string;
  draw: boolean;
  slug: string;
  tournament_id: number;
  modified_at: string;
  match_type: string;
  number_of_games: number;
  scheduled_at: string;
  original_scheduled_at: string;
  game_advantage: null;
  streams_list: Streamslist2[];
  rescheduled: boolean;
}

interface Matches3 {
  id: number;
  name: string;
  status: string;
  live: Live3;
  begin_at: string;
  detailed_stats: boolean;
  end_at: null;
  forfeit: boolean;
  winner_id: null;
  winner_type: string;
  draw: boolean;
  slug: string;
  tournament_id: number;
  modified_at: string;
  match_type: string;
  number_of_games: number;
  scheduled_at: string;
  original_scheduled_at: string;
  game_advantage: null;
  streams_list: Streamslist2[];
  rescheduled: boolean;
}

interface Streamslist2 {
  main: boolean;
  language: string;
  embed_url: null;
  official: boolean;
  raw_url: string;
}

interface Live3 {
  supported: boolean;
  url: string;
  opens_at: string;
}

interface Matches2 {
  id: number;
  name: string;
  status: string;
  live: Live2;
  begin_at: null | string;
  detailed_stats: boolean;
  end_at: null;
  forfeit: boolean;
  winner_id: null;
  winner_type: string;
  draw: boolean;
  slug: string;
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

interface Live2 {
  supported: boolean;
  url: string;
  opens_at: null | string;
}

interface Match {
  id: number;
  name: string;
  status: string;
  live: Live;
  begin_at: string;
  detailed_stats: boolean;
  end_at: null;
  forfeit: boolean;
  winner_id: null;
  winner_type: string;
  draw: boolean;
  slug: string;
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
