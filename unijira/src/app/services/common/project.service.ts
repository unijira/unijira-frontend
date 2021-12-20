import {Injectable} from '@angular/core';
import {catchError, delay, Observable, of} from 'rxjs';
import {Project} from '../../models/projects/Project';
import {HttpService} from '../http-service.service';
import {Membership} from '../../models/projects/Membership';
import {HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpService) {

  }

  getProjects(page: number, size: number): Observable<Project[]> {

    return this.http.get<Project[]>('/projects', new HttpParams()
        .set('page', page)
        .set('size', size))
      .pipe(catchError(() => of([])));

  }

  createProject(name: string, key: string, icon: URL): Observable<Project> {

    return this.http.post<Project>('/projects', { name, key, icon })
      .pipe(catchError(() => of(null)));

  }

  sendInvitations(projectId: number, emails: string[]): Observable<Membership> {

    return this.http.post<Membership>('/projects/invitations', { projectId, emails })
      .pipe(catchError(() => of(null)));

  }

  acceptInvite(token: string): Observable<boolean> {

    return this.http.get<boolean>('/projects/accept', new HttpParams().set('token', token))
      .pipe(catchError(() => of(null)));

  }

}
