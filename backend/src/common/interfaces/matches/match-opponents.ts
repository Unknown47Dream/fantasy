export interface MatchOpponents {
  opponent_type: string;
  opponents: Opponent[];
}

interface Opponent {
  acronym: string;
  current_videogame: Currentvideogame;
  id: number;
  image_url: string;
  location: string;
  modified_at: string;
  name: string;
  players: Player[];
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

interface Currentvideogame {
  id: number;
  name: string;
  slug: string;
}
