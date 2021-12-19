import {Subscription} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {FormGroup} from '@angular/forms';
import {AlertController} from '@ionic/angular';

export function unsubscribeAll(...subs: Subscription[]) {
  (subs || []).forEach(s => s.unsubscribe());
}

export const monthsName = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export function getTranslation(translateService: TranslateService, key: string): string {
  let translation = '';
  translateService.get(key, {value: 'world'}).subscribe((res: string) => translation = res);
  return translation;
}

export function validateConfirmPassword(g: FormGroup): any {
  if (g.get('password1').value !== g.get('password2').value) {
    g.get('password2').setErrors({invalidConfirm : true});
  }
}

export async function presentAlertConfirm(alertController: AlertController, header: string, message: string) {
  const alert = await alertController.create({
    cssClass: 'my-custom-class',
    header,
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
