export interface Dota2PlayerMatchStats {
  teams: Team[];
}

interface Team {
  id: number;
  name: string;
  players: Player[];
  slug: string;
}

interface Player {
  first_name: string;
  id: number;
  last_name: string;
  name: string;
  stats: Stats;
}

interface Stats {
  averages: Averages;
  games_count: number;
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
