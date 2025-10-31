export interface Player {
  active: boolean;
  age: null;
  birthday: null;
  current_team: null;
  current_videogame: Currentvideogame;
  first_name: null;
  id: number;
  image_url: null;
  last_name: null;
  modified_at: string;
  name: string;
  nationality: null;
  role: null;
  slug: string;
}

interface Currentvideogame {
  id: number;
  name: string;
  slug: string;
}
