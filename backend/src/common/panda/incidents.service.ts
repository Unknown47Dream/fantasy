/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Addition } from 'src/common/interfaces/incidents/addition';
import { Change } from 'src/common/interfaces/incidents/change';
import { Deletion } from 'src/common/interfaces/incidents/deletion';
import { Incident } from 'src/common/interfaces/incidents/incident';

@Injectable()
export class IncidentsService {
  constructor(@Inject('PANDA_HTTP') private readonly http: HttpService) {}

  additions(params?: any): Observable<Addition[]> {
    return this.http.get<Addition[]>(`/additions`, { params }).pipe(
      map((res) => {
        return res.data;
      }),
    );
  }

  changes(params?: any): Observable<Change[]> {
    return this.http.get<Change[]>(`/changes`, { params }).pipe(
      map((res) => {
        return res.data;
      }),
    );
  }

  deletions(params?: any): Observable<Deletion[]> {
    return this.http.get<Deletion[]>(`/deletions`, { params }).pipe(
      map((res) => {
        return res.data;
      }),
    );
  }

  incidents(params?: any): Observable<Incident[]> {
    return this.http.get<Incident[]>(`/incidents`, { params }).pipe(
      map((res) => {
        return res.data;
      }),
    );
  }
}
