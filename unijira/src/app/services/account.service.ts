import {Injectable} from '@angular/core';
import {HttpService} from './http-service.service';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private httpService: HttpService) {}

  register(user: object) {
    console.log(user);
    return this.httpService.sendPost('/auth/register', user);
  }
  activate(token: string) {
    return this.httpService.sendGetWithParams('/auth/active', new HttpParams().set('token', token));
  }
  logIn(username: string, password: string): Observable<string> {
    return this.httpService.post<string>('/auth/authenticate', {username, password}, null, { responseType: 'text' });
  }
  refreshToken(token: string): Observable<string> {
    return this.httpService.sendPostTxtResponse('/auth/refresh', {token});
  }
}
