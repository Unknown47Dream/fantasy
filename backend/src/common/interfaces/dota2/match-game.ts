export interface Dota2MatchGame {
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
  players: Player2[];
  position: number;
  status: string;
  teams: Team[];
  winner: Winner;
  winner_type: string;
}

interface Winner {
  id: number;
  type: string;
}

interface Team {
  bans: number[];
  barracks_status: Barracksstatus;
  faction: string;
  first_blood: boolean;
  first_roshan: boolean;
  first_tower: boolean;
  picks: number[];
  player_ids: number[];
  roshan_kills: number;
  score: number;
  team: Opponent;
  tower_status: Towerstatus;
}

interface Towerstatus {
  ancient_bottom: boolean;
  ancient_top: boolean;
  bottom_tier_1: boolean;
  bottom_tier_2: boolean;
  bottom_tier_3: boolean;
  middle_tier_1: boolean;
  middle_tier_2: boolean;
  middle_tier_3: boolean;
  top_tier_1: boolean;
  top_tier_2: boolean;
  top_tier_3: boolean;
}

interface Barracksstatus {
  bottom_melee: boolean;
  bottom_ranged: boolean;
  middle_melee: boolean;
  middle_ranged: boolean;
  top_melee: boolean;
  top_ranged: boolean;
}

interface Player2 {
  abilities: Ability[];
  assists: number;
  camps_stacked: number;
  creeps_stacked: number;
  damage_taken: null;
  deaths: number;
  denies: number;
  faction: string;
  game_id: number;
  gold_per_min: number;
  gold_percentage: number;
  gold_remaining: number;
  gold_spent: number;
  heal: number;
  hero: Hero;
  hero_damage: number;
  hero_damage_percentage: number;
  hero_level: number;
  items: Item[];
  kills: number;
  lane_creep: number;
  last_hits: number;
  net_worth: null;
  neutral_creep: number;
  observer_used: number;
  observer_wards_destroyed: number;
  observer_wards_purchased: number;
  opponent: Opponent;
  player: Player;
  role: null;
  sentry_used: number;
  sentry_wards_destroyed: number;
  sentry_wards_purchased: number;
  team: Opponent;
  team_id: number;
  tower_damage: number;
  tower_kills: number;
  xp_per_min: number;
}

interface Player {
  active: boolean;
  age: null | number;
  birthday: null | string;
  first_name: string;
  id: number;
  image_url: null | string;
  last_name: string;
  modified_at: string;
  name: string;
  nationality: string;
  role: string;
  slug: string;
}

interface Item {
  id: number;
  image_url: null | string;
  name: string;
}

interface Hero {
  id: number;
  image_url: string;
  localized_name: string;
  name: string;
}

interface Ability {
  id: number;
  image_url: string;
  level: number;
  name: string;
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
  streams_list: Streamslist[];
  tournament: Tournament;
  tournament_id: number;
  winner: Opponent;
  winner_id: number;
  winner_type: string;
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
  prizepool: string;
  region: null;
  serie_id: number;
  slug: string;
  tier: string;
  type: null;
  winner_id: number;
  winner_type: string;
}

interface Streamslist {
  embed_url: string;
  language: string;
  main: boolean;
  official: boolean;
  raw_url: string;
}

interface Serie {
  begin_at: string;
  end_at: string;
  full_name: string;
  id: number;
  league_id: number;
  modified_at: string;
  name: string;
  season: string;
  slug: string;
  winner_id: number;
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
  image_url: string;
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
  image_url: string;
  modified_at: string;
  name: string;
  slug: string;
  url: null;
}
