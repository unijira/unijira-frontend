import {Injectable} from '@angular/core';
import {HttpService} from '../http-service.service';
import {Observable} from 'rxjs';
import {UserInfo} from '../../models/users/UserInfo';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpService) { }

  getUser(idUser: number): Observable<UserInfo> {
    return this.http.get<UserInfo>('/users/' + idUser);
  }
}
