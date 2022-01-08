import {Injectable} from '@angular/core';
import {HttpService} from '../http-service.service';
import {Observable} from 'rxjs';
import {UserInfo} from '../../models/users/UserInfo';
import {Project} from '../../models/projects/Project';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

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

}
