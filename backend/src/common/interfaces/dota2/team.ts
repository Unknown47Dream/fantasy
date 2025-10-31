export interface Dota2Team {
  acronym: null;
  current_videogame: Currentvideogame;
  id: number;
  image_url: null;
  location: string;
  modified_at: string;
  name: string;
  players: any[];
  slug: string;
}

interface Currentvideogame {
  id: number;
  name: string;
  slug: string;
}
