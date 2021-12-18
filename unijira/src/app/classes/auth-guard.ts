import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {SessionService} from '../store/session.service';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private sessionService: SessionService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let isLogged = false;
    const sub = this.sessionService.getIsUserLogged().subscribe(log => isLogged = log);
    sub.unsubscribe();
    if (isLogged) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login']).then();
    return false;
  }
}
