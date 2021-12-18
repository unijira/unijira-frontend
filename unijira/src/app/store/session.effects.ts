import { Actions, createEffect, ofType } from '@ngrx/effects';
import {exhaustMap, map, switchMap, tap} from 'rxjs';
import { Error } from '../classes/error';
import {errorAction} from './session.action';
import {SessionService} from './session.service';
import {Injectable} from '@angular/core';
import {AlertController} from '@ionic/angular';
import {Router} from '@angular/router';
import {presentAlertConfirm} from "../util";

@Injectable()
export class SessionEffects {

  constructor(
    private actions: Actions,
    private sessionService: SessionService,
    private alertController: AlertController,
    private router: Router
  ) {

  }


  errorEffect = createEffect(() => this.actions.pipe(
    ofType(errorAction),
    tap((action) => {
      console.log(action.error);
      if (action.error.status === 401) {
        this.router.navigate(['/login']);
      } else if (action.error.status === 418) {
        this.sessionService.refreshToken(this.sessionService.token);
      } else {
        presentAlertConfirm(this.alertController, 'Error!', action.error.message);
      }

    })), { dispatch: false });



}
