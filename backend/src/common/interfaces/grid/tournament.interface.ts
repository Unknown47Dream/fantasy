export interface Organizer {
  id: string;
  name: string;
}

export interface Location {
  country: string;
  city: string;
}

export interface TournamentGame {
  id: string;
  name: string;
  displayName: string;
}

export interface Tournament {
  id: string;
  name: string;
  slug: string;
  startDate: string;
  endDate: string;
  status: string;
  prizePool?: number;
  game: TournamentGame;
  organizer?: Organizer;
  location?: Location;
}

export interface TournamentsResponse {
  tournaments: Tournament[];
}
