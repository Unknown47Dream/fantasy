import { Match } from './match';

export interface GroupMatch {
  gameId: number;
  gameName: string;
  leagues: { id: number; name: string; matches: Match[] }[];
  text?: string;
}
