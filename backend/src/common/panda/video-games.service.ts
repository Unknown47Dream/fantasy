/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { VideoGame } from 'src/common/interfaces/video-games/video-game';
import { VideoGameLeague } from 'src/common/interfaces/video-games/video-game-league';
import { VideoGameSeries } from 'src/common/interfaces/video-games/video-game-series';
import { VideoGameTitle } from 'src/common/interfaces/video-games/video-game-title';
import { VideoGameTournament } from 'src/common/interfaces/video-games/video-game-tournament';
import { VideoGameVersion } from 'src/common/interfaces/video-games/video-game-version';

@Injectable()
export class VideoGamesService {
  constructor(@Inject('PANDA_HTTP') private readonly http: HttpService) {}

  videogames(params?: any): Observable<VideoGame[]> {
    return this.http.get<VideoGame[]>(`/videogames`, { params }).pipe(
      map((res) => {
        return res.data;
      }),
    );
  }

  videogame(idSlug: number | string, params?: any): Observable<VideoGame> {
    return this.http.get<VideoGame>(`/videogames/${idSlug}`, { params }).pipe(
      map((res) => {
        return res.data;
      }),
    );
  }

  videoGameLeagues(
    idSlug: number | string,
    params?: any,
  ): Observable<VideoGameLeague[]> {
    return this.http
      .get<VideoGameLeague[]>(`/videogames/${idSlug}/leagues`, { params })
      .pipe(
        map((res) => {
          return res.data;
        }),
      );
  }

  videoGameSeries(
    idSlug: number | string,
    params?: any,
  ): Observable<VideoGameSeries[]> {
    return this.http
      .get<VideoGameSeries[]>(`/videogames/${idSlug}/series`, { params })
      .pipe(
        map((res) => {
          return res.data;
        }),
      );
  }

  videoGameTitles(
    idSlug: number | string,
    params?: any,
  ): Observable<VideoGameTitle[]> {
    return this.http
      .get<VideoGameTitle[]>(`/videogames/${idSlug}/titles`, { params })
      .pipe(
        map((res) => {
          return res.data;
        }),
      );
  }

  videoGameTournaments(
    idSlug: number | string,
    params?: any,
  ): Observable<VideoGameTournament[]> {
    return this.http
      .get<
        VideoGameTournament[]
      >(`/videogames/${idSlug}/tournaments`, { params })
      .pipe(
        map((res) => {
          return res.data;
        }),
      );
  }

  videoGameVersions(
    idSlug: number | string,
    params?: any,
  ): Observable<VideoGameVersion[]> {
    return this.http
      .get<VideoGameVersion[]>(`/videogames/${idSlug}/versions`, { params })
      .pipe(
        map((res) => {
          return res.data;
        }),
      );
  }
}
