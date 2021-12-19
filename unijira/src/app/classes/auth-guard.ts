import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {catchError, map, Observable, of} from 'rxjs';
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
