/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ability } from 'src/common/interfaces/dota2/ability';
import { Dota2GameDetails } from 'src/common/interfaces/dota2/game-details';
import { Dota2GameFrame } from 'src/common/interfaces/dota2/game-frame';
import { Dota2Hero } from 'src/common/interfaces/dota2/hero';
import { Dota2Item } from 'src/common/interfaces/dota2/item';
import { Dota2Match } from 'src/common/interfaces/dota2/match';
import { Dota2MatchGame } from 'src/common/interfaces/dota2/match-game';
import { Dota2PlayerMatchStats } from 'src/common/interfaces/dota2/player-match-stats';
import { Dota2PlayerSeriesStats } from 'src/common/interfaces/dota2/player-series-stats';
import { Dota2PlayerStats } from 'src/common/interfaces/dota2/player-stats';
import { Dota2PlayerTournamentStats } from 'src/common/interfaces/dota2/player-tournament-stats';
import { Dota2TeamFinishedGame } from 'src/common/interfaces/dota2/team-finished-game';
import { Dota2TeamSeriesStats } from 'src/common/interfaces/dota2/team-series-stats';
import { Dota2TeamStats } from 'src/common/interfaces/dota2/team-stats';
import { Dota2TeamTournamentStats } from 'src/common/interfaces/dota2/team-tournament-stats';
import { League } from 'src/common/interfaces/leagues/league';
import { Dota2Player } from 'src/common/interfaces/dota2/dota2-player';
import { Dota2Series } from 'src/common/interfaces/dota2/series';
import { Dota2SeriesTeam } from 'src/common/interfaces/dota2/series-team';
import { Dota2Team } from 'src/common/interfaces/dota2/team';
import { Dota2Tournament } from 'src/common/interfaces/dota2/tournament';

@Injectable()
export class Dota2Service {
  constructor(@Inject('PANDA_HTTP') private readonly http: HttpService) {}

  abilities(params?: any): Observable<Ability[]> {
    return this.http.get<Ability[]>(`/dota2/abilities`, { params }).pipe(
      map((res) => {
        return res.data;
      }),
    );
  }

  ability(idSlug: number | string, params?: any): Observable<Ability> {
    return this.http
      .get<Ability>(`/dota2/abilities/${idSlug}`, { params })
      .pipe(
        map((res) => {
          return res.data;
        }),
      );
  }

  gameDetails(
    idSlug: number | string,
    params?: any,
  ): Observable<Dota2GameDetails> {
    return this.http
      .get<Dota2GameDetails>(`/dota2/games/${idSlug}`, { params })
      .pipe(
        map((res) => {
          return res.data;
        }),
      );
  }

  gameFrame(idSlug: number | string, params?: any): Observable<Dota2GameFrame> {
    return this.http
      .get<Dota2GameFrame>(`/dota2/games/${idSlug}/frames`, { params })
      .pipe(
        map((res) => {
          return res.data;
        }),
      );
  }

  matchGames(
    idSlug: number | string,
    params?: any,
  ): Observable<Dota2MatchGame[]> {
    return this.http
      .get<Dota2MatchGame[]>(`/dota2/matches/${idSlug}/games`, { params })
      .pipe(
        map((res) => {
          return res.data;
        }),
      );
  }

  teamFinishedGames(
    idSlug: number | string,
    params?: any,
  ): Observable<Dota2TeamFinishedGame[]> {
    return this.http
      .get<Dota2TeamFinishedGame[]>(`/dota2/teams/${idSlug}/games`, { params })
      .pipe(
        map((res) => {
          return res.data;
        }),
      );
  }

  heroes(params?: any): Observable<Dota2Hero[]> {
    return this.http.get<Dota2Hero[]>(`/dota2/heroes`, { params }).pipe(
      map((res) => {
        return res.data;
      }),
    );
  }

  hero(idSlug: number | string, params?: any): Observable<Dota2Hero> {
    return this.http.get<Dota2Hero>(`/dota2/heroes/${idSlug}`, { params }).pipe(
      map((res) => {
        return res.data;
      }),
    );
  }

  items(params?: any): Observable<Dota2Item[]> {
    return this.http.get<Dota2Item[]>(`/dota2/items`, { params }).pipe(
      map((res) => {
        return res.data;
      }),
    );
  }

  item(idSlug: number | string, params?: any): Observable<Dota2Item> {
    return this.http.get<Dota2Item>(`/dota2/items/${idSlug}`, { params }).pipe(
      map((res) => {
        return res.data;
      }),
    );
  }

  leagues(params?: any): Observable<League[]> {
    return this.http.get<League[]>(`/dota2/leagues`, { params }).pipe(
      map((res) => {
        return res.data;
      }),
    );
  }
  matches(params?: any): Observable<Dota2Match[]> {
    return this.http.get<Dota2Match[]>(`/dota2/matches`, { params }).pipe(
      map((res) => {
        return res.data;
      }),
    );
  }
  pastMatches(params?: any): Observable<Dota2Match[]> {
    return this.http.get<Dota2Match[]>(`/dota2/matches/past`, { params }).pipe(
      map((res) => {
        return res.data;
      }),
    );
  }

  runningMatches(params?: any): Observable<Dota2Match[]> {
    return this.http
      .get<Dota2Match[]>(`/dota2/matches/running`, { params })
      .pipe(
        map((res) => {
          return res.data;
        }),
      );
  }

  upcomingMatches(params?: any): Observable<Dota2Match[]> {
    return this.http
      .get<Dota2Match[]>(`/dota2/matches/upcoming`, { params })
      .pipe(
        map((res) => {
          return res.data;
        }),
      );
  }

  playerMatchStats(
    matchIdSlug: number | string,
    params?: any,
  ): Observable<Dota2PlayerMatchStats> {
    return this.http
      .get<Dota2PlayerMatchStats>(
        `/dota2/matches/${matchIdSlug}/players/stats`,
        {
          params,
        },
      )
      .pipe(
        map((res) => {
          return res.data;
        }),
      );
  }

  playerStats(
    playerIdSlug: number | string,
    params?: any,
  ): Observable<Dota2PlayerStats> {
    return this.http
      .get<Dota2PlayerStats>(`/dota2/players/${playerIdSlug}/players/stats`, {
        params,
      })
      .pipe(
        map((res) => {
          return res.data;
        }),
      );
  }

  playerSeriesStats(
    seriesIdSlug: number | string,
    playerIdSlug: number | string,
    params?: any,
  ): Observable<Dota2PlayerSeriesStats> {
    return this.http
      .get<Dota2PlayerSeriesStats>(
        `/dota2/series/${seriesIdSlug}/players/${playerIdSlug}/stats`,
        {
          params,
        },
      )
      .pipe(
        map((res) => {
          return res.data;
        }),
      );
  }

  teamSeriesStats(
    seriesIdSlug: number | string,
    teamsIdSlug: number | string,
    params?: any,
  ): Observable<Dota2TeamSeriesStats> {
    return this.http
      .get<Dota2TeamSeriesStats>(
        `/dota2/series/${seriesIdSlug}/teams/${teamsIdSlug}/stats`,
        {
          params,
        },
      )
      .pipe(
        map((res) => {
          return res.data;
        }),
      );
  }

  teamStats(
    teamsIdSlug: number | string,
    params?: any,
  ): Observable<Dota2TeamStats> {
    return this.http
      .get<Dota2TeamStats>(`/dota2/teams/${teamsIdSlug}/stats`, {
        params,
      })
      .pipe(
        map((res) => {
          return res.data;
        }),
      );
  }

  playerTournamentStats(
    tournamentIdSlug: number | string,
    playerIdSlug: number | string,
    params?: any,
  ): Observable<Dota2PlayerTournamentStats> {
    return this.http
      .get<Dota2PlayerTournamentStats>(
        `/dota2/tournaments/${tournamentIdSlug}/players/${playerIdSlug}/stats`,
        {
          params,
        },
      )
      .pipe(
        map((res) => {
          return res.data;
        }),
      );
  }

  teamTournamentStats(
    tournamentIdSlug: number | string,
    teamsIdSlug: number | string,
    params?: any,
  ): Observable<Dota2TeamTournamentStats> {
    return this.http
      .get<Dota2TeamTournamentStats>(
        `/dota2/tournaments/${tournamentIdSlug}/teams/${teamsIdSlug}/stats`,
        {
          params,
        },
      )
      .pipe(
        map((res) => {
          return res.data;
        }),
      );
  }

  players(params?: any): Observable<Dota2Player[]> {
    return this.http
      .get<Dota2Player[]>(`/dota2/players`, {
        params,
      })
      .pipe(
        map((res) => {
          return res.data;
        }),
      );
  }

  series(params?: any): Observable<Dota2Series[]> {
    return this.http
      .get<Dota2Series[]>(`/dota2/series`, {
        params,
      })
      .pipe(
        map((res) => {
          return res.data;
        }),
      );
  }

  pastSeries(params?: any): Observable<Dota2Series[]> {
    return this.http
      .get<Dota2Series[]>(`/dota2/series/past`, {
        params,
      })
      .pipe(
        map((res) => {
          return res.data;
        }),
      );
  }

  runningSeries(params?: any): Observable<Dota2Series[]> {
    return this.http
      .get<Dota2Series[]>(`/dota2/series/running`, {
        params,
      })
      .pipe(
        map((res) => {
          return res.data;
        }),
      );
  }

  upcomingSeries(params?: any): Observable<Dota2Series[]> {
    return this.http
      .get<Dota2Series[]>(`/dota2/series/upcoming`, {
        params,
      })
      .pipe(
        map((res) => {
          return res.data;
        }),
      );
  }

  seriesTeams(
    seriesIdSlug: number | string,
    params?: any,
  ): Observable<Dota2SeriesTeam[]> {
    return this.http
      .get<Dota2SeriesTeam[]>(`/dota2/series/${seriesIdSlug}/teams`, {
        params,
      })
      .pipe(
        map((res) => {
          return res.data;
        }),
      );
  }

  teams(params?: any): Observable<Dota2Team[]> {
    return this.http
      .get<Dota2Team[]>(`/dota2/teams`, {
        params,
      })
      .pipe(
        map((res) => {
          return res.data;
        }),
      );
  }

  tournaments(params?: any): Observable<Dota2Tournament[]> {
    return this.http
      .get<Dota2Tournament[]>(`/dota2/tournaments`, {
        params,
      })
      .pipe(
        map((res) => {
          return res.data;
        }),
      );
  }

  pastTournaments(params?: any): Observable<Dota2Tournament[]> {
    return this.http
      .get<Dota2Tournament[]>(`/dota2/tournaments/past`, {
        params,
      })
      .pipe(
        map((res) => {
          return res.data;
        }),
      );
  }

  runningTournaments(params?: any): Observable<Dota2Tournament[]> {
    return this.http
      .get<Dota2Tournament[]>(`/dota2/tournaments/running`, {
        params,
      })
      .pipe(
        map((res) => {
          return res.data;
        }),
      );
  }

  upcomingTournaments(params?: any): Observable<Dota2Tournament[]> {
    return this.http
      .get<Dota2Tournament[]>(`/dota2/tournaments/upcoming`, {
        params,
      })
      .pipe(
        map((res) => {
          return res.data;
        }),
      );
  }
}
