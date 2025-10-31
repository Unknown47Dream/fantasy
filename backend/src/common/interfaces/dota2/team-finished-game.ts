export interface Dota2TeamFinishedGame {
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
  net_worth: number;
  neutral_creep: number;
  observer_used: number;
  observer_wards_destroyed: number;
  observer_wards_purchased: number;
  opponent: Opponent;
  player: Player;
  role: number;
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
