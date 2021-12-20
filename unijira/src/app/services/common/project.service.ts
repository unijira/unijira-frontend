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

  getRecentProjects(limit: number): Observable<Project[]> {

    // return this.http.get<Project[]>('/projects', new HttpParams().set('size', limit))
    //   .pipe(catchError(() => of([])));

    return of([
      new Project(1, 'Project 1', 'PRJ-1', null, 1),
      new Project(2, 'Project 2', 'PRJ-2', null, 1),
      new Project(3, 'Project 3', 'PRJ-3', null, 1),
      new Project(4, 'Project 4', 'PRJ-4', null, 1),
      new Project(5, 'Project 5', 'PRJ-5', null, 1),
    ]).pipe(delay(1000));

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
