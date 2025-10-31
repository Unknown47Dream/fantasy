export interface Dota2Player {
  active: boolean;
  age: null;
  birthday: null;
  current_team: Currentteam;
  current_videogame: Currentvideogame;
  first_name: null;
  id: number;
  image_url: null;
  last_name: null;
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
  acronym: string;
  id: number;
  image_url: string;
  location: string;
  modified_at: string;
  name: string;
  slug: string;
}
