/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { League } from 'src/common/interfaces/leagues/league';
import { LeagueMatch } from 'src/common/interfaces/leagues/league-match';
import { LeagueSeries } from 'src/common/interfaces/leagues/league-series';
import { LeagueTournament } from 'src/common/interfaces/leagues/league-tournament';

@Injectable()
export class LeaguesService {
  constructor(@Inject('PANDA_HTTP') private readonly http: HttpService) {}

  leagues(params?: any): Observable<League[]> {
    return this.http.get<League[]>(`/leagues`, { params }).pipe(
      map((res) => {
        return res.data;
      }),
    );
  }

  league(idSlug: number | string, params?: any): Observable<League> {
    return this.http.get<League>(`/leagues/${idSlug}`, { params }).pipe(
      map((res) => {
        return res.data;
      }),
    );
  }

  leagueMatches(
    idSlug: number | string,
    params?: any,
  ): Observable<LeagueMatch[]> {
    return this.http
      .get<LeagueMatch[]>(`/leagues/${idSlug}/matches`, { params })
      .pipe(
        map((res) => {
          return res.data;
        }),
      );
  }

  leaguePastMatches(
    idSlug: number | string,
    params?: any,
  ): Observable<LeagueMatch[]> {
    return this.http
      .get<LeagueMatch[]>(`/leagues/${idSlug}/matches/past`, { params })
      .pipe(
        map((res) => {
          return res.data;
        }),
      );
  }

  leagueRunningMatches(
    idSlug: number | string,
    params?: any,
  ): Observable<LeagueMatch[]> {
    return this.http
      .get<LeagueMatch[]>(`/leagues/${idSlug}/matches/running`, { params })
      .pipe(
        map((res) => {
          return res.data;
        }),
      );
  }

  leagueUpcomingMatches(
    idSlug: number | string,
    params?: any,
  ): Observable<LeagueMatch[]> {
    return this.http
      .get<LeagueMatch[]>(`/leagues/${idSlug}/matches/upcoming`, { params })
      .pipe(
        map((res) => {
          return res.data;
        }),
      );
  }

  leagueSeries(
    idSlug: number | string,
    params?: any,
  ): Observable<LeagueSeries[]> {
    return this.http
      .get<LeagueSeries[]>(`/leagues/${idSlug}/series`, { params })
      .pipe(
        map((res) => {
          return res.data;
        }),
      );
  }

  leagueTournaments(
    idSlug: number | string,
    params?: any,
  ): Observable<LeagueTournament[]> {
    return this.http
      .get<LeagueTournament[]>(`/leagues/${idSlug}/tournaments`, { params })
      .pipe(
        map((res) => {
          return res.data;
        }),
      );
  }
}
