import {Actions, createEffect, ofType} from '@ngrx/effects';
import {tap} from 'rxjs';
import {Error} from '../classes/error';
import {errorAction} from './session.action';
import {SessionService} from './session.service';
import {Injectable} from '@angular/core';
import {AlertController} from '@ionic/angular';
import {Router} from '@angular/router';

@Injectable()
export class SessionEffects {

  constructor(
    private actions: Actions,
    private sessionService: SessionService,
    private alertController: AlertController,
    private router: Router
  ) {

  }

  async presentAlertConfirm(message: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      message,
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
          },
        },
      ],
    });

    await alert.present();
  }


  errorEffect = createEffect(() => this.actions.pipe(
    ofType(errorAction),
    tap((action) => {
      console.log(action.error);
      if (action.error.status === 401) {
        this.router.navigate(['/login']).then();
      } else if (action.error.status === 418) {
        this.sessionService.refreshToken(this.sessionService.token);
      } else {
        this.presentAlertConfirm(action.error.message).then();
      }

    })), { dispatch: false });



}
