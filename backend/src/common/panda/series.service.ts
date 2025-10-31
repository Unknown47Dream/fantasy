/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Series } from 'src/common/interfaces/series/series';
import { SeriesMatch } from 'src/common/interfaces/series/series-match';
import { SeriesTournament } from 'src/common/interfaces/series/series-tournament';

@Injectable()
export class SeriesService {
  constructor(@Inject('PANDA_HTTP') private readonly http: HttpService) {}

  allSeries(params?: any): Observable<Series[]> {
    return this.http.get<Series[]>(`/series`, { params }).pipe(
      map((res) => {
        return res.data;
      }),
    );
  }

  singleSeries(idSlug: number | string, params?: any): Observable<Series> {
    return this.http.get<Series>(`/series/${idSlug}`, { params }).pipe(
      map((res) => {
        return res.data;
      }),
    );
  }

  pastSeries(params?: any): Observable<Series[]> {
    return this.http.get<Series[]>(`/series/past`, { params }).pipe(
      map((res) => {
        return res.data;
      }),
    );
  }

  upcomingSeries(params?: any): Observable<Series[]> {
    return this.http.get<Series[]>(`/series/upcoming`, { params }).pipe(
      map((res) => {
        return res.data;
      }),
    );
  }

  runningSeries(params?: any): Observable<Series[]> {
    return this.http.get<Series[]>(`/series/running`, { params }).pipe(
      map((res) => {
        return res.data;
      }),
    );
  }

  seriesMatches(
    idSlug: number | string,
    params?: any,
  ): Observable<SeriesMatch[]> {
    return this.http
      .get<SeriesMatch[]>(`/series/${idSlug}/matches`, { params })
      .pipe(
        map((res) => {
          return res.data;
        }),
      );
  }

  seriesPastMatches(
    idSlug: number | string,
    params?: any,
  ): Observable<SeriesMatch[]> {
    return this.http
      .get<SeriesMatch[]>(`/series/${idSlug}/matches/past`, { params })
      .pipe(
        map((res) => {
          return res.data;
        }),
      );
  }

  seriesRunningMatches(
    idSlug: number | string,
    params?: any,
  ): Observable<SeriesMatch[]> {
    return this.http
      .get<SeriesMatch[]>(`/series/${idSlug}/matches/running`, { params })
      .pipe(
        map((res) => {
          return res.data;
        }),
      );
  }

  seriesUpcomingMatches(
    idSlug: number | string,
    params?: any,
  ): Observable<SeriesMatch[]> {
    return this.http
      .get<SeriesMatch[]>(`/series/${idSlug}/matches/upcoming`, { params })
      .pipe(
        map((res) => {
          return res.data;
        }),
      );
  }

  seriesTournaments(
    idSlug: number | string,
    params?: any,
  ): Observable<SeriesTournament[]> {
    return this.http
      .get<SeriesTournament[]>(`/series/${idSlug}/tournaments`, { params })
      .pipe(
        map((res) => {
          return res.data;
        }),
      );
  }
}
