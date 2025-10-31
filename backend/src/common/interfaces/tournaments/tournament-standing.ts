export interface TournamentStanding {
  last_match: Lastmatch;
  rank: number;
  team: Team;
  game_losses: number;
  game_ties: number;
  game_wins: number;
  losses: number;
  total: number;
  wins: number;
}

interface Team {
  acronym: string;
  id: number;
  image_url: string;
  location: string;
  modified_at: string;
  name: string;
  slug: string;
}

interface Lastmatch {
  begin_at: string;
  detailed_stats: boolean;
  draw: boolean;
  end_at: string;
  forfeit: boolean;
  game_advantage: null;
  id: number;
  live: Live;
  match_type: string;
  modified_at: string;
  name: string;
  number_of_games: number;
  original_scheduled_at: string;
  rescheduled: boolean;
  scheduled_at: string;
  slug: string;
  status: string;
  streams_list: any[];
  tournament_id: number;
  winner_id: null;
  winner_type: string;
}

interface Live {
  opens_at: string;
  supported: boolean;
  url: string;
}
