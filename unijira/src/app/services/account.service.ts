import { Injectable } from '@angular/core';
import { HttpService } from './http-service.service';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private httpService: HttpService) {}

  register(user: object) {
    console.log(user);
    return this.httpService.sendPost('auth/register', user)
  }

  activate(token: string) {
    return this.httpService.sendGet('auth/active/' + token)
  }
}
