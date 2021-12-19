import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {SessionService} from '../store/session.service';
import {catchError, map, Observable, of} from 'rxjs';
import {HttpService} from '../services/http-service.service';
import {AccountService} from '../services/account.service';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private accountService: AccountService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    return this.accountService.me()
      .pipe(map(res => true))
      .pipe(catchError(() => {
          this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }}).then();
          return of(false);
        })
      );

  }

}
