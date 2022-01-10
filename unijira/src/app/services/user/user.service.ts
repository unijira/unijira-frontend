import {Injectable} from '@angular/core';
import {HttpService} from '../http-service.service';
import {catchError, map, Observable, of} from 'rxjs';
import {UserInfo} from '../../models/users/UserInfo';
import {Project} from '../../models/projects/Project';
import {UserPasswordReset} from "../../models/users/UserPasswordReset";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpService) { }

  getUser(idUser: number): Observable<UserInfo> {
    return this.http.get<UserInfo>('/users/' + idUser);
  }

  getCollaborators(idUser: number): Observable<UserInfo[]> {
    return this.http.get<UserInfo[]>('/users/' + idUser+'/collaborators');
  }

  getEnrolledProjects(idUser: number): Observable<Project[]> {
    return this.http.get<Project[]>('/users/' + idUser+'/projects');
  }

  updateUser(idUser: number, user: UserInfo): Observable<UserInfo> {
    return this.http.put<UserInfo>('/users/'+idUser, user);
  }

  resetPasswordWithToken(user: UserPasswordReset): Observable<boolean> {
    return this.http.post<boolean>('/auth/password-reset-with-token', user)
      .pipe(map(_ => true))
      .pipe(catchError(_ => of(false)));
  }

}
