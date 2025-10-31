export interface Dota2TeamSeriesStats {
  acronym: string;
  id: number;
  image_url: string;
  last_games: Lastgame[];
  location: string;
  modified_at: string;
  most_banned: Mostbanned[];
  most_banned_against: Mostbanned[];
  most_picked: Mostpicked[];
  name: string;
  players: any[];
  slug: string;
  stats: Stats;
  videogame: Videogame;
}

interface Stats {
  averages: Averages;
  games_count: number;
  serie: Serie;
  totals: Totals;
}

interface Totals {
  assists: number;
  deaths: number;
  dire_games_lost: number;
  dire_games_won: number;
  games_lost: number;
  games_played: number;
  games_won: number;
  kills: number;
  matches_draw: number;
  matches_lost: number;
  matches_played: number;
  matches_won: number;
  observer_wards_destroyed: number;
  observer_wards_placed: number;
  radiant_games_lost: number;
  radiant_games_won: number;
  roshan_kills: null;
  sentry_wards_destroyed: number;
  sentry_wards_placed: number;
  tower_kills: number;
}

interface Serie {
  begin_at: string;
  end_at: string;
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
  winner_id: number;
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
  end_at: string;
  has_bracket: boolean;
  id: number;
  league_id: number;
  live_supported: boolean;
  modified_at: string;
  name: string;
  prizepool: null | string;
  region: null;
  serie_id: number;
  slug: string;
  tier: null;
  type: null;
  winner_id: number;
  winner_type: string;
}

interface League {
  id: number;
  image_url: string;
  modified_at: string;
  name: string;
  slug: string;
  url: string;
}

interface Averages {
  assists: number;
  barracks: number;
  camps_stacked: number;
  creeps_stacked: number;
  damage_taken: null;
  deaths: number;
  denies: number;
  game_length: number;
  gold_per_min: number;
  gold_spent: number;
  heal: number;
  hero_damage: number;
  kills: number;
  lane_creep: number;
  last_hits: number;
  net_worth: null;
  neutral_creep: number;
  observer_used: number;
  observer_wards_destroyed: number;
  observer_wards_purchased: number;
  ratios: Ratios;
  roshan_kills: null;
  sentry_used: number;
  sentry_wards_destroyed: number;
  sentry_wards_purchased: number;
  tower_damage: number;
  tower_kills: number;
  xp_per_min: number;
}

interface Ratios {
  first_barracks: null;
  first_blood: number;
  first_roshan: number;
  first_to_10_kills: number;
  first_to_15_kills: number;
  first_to_5_kills: number;
  first_tower: number;
  win: number;
}

interface Mostpicked {
  count: number;
  games_lost: number;
  games_won: number;
  name: string;
}

interface Mostbanned {
  count: number;
  name: string;
}

interface Lastgame {
  begin_at: string;
  complete: boolean;
  detailed_stats: boolean;
  end_at: string;
  finished: boolean;
  first_blood: null;
  forfeit: boolean;
  id: number;
  length: number;
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
  roshan_kills: null;
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
  first_name: null | string;
  id: number;
  image_url: null | string;
  last_name: null | string;
  modified_at: string;
  name: string;
  nationality: null | string;
  role: null | string;
  slug: string;
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

interface Item {
  id: number;
  image_url: string;
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
