# Grid.gg API Interfaces

This folder contains TypeScript interfaces for the Grid.gg GraphQL API integration.

## Files

### `title.interface.ts`

- `Title` - Interface for individual game/title data
- `TitlesResponse` - Response wrapper for titles queries

### `game.interface.ts`

- `Game` - Interface for game data (alternative to Title)
- `GamesResponse` - Response wrapper for games queries

### `tournament.interface.ts`

- `Tournament` - Interface for tournament data
- `TournamentGame` - Nested interface for game data within tournaments
- `Organizer` - Interface for tournament organizer data
- `Location` - Interface for tournament location data
- `TournamentsResponse` - Response wrapper for tournaments queries

### `index.ts`

- Barrel export file that re-exports all interfaces

## Usage

```typescript
import { Title, TitlesResponse } from '../common/interfaces/grid';

// Or import specific interfaces
import {
  Tournament,
  TournamentsResponse,
} from '../common/interfaces/grid/tournament.interface';
```

## API Endpoints

- **GET** `/api/grid/titles` - Returns `TitlesResponse`
- **GET** `/api/grid/titles/:id` - Returns `{ title: Title }`
- **GET** `/api/grid/tournaments` - Returns tournament data (schema TBD)
