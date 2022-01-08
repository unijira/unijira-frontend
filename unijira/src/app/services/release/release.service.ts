import {Injectable} from '@angular/core';
import {HttpService} from '../http-service.service';
import {catchError, delay, Observable, of} from 'rxjs';
import {Release} from '../../models/releases/Release';
import {ReleaseStatus} from '../../models/releases/ReleaseStatus';

@Injectable({
  providedIn: 'root'
})
export class ReleaseService {

  constructor(
    private httpService: HttpService
  ) { }


  public getReleases(projectId: number): Observable<Release[]> {
    // return this.httpService.get(`/projects/${projectId}/releases`)
    //   .pipe(catchError(_ => of([])));

    return of([
      new Release(1, 'v1.0.0', 'Release 1 description', ReleaseStatus.draft, new Date(Date.now()), new Date(Date.now() + 86400000)),
      new Release(2, 'v1.0.1', 'Release 2 description', ReleaseStatus.draft, new Date(Date.now()), new Date(Date.now() + 86400000 * 2)),
      new Release(3, 'v1.1.0', 'Release 3 description', ReleaseStatus.draft, new Date(Date.now()), new Date(Date.now() + 86400000 * 3)),
      new Release(4, 'v1.1.1', 'Release 4 description', ReleaseStatus.released, new Date(Date.now()), new Date(Date.now() + 86400000 * 4)),
      new Release(5, 'v1.1.2', 'Release 5 description', ReleaseStatus.released, new Date(Date.now()), new Date(Date.now() + 86400000 * 5)),
      new Release(6, 'v1.1.3', 'Release 6 description', ReleaseStatus.archived, new Date(Date.now()), new Date(Date.now() + 86400000 * 6)),
      new Release(7, 'v2.0.0', 'Release 7 description', ReleaseStatus.archived, new Date(Date.now()), new Date(Date.now() + 86400000 * 7))
    ]).pipe(delay(3000));

  }

  public getRelease(projectId: number, releaseId: number): Observable<Release> {

    return of(
      new Release(1, 'v1.0.0', 'Release 1 description', ReleaseStatus.draft, new Date(Date.now()), new Date(Date.now() + 86400000)),
    );

    // return this.httpService.get<Release>(`/projects/${projectId}/releases/${releaseId}`)
    //   .pipe(catchError(_ => of(null)));

  }

  public updateRelease(projectId: number, release: Release): Observable<Release> {
    return this.httpService.put<Release>(`/projects/${projectId}/releases/${release.id}`, release)
      .pipe(catchError(_ => of(null)));
  }

  public createRelease(projectId: number): Observable<Release> {
    return this.httpService.post<Release>(`/projects/${projectId}/releases`, Release.empty())
      .pipe(catchError(_ => of(null)));
  }

}
