/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Team } from 'src/common/interfaces/teams/team';
import { TeamLeague } from 'src/common/interfaces/teams/team-league';
import { TeamMatch } from 'src/common/interfaces/teams/team-match';
import { TeamSeries } from 'src/common/interfaces/teams/team-series';
import { TeamTournament } from 'src/common/interfaces/teams/team-tournament';

@Injectable()
export class TeamsService {
  constructor(@Inject('PANDA_HTTP') private readonly http: HttpService) {}

  teams(params?: any): Observable<Team[]> {
    return this.http.get<Team[]>(`/teams`, { params }).pipe(
      map((res) => {
        return res.data;
      }),
    );
  }

  team(idSlug: number | string, params?: any): Observable<Team> {
    return this.http.get<Team>(`/teams/${idSlug}`, { params }).pipe(
      map((res) => {
        return res.data;
      }),
    );
  }

  teamLeagues(idSlug: number | string, params?: any): Observable<TeamLeague[]> {
    return this.http
      .get<TeamLeague[]>(`/teams/${idSlug}/leagues`, { params })
      .pipe(
        map((res) => {
          return res.data;
        }),
      );
  }

  teamMatches(idSlug: number | string, params?: any): Observable<TeamMatch[]> {
    return this.http
      .get<TeamMatch[]>(`/teams/${idSlug}/matches`, { params })
      .pipe(
        map((res) => {
          return res.data;
        }),
      );
  }

  teamSeries(idSlug: number | string, params?: any): Observable<TeamSeries[]> {
    return this.http
      .get<TeamSeries[]>(`/teams/${idSlug}/series`, { params })
      .pipe(
        map((res) => {
          return res.data;
        }),
      );
  }

  teamTournaments(
    idSlug: number | string,
    params?: any,
  ): Observable<TeamTournament[]> {
    return this.http
      .get<TeamTournament[]>(`/teams/${idSlug}/tournaments`, { params })
      .pipe(
        map((res) => {
          return res.data;
        }),
      );
  }
}
