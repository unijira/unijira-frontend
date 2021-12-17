import {Actions, createEffect, ofType} from '@ngrx/effects';
import {tap} from 'rxjs';
import {errorAction} from './session.action';
import {SessionService} from './session.service';
import {Injectable} from '@angular/core';
import {AlertController} from '@ionic/angular';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {presentAlertConfirm} from '../util';

@Injectable(
  {providedIn: 'root'}
)
export class SessionEffects {

  public errorEffect = createEffect(

    () => this.actions.pipe(ofType(errorAction), tap(action => {

      switch(action.error.status) {

        case 401:
        case 403:
          this.sessionService.logout();
          this.router.navigate(['/login']).then();
          break;

        case 404:
          break;

        default:

          console.error('SessionEffects.errorEffect', action.error);

          this.translateService.get([ 'error.title', 'error.api.default' ])
            .subscribe(t => presentAlertConfirm(this.alertController, t['error.title'], t['error.api.default']));
          break;

      }

    })), {
      dispatch: false
  });


  constructor(
    private actions: Actions,
    private sessionService: SessionService,
    private alertController: AlertController,
    private translateService: TranslateService,
    private router: Router
  ) { }

}
