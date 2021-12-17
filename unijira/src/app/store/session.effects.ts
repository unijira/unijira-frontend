import {Actions, createEffect, ofType} from '@ngrx/effects';
import {tap} from 'rxjs';
import {errorAction} from './session.action';
import {SessionService} from './session.service';
import {Injectable} from '@angular/core';
import {AlertController} from '@ionic/angular';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {presentAlertConfirm} from '../util';

@Injectable()
export class SessionEffects {

  constructor(
    private actions: Actions,
    private sessionService: SessionService,
    private alertController: AlertController,
    private translateService: TranslateService,
    private router: Router
  ) {

  }



  // eslint-disable-next-line @typescript-eslint/member-ordering
  errorEffect = createEffect(() => this.actions.pipe(
    ofType(errorAction),
    tap((action) => {
      if (action.error.status === 401) {
        this.router.navigate(['/login']).then();
      } else if (action.error.status === 418) {
        this.sessionService.refreshToken(this.sessionService.token);
      } else {
        this.translateService.get('error.title')
          .subscribe(msg => presentAlertConfirm(this.alertController, msg, action.error.message).then());
      }

    })), { dispatch: false });



}
