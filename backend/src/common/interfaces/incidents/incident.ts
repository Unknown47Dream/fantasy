export interface Incident {
  change_type: string;
  id: number;
  modified_at: string;
  object: Object;
  type: string;
}

interface Object {
  acronym: null;
  current_videogame: Currentvideogame;
  id: number;
  image_url: null;
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
  image_url: null | string;
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
