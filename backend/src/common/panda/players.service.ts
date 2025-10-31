/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Player } from 'src/common/interfaces/players/player';
import { PlayerLeague } from 'src/common/interfaces/players/player-league';
import { PlayerMatch } from 'src/common/interfaces/players/player-match';
import { PlayerSeries } from 'src/common/interfaces/players/player-series';
import { PlayerTournament } from 'src/common/interfaces/players/player-tournament';

@Injectable()
export class PlayersService {
  constructor(@Inject('PANDA_HTTP') private readonly http: HttpService) {}

  players(params?: any): Observable<Player[]> {
    return this.http.get<Player[]>(`/players`, { params }).pipe(
      map((res) => {
        return res.data;
      }),
    );
  }

  player(idSlug: number | string, params?: any): Observable<Player> {
    return this.http.get<Player>(`/players/${idSlug}`, { params }).pipe(
      map((res) => {
        return res.data;
      }),
    );
  }

  playerLeagues(
    idSlug: number | string,
    params?: any,
  ): Observable<PlayerLeague[]> {
    return this.http
      .get<PlayerLeague[]>(`/players/${idSlug}/leagues`, { params })
      .pipe(
        map((res) => {
          return res.data;
        }),
      );
  }

  playerMatches(
    idSlug: number | string,
    params?: any,
  ): Observable<PlayerMatch[]> {
    return this.http
      .get<PlayerMatch[]>(`/players/${idSlug}/matches`, { params })
      .pipe(
        map((res) => {
          return res.data;
        }),
      );
  }

  playerSeries(
    idSlug: number | string,
    params?: any,
  ): Observable<PlayerSeries[]> {
    return this.http
      .get<PlayerSeries[]>(`/players/${idSlug}/series`, { params })
      .pipe(
        map((res) => {
          return res.data;
        }),
      );
  }

  playerTournaments(
    idSlug: number | string,
    params?: any,
  ): Observable<PlayerTournament[]> {
    return this.http
      .get<PlayerTournament[]>(`/players/${idSlug}/tournaments`, { params })
      .pipe(
        map((res) => {
          return res.data;
        }),
      );
  }
}
