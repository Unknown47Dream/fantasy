/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Match } from 'src/common/interfaces/matches/match';
import { MatchOpponents } from 'src/common/interfaces/matches/match-opponents';

@Injectable()
export class MatchesService {
  constructor(
    @Inject('PANDA_HTTP') private readonly http: HttpService,
    // private readonly appService: AppService,
  ) {}

  matches(params?: any): Observable<Match[]> {
    return this.http.get<Match[]>(`/matches`, { params }).pipe(
      map((res) => {
        return res.data;
      }),
    );
  }

  match(idSlug: number | string, params?: any): Observable<Match> {
    return this.http.get<Match>(`/matches/${idSlug}`, { params }).pipe(
      map((res) => {
        return res.data;
      }),
    );
  }

  matchOpponents(
    idSlug: number | string,
    params?: any,
  ): Observable<MatchOpponents> {
    return this.http
      .get<MatchOpponents>(`/matches/${idSlug}/opponents`, { params })
      .pipe(
        map((res) => {
          return res.data;
        }),
      );
  }

  pastMatches(params?: any): Observable<Match[]> {
    return this.http.get<Match[]>(`/matches/past`, { params }).pipe(
      map((res) => {
        return res.data;
      }),
    );
  }

  upcomingMatches(params?: any): Observable<Match[]> {
    return this.http.get<Match[]>(`/matches/upcoming`, { params }).pipe(
      map((res) => {
        return res.data;
      }),
    );
  }

  // allUpcomingMatches(params?: any): Observable<Match[]> {
  //   return this.http.get<Match[]>(`/matches/upcoming`, { params }).pipe(
  //     switchMap((res) => {
  //       const initialData = res.data;
  //       const listOfUrls = this.appService.extractLinks(
  //         res.headers.link as string,
  //       );
  //       const lastPageUrl = listOfUrls.find(
  //         (link) => link.title === 'last',
  //       )?.link;
  //       if (!lastPageUrl) return of(initialData);
  //       const lastPageNumber = +new URL(lastPageUrl).searchParams.get('page')!;
  //       const currentPage = +params?.page || 1;
  //       const requests: Observable<Match[]>[] = [];
  //       for (let page = currentPage + 1; page <= lastPageNumber; page++) {
  //         const pageParams = { ...params, page };
  //         requests.push(
  //           this.http
  //             .get<Match[]>(`/matches/upcoming`, { params: pageParams })
  //             .pipe(
  //               retry(3),
  //               map((res) => res.data),
  //               catchError(() => of([])),
  //             ),
  //         );
  //       }
  //       return forkJoin(requests).pipe(
  //         map((restPagesData: Match[][]) => {
  //           const allMatches = [initialData, ...restPagesData].flat();
  //           return allMatches;
  //         }),
  //       );
  //     }),
  //     retry(3),
  //     catchError(() => of([])),
  //   );
  // }

  runningMatches(params?: any): Observable<Match[]> {
    return this.http.get<Match[]>(`/matches/running`, { params }).pipe(
      map((res) => {
        return res.data;
      }),
    );
  }
}
