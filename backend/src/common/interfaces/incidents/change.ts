export interface Change {
  change_type: string;
  id: number;
  modified_at: string;
  object: Object;
  type: string;
}

interface Object {
  active: boolean;
  age: number;
  birthday: string;
  current_team: Currentteam;
  current_videogame: Currentvideogame;
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

interface Currentteam {
  acronym: null;
  id: number;
  image_url: null;
  location: string;
  modified_at: string;
  name: string;
  slug: string;
}
