import {Injectable} from '@angular/core';
import {HttpService} from './http-service.service';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserInfo} from '../models/users/UserInfo';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private httpService: HttpService) {}

  register(user: object): Observable<UserInfo> {
    return this.httpService.post<UserInfo>('/auth/register', { ...user });
  }

  activate(token: string): Observable<boolean> {
    return this.httpService.get<boolean>('/auth/active', new HttpParams().set('token', token));
  }

  logIn(username: string, password: string): Observable<string> {
    return this.httpService.post<string>('/auth/authenticate', {username, password}, null, { responseType: 'text' });
  }

  refreshToken(token: string): Observable<string> {
    return this.httpService.post<string>('/auth/refresh', { token }, null, { responseType: 'text' });
  }

  me(): Observable<UserInfo> {
    return this.httpService.get<UserInfo>('/auth/me');
  }

  isUserAvailable(username: string): Observable<boolean> {
    return this.httpService.get<boolean>('/auth/available', new HttpParams().set('username', username));
  }
}
