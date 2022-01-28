import {Injectable} from '@angular/core';
import {catchError, map, Observable, of} from 'rxjs';
import {Project} from '../../models/projects/Project';
import {HttpService} from '../http-service.service';
import {Membership} from '../../models/projects/Membership';
import {HttpParams} from '@angular/common/http';
import {MembershipRoles} from '../../models/projects/MembershipRoles';
import {MembershipStatus} from '../../models/projects/MembershipStatus';
import {MembershipPermission} from '../../models/projects/MembershipPermission';
import {Document} from '../../models/projects/Document';
import {DefinitionOfDoneEntry} from '../../models/projects/DefinitionOfDoneEntry';
import {DateUtils} from '../../classes/date-utils';
import {ItemStatusHistory} from '../../models/item/ItemStatusHistory';

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

    return this.http.put<Membership>(`/projects/${keyProjectId}/memberships/${keyUserId}`, {keyUserId, keyProjectId, role, status, permissions})
      .pipe(catchError(() => of(null)));

  }

  removeMember(projectId: number, userId: number) {

    return this.http.delete<Membership>(`/projects/${projectId}/memberships/${userId}`)
      .pipe(catchError(() => of(null)));

  }

  verifyPermission(projectId: number, userId: number, permission: MembershipPermission) {

    return this.http.get<boolean>(`/projects/${projectId}/memberships/${userId}/permission/${permission}`)
      .pipe(map(_ => true))
      .pipe(catchError(_ => of(false)));

  }

  getDocuments(projectId: number): Observable<Document[]> {

    return this.http.get<Document[]>(`/projects/${projectId}/documents`)
      .pipe(catchError(() => of(null)));

    // return of([
    //   new Document(1, 'Documento.txt', 'text/plain', null, projectId, 1, 'John', 'Doe', null, 'admin@admin.org', DateUtils.toLocalDateTime(), DateUtils.toLocalDateTime()),
    //   new Document(2, 'Documento.txt', 'text/plain', null, projectId, 1, 'John', 'Doe', null, 'admin@ædmin.org', DateUtils.toLocalDateTime(), DateUtils.toLocalDateTime()),
    //   new Document(3, 'Documento.txt', 'text/plain', null, projectId, 1, 'John', 'Doe', null, 'admin@admin.org', DateUtils.toLocalDateTime(), DateUtils.toLocalDateTime()),
    //   new Document(4, 'Documento.txt', 'text/plain', null, projectId, 1, 'John', 'Doe', null, 'admin@admin.org', DateUtils.toLocalDateTime(), DateUtils.toLocalDateTime())
    // ]);

  }

  deleteDocument(projectId: number, documentId: number): Observable<Document> {

    return this.http.get<Document>(`/projects/${projectId}/documents/${documentId}`)
      .pipe(catchError(() => of(null)));

  }

  createDocument(filename: string, path: URL, projectId: number, userId: number,
                 userFirstName: string, userLastName: string, userUsername: string,
                 userAvatar: URL, mime: string): Observable<Document> {

    return this.http.post<Document>(`/projects/${projectId}/documents`,
      {filename, path, projectId, userId,
             userFirstName, userLastName, userUsername,
             userAvatar, mime})
      .pipe(catchError(() => of(null)));

  }

  createDefOfDoneEntry(projectId: number, entry: DefinitionOfDoneEntry): Observable<DefinitionOfDoneEntry> {
    return this.http.post<DefinitionOfDoneEntry>(`/projects/${projectId}/defofdone`, entry)
      .pipe(catchError(() => of(null)));
  }

  updateDefOfDoneEntry(projectId: number, entryId: number, entry: DefinitionOfDoneEntry): Observable<DefinitionOfDoneEntry> {
    return this.http.put<DefinitionOfDoneEntry>(`/projects/${projectId}/defofdone/${entryId}`, entry)
      .pipe(catchError(() => of(null)));
  }

  deleteDefOfDoneEntry(projectId: number, entryId: number): Observable<boolean> {
    return this.http.delete<boolean>(`/projects/${projectId}/defofdone/${entryId}`)
      .pipe(map(() => true), catchError(() => of(null)));
  }

  getProjectDefOfDone(projectId: number): Observable<DefinitionOfDoneEntry[]> {
    return this.http.get<DefinitionOfDoneEntry[]>(`/projects/${projectId}/defofdone`)
      .pipe(catchError(() => of(null)));
  }

  getProjectDefOfDoneEntry(projectId: number, entryId: number): Observable<DefinitionOfDoneEntry> {
    return this.http.get<DefinitionOfDoneEntry>(`/projects/${projectId}/defofdone/${entryId}`)
      .pipe(catchError(() => of(null)));
  }

  getItemsStatusHistoryByProject(project: number): Observable<ItemStatusHistory[]> {
    return this.http.get<ItemStatusHistory[]>(`/projects/${project}/items/history`)
      .pipe(catchError(() => of(null)));
  }
}
