import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AccountService} from '../../services/account.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {SessionService} from '../../store/session.service';
import {TranslateService} from '@ngx-translate/core';
import {validateConfirmPassword, switchLanguage, presentToast} from '../../util';
import {IonSlides} from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit, OnDestroy {

  @ViewChild('registrationSlider') slides: IonSlides;

  emailFC: FormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFC1: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.pattern('(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^0-9]*[0-9]).{8,}')
  ]);
  passwordFC2: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.pattern('(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^0-9]*[0-9]).{8,}'),
  ]);

  index: number = 0;

  emailFG: FormGroup = new FormGroup({
   email: this.emailFC
  });

  passwordFG: FormGroup = new FormGroup({
    password1: this.passwordFC1,
    password2: this.passwordFC2,
  }, (g: FormGroup) => validateConfirmPassword(g));


  constructor(
    private router: Router,
    private sessionService: SessionService,
    private accountService: AccountService,
    public translateService: TranslateService,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.resetForms();
  }

  ionViewWillLeave() {
    this.resetForms();
  }

  resetForms() {
    this.emailFG.reset();
    this.passwordFG.reset();
    this.index = 0;
    this.slides.slideTo(this.index).then();
  }

  onEmailConfirm() {
    this.emailFG.updateValueAndValidity();
    if(this.emailFG.valid) {
      this.accountService.isUserAvailable(this.emailFC.value).subscribe({
        next: () => {
          this.index = 1;
          this.slides.slideTo(this.index).then();
        },
        error: (error) => {
          presentToast(
            this.toastController,
            this.translateService.instant(
              error.status === 409 ?
                'register.error.userNotAvailable' :
                'error.api.default'
            ),
            true
          ).then();

          if(error.status === 409)
            this.emailFC.setErrors({'incorrect': true});
        }});
    }
  }

  onSubmit() {
    this.emailFG.updateValueAndValidity();
    this.passwordFG.updateValueAndValidity();
    let error: string = this.checkError();

    if (error !== null) {
      presentToast(
        this.toastController,
        this.translateService.instant(error),
        true
      ).then();
    }
    else if (
      this.emailFG.valid &&
      this.passwordFG.valid &&
      this.passwordFC1.value === this.passwordFC2.value
    ) {
      const user = {
        username: this.emailFC.value,
        password: this.passwordFC1.value,
      };

      this.accountService.register(user).subscribe({
        next: () => {
          this.router.navigate(['/login'], {replaceUrl: true}).then();

          presentToast(
            this.toastController,
            this.translateService.instant(
              'register.registrationDone'
            ),
            false
          ).then();
        },
        error: () => {
          presentToast(
            this.toastController,
            this.translateService.instant('error.api.default'),
            true
          ).then();
          this.emailFC.setErrors({'incorrect': true});
        }});
    }
  }

  checkError() : string {
    if (this.emailFC.hasError('required')){
      return 'register.error.emptyEmail';
    } else if (this.passwordFC1.hasError('required')) {
      return 'register.error.emptyPassword';
    } else if (this.passwordFC1.hasError('pattern') || this.passwordFC1.hasError('minLength')) {
      return 'register.error.wrongPassword';
    } else if (this.passwordFC1.value !== this.passwordFC2.value) {
      return 'register.error.differentPasswords';
    }

    return null;
  }

  ngOnDestroy() {}

  checkEmail(): boolean {
    return this.emailFG.valid;
  }

  checkPsw(): boolean {
    return this.passwordFG.valid;
  }

  goBack() {
    this.passwordFG.reset();
    this.index = 0;
    this.slides.slideTo(this.index).then();
  }

  switchLanguage() {
    switchLanguage(this.translateService);
  }

}
