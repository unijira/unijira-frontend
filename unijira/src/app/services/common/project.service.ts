import {Injectable} from '@angular/core';
import {catchError, Observable, of} from 'rxjs';
import {Project} from '../../models/projects/Project';
import {HttpService} from '../http-service.service';
import {Membership} from '../../models/projects/Membership';
import {HttpParams} from '@angular/common/http';
import {MembershipRoles} from '../../models/projects/MembershipRoles';
import {MembershipStatus} from '../../models/projects/MembershipStatus';
import {MembershipPermission} from '../../models/projects/MembershipPermission';

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

  getProject(id: number): Observable<Project> {

    return this.http.get<Project>('/projects/' + id)
      .pipe(catchError(() => of(null)));

  }

  createProject(name: string, key: string, icon: URL): Observable<Project> {

    return this.http.post<Project>('/projects', { name, key, icon })
      .pipe(catchError(() => of(null)));

  }

  updateProject(id: number, name: string, key: string, ownerId: number, icon: URL): Observable<Project> {

    return this.http.put<Project>(`/projects/${id}`, { name, key, icon, ownerId})
      .pipe(catchError(() => of(null)));

  }

  deleteProject(id: number): Observable<Project> {

    return this.http.delete<Project>(`/projects/${id}`)
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

  getMemberships(projectId: number): Observable<Membership[]> {

    return this.http.get<Membership[]>('/projects/' + projectId + '/memberships')
      .pipe(catchError(() => of(null)));

  }

  updateMemberships(keyProjectId: number, keyUserId: number, role: MembershipRoles, status: MembershipStatus, permissions: MembershipPermission[]): Observable<Membership> {

    return this.http.put<Membership>(`/projects/${keyProjectId}/memberships/${keyUserId}`, {keyProjectId, keyUserId, role, status, permissions})
      .pipe(catchError(() => of(null)));

  }

}
