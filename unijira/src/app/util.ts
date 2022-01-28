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
  g.get('password2').setErrors(null);
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
    localStorage.setItem('currentLang', 'en');
  } else {
    translateService.use('it');
    localStorage.setItem('currentLang', 'it');
  }
};

export const setLanguage = (translateService: TranslateService, lang: string) => {
  translateService.use(lang);
  localStorage.setItem('currentLang', lang);
};

export const switchColorTheme = (enableDark: boolean) => {
  if (enableDark) {
    document.body.setAttribute('color-theme', 'dark');
    localStorage.setItem('colorTheme', 'dark');
  } else {
    document.body.setAttribute('color-theme', 'light');
    localStorage.setItem('colorTheme', 'light');
  }
};


export const getColorTheme = () =>
  (localStorage.getItem('colorTheme') || document.body.getAttribute('color-theme')) === 'dark';

 export const setTheme = (theme: string) => {
  if (theme === 'dark') {
    document.body.setAttribute('color-theme', 'dark');
    localStorage.setItem('colorTheme', 'dark');
  } else {
    document.body.setAttribute('color-theme', 'light');
    localStorage.setItem('colorTheme', 'light');
  }
 };

export const presentToast = async (toastController: ToastController, message: string, error: boolean) => {
  const toast = await toastController.create({
    message,
    icon: error ? 'close-circle' : 'checkmark-circle',
    color: error ? 'danger' : 'primary',
    position: 'top',
    duration: 2000
  });
  await toast.present();
};

export const showAlertConfirmDiscard = async (alertController: AlertController, header: string,
                                              message: string, cancel: string, confirm: string): Promise<any> =>

  new Promise(async (resolve) => {

    const alert = await alertController.create({
      header,
      message,
      buttons: [
        {
          text: cancel,
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            resolve(false);
          }
        }, {
          text: confirm,
          handler: () => {
            resolve(true);
          }
        }
      ]
    });

    await alert.present();

  });
