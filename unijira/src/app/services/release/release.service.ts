import {Injectable} from '@angular/core';
import {HttpService} from '../http-service.service';
import {catchError, Observable, of} from 'rxjs';
import {Release} from '../../models/releases/Release';
import {Item} from '../../models/item/Item';

@Injectable({
  providedIn: 'root'
})
export class ReleaseService {

  constructor(
    private httpService: HttpService
  ) { }


  public getReleases(projectId: number): Observable<Release[]> {
    return this.httpService.get<Release[]>(`/projects/${projectId}/releases`)
      .pipe(catchError(_ => of([])));
  }

  public getRelease(projectId: number, releaseId: number): Observable<Release> {
    return this.httpService.get<Release>(`/projects/${projectId}/releases/${releaseId}`)
      .pipe(catchError(_ => of(null)));
  }

  public updateRelease(projectId: number, release: Release): Observable<Release> {
    return this.httpService.put<Release>(`/projects/${projectId}/releases/${release.id}`, release)
      .pipe(catchError(_ => of(null)));
  }

  public createRelease(projectId: number): Observable<Release> {
    return this.httpService.post<Release>(`/projects/${projectId}/releases`, Release.empty(projectId))
      .pipe(catchError(_ => of(null)));
  }

  public getTickets(projectId: number, releaseId: number): Observable<Item[]> {
    return this.httpService.get<Item[]>(`/projects/${projectId}/releases/${releaseId}/items`)
      .pipe(catchError(_ => of(null)));
  }

}
