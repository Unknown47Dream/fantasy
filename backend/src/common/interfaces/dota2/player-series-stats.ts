export interface Dota2PlayerSeriesStats {
  active: boolean;
  age: number;
  birthday: string;
  current_team: null;
  current_videogame: Currentvideogame;
  favorite_heroes: Favoritehero[];
  first_name: string;
  id: number;
  image_url: string;
  last_games: Lastgame[];
  last_name: string;
  modified_at: string;
  name: string;
  nationality: string;
  role: string;
  slug: string;
  stats: Stats;
  teams: Opponent[];
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
  videogame: Currentvideogame;
  videogame_title: null;
  winner_id: number;
  winner_type: string;
  year: number;
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
  winner_id: null | number;
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

interface Averages {
  assists: number;
  camps_stacked: number;
  camps_stacked_per_minute: number;
  creeps_stacked: number;
  creeps_stacked_per_minute: number;
  crowd_control_per_minute: number;
  damage_taken: null;
  deaths: number;
  denies: number;
  denies_per_minute: number;
  gold_per_minute: number;
  gold_percentage: number;
  heal: number;
  hero_damage: number;
  hero_damage_per_minute: number;
  hero_damage_percentage: number;
  hero_healing_per_minute: number;
  kill_participation: number;
  kills: number;
  lane_creep: number;
  last_hits: number;
  last_hits_per_minute: number;
  net_worth: null;
  neutral_creep: number;
  observer_wards_destroyed: number;
  observer_wards_placed: number;
  observer_wards_purchased: number;
  sentry_wards_destroyed: number;
  sentry_wards_placed: number;
  sentry_wards_purchased: number;
  tower_damage: number;
  tower_damage_per_minute: number;
  tower_kills: number;
  wards_placed: number;
  wards_placed_per_minute: number;
  xp_per_minute: number;
}

interface Lastgame {
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
  gold_remaining: number;
  gold_spent: number;
  heal: number;
  hero: Hero;
  hero_damage: number;
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
  team_id: number;
  tower_damage: number;
  tower_kills: number;
  xp_per_min: number;
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

interface Opponent {
  acronym: string;
  id: number;
  image_url: string;
  location: null | string;
  modified_at: string;
  name: string;
  slug: string;
}

interface Item {
  id: number;
  image_url: string;
  name: string;
}

interface Ability {
  id: number;
  image_url: string;
  level: number;
  name: string;
}

interface Favoritehero {
  games_count: number;
  games_lost: number;
  games_won: number;
  hero: Hero;
  most_used_items: Mostuseditem[];
}

interface Mostuseditem {
  count: number;
  id: number;
  name: string;
}

interface Hero {
  id: number;
  image_url: string;
  localized_name: string;
  name: string;
}

interface Currentvideogame {
  id: number;
  name: string;
  slug: string;
}
