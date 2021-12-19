import {Component, OnDestroy, OnInit} from '@angular/core';
import {AccountService} from '../services/account.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {SessionService} from '../store/session.service';
import {TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs';
import {getTranslation, presentAlertConfirm, unsubscribeAll, validateConfirmPassword} from '../util';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit, OnDestroy {
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

  serverResponseOk: string = null;
  serverResponseErr: string = null;
  error = '';

  registrationFG: FormGroup = new FormGroup({
    email: this.emailFC,
    password1: this.passwordFC1,
    password2: this.passwordFC2,
  }, (g: FormGroup) => validateConfirmPassword(g));
  registrationFGSubscription: Subscription;

  constructor(
    private router: Router,
    private sessionService: SessionService,
    private accountService: AccountService,
    private translateService: TranslateService,
    private alertController: AlertController
  ) {
    this.registrationFGSubscription = this.registrationFG.statusChanges.subscribe(() => this.error = '');
  }

  ngOnInit() {}

  onSubmit() {
    this.registrationFG.updateValueAndValidity();
    this.checkError();
    if (
      this.registrationFG.valid &&
      this.passwordFC1.value === this.passwordFC2.value
    ) {
      const user = {
        username: this.emailFC.value,
        password: this.passwordFC1.value,
      };

      this.accountService.register(user).subscribe(
        (response) => {
          this.router.navigate(['/login']);
          presentAlertConfirm(this.alertController,
            getTranslation(this.translateService, 'welcome'),
            getTranslation(this.translateService, 'register.registrationDone')).then();
          // this.serverResponseOk = 'OK';
          // this.serverResponseErr = '';
          // this.registrationFG.reset();
        },
        (error) => {
          this.serverResponseOk = '';
          this.serverResponseErr = 'Errore';
        }
      );
    }
  }

  checkError() {
    if (this.emailFC.hasError('required')){
      this.error = getTranslation(this.translateService, 'register.error.emptyEmail');
    } else if (this.passwordFC1.hasError('required')) {
      this.error = getTranslation(this.translateService, 'register.error.emptyPassword');
    } else if (this.passwordFC1.hasError('pattern') || this.passwordFC1.hasError('minLength')) {
      this.error = getTranslation(this.translateService, 'register.error.wrongPassword');
    } else if (this.passwordFC1.value !== this.passwordFC2.value) {
      this.error = getTranslation(this.translateService, 'register.error.differentPasswords');
    }
  }

  ngOnDestroy() {
    unsubscribeAll(this.registrationFGSubscription);
  }

}
