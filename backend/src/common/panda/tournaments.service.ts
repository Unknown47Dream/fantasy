/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Tournament } from 'src/common/interfaces/tournaments/tournament';
import { TournamentBracket } from 'src/common/interfaces/tournaments/tournament-bracket';
import { TournamentMatch } from 'src/common/interfaces/tournaments/tournament-match';
import { TournamentRoster } from 'src/common/interfaces/tournaments/tournament-roster';
import { TournamentStanding } from 'src/common/interfaces/tournaments/tournament-standing';
import { TournamentTeam } from 'src/common/interfaces/tournaments/tournament-team';

@Injectable()
export class TournamentsService {
  constructor(@Inject('PANDA_HTTP') private readonly http: HttpService) {}

  tournaments(params?: any): Observable<Tournament[]> {
    return this.http.get<Tournament[]>(`/tournaments`, { params }).pipe(
      map((res) => {
        return res.data;
      }),
    );
  }

  tournament(idSlug: number | string, params?: any): Observable<Tournament> {
    return this.http.get<Tournament>(`/tournaments/${idSlug}`, { params }).pipe(
      map((res) => {
        return res.data;
      }),
    );
  }

  pastTournaments(params?: any): Observable<Tournament[]> {
    return this.http.get<Tournament[]>(`/tournaments/past`, { params }).pipe(
      map((res) => {
        return res.data;
      }),
    );
  }

  runningTournaments(params?: any): Observable<Tournament[]> {
    return this.http.get<Tournament[]>(`/tournaments/running`, { params }).pipe(
      map((res) => {
        return res.data;
      }),
    );
  }

  upcomingTournaments(params?: any): Observable<Tournament[]> {
    return this.http
      .get<Tournament[]>(`/tournaments/upcoming`, { params })
      .pipe(
        map((res) => {
          return res.data;
        }),
      );
  }
  tournamentBrackets(
    idSlug: number | string,
    params?: any,
  ): Observable<TournamentBracket[]> {
    return this.http
      .get<TournamentBracket[]>(`/tournaments/${idSlug}/brackets`, { params })
      .pipe(
        map((res) => {
          return res.data;
        }),
      );
  }

  tournamentMatches(
    idSlug: number | string,
    params?: any,
  ): Observable<TournamentMatch[]> {
    return this.http
      .get<TournamentMatch[]>(`/tournaments/${idSlug}/matches`, { params })
      .pipe(
        map((res) => {
          return res.data;
        }),
      );
  }

  tournamentRosters(
    idSlug: number | string,
    params?: any,
  ): Observable<TournamentRoster[]> {
    return this.http
      .get<TournamentRoster[]>(`/tournaments/${idSlug}/rosters`, { params })
      .pipe(
        map((res) => {
          return res.data;
        }),
      );
  }

  tournamentStandings(
    idSlug: number | string,
    params?: any,
  ): Observable<TournamentStanding[]> {
    return this.http
      .get<TournamentStanding[]>(`/tournaments/${idSlug}/standings`, { params })
      .pipe(
        map((res) => {
          return res.data;
        }),
      );
  }

  tournamentTeams(
    idSlug: number | string,
    params?: any,
  ): Observable<TournamentTeam[]> {
    return this.http
      .get<TournamentTeam[]>(`/tournaments/${idSlug}/teams`, { params })
      .pipe(
        map((res) => {
          return res.data;
        }),
      );
  }
}
