export interface Dota2GameFrame {
  current_timestamp: number;
  dire_team: Direteam;
  radiant_team: Direteam;
}

interface Direteam {
  gold_advantage: number;
  id: number;
  name: string;
  players: Player[];
  xp_advantage: number;
}

interface Player {
  gold: number;
  hero: Hero;
  id: number;
  name: string;
  xp: number;
}

interface Hero {
  id: number;
  localized_name: string;
  name: string;
}
