import {Subscription} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {FormGroup} from '@angular/forms';
import {AlertController, ToastController} from '@ionic/angular';

export const unsubscribeAll = (...subs: Subscription[]) => {
  (subs || []).forEach(s => s.unsubscribe());
};

/** @deprecated
 * Use translateService.instant(key) instead (prefer subscribe() and async methods)
 **/
export const getTranslation = (translateService: TranslateService, key: string): string => translateService.instant(key);


export const validateConfirmPassword = (g: FormGroup): any => {
  if (g.get('password1').value !== g.get('password2').value) {
    g.get('password2').setErrors({invalidConfirm : true});
  }
};



export const presentAlertConfirm = async (alertController: AlertController, header: string, message: string, handler?: (e: any) => void) => {

  const alert = await alertController.create({
    header,
    message,
    buttons: [
      {
        text: 'OK',
        handler: (e) => handler && handler(e)
      },
    ],
  });

  await alert.present();

};

export const switchLanguage = (translateService: TranslateService) => {
  if (translateService.currentLang === 'it') {
    translateService.use('en');
  } else {
    translateService.use('it');
  }
}

export const presentToast = async (toastController: ToastController, message: string, error: boolean) => {
  const toast = await toastController.create({
    message: message,
    icon: error ? 'close-circle' : 'checkmark-circle',
    color: error ? 'danger' : 'primary',
    position: 'top',
    duration: 2000
  });
  await toast.present();
}
