import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {SessionService} from '../../store/session.service';
import {Subscription} from 'rxjs';
import {unsubscribeAll, switchLanguage, presentToast, switchColorTheme} from '../../util';
import {PageService} from '../../services/page.service';
import {TranslateService} from '@ngx-translate/core';
import {ToastController} from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  emailFC: FormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFC: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.pattern('(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^0-9]*[0-9]).{8,}')]
  );
  rememberMeFC: FormControl = new FormControl();

  loginSubscription: Subscription;

  wrongCredentialSubscription: Subscription;

  loginFG: FormGroup = new FormGroup({
    email: this.emailFC,
    password: this.passwordFC,
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sessionService: SessionService,
    private pageService: PageService,
    public translateService: TranslateService,
    private toastController: ToastController
  ) {
    this.pageService.setTitle('login.title');

    this.loginSubscription = this.sessionService
      .getIsUserLogged()
      .subscribe((logged) => {
        if (logged === true) {
          this.redirect();
        }
      });

    this.wrongCredentialSubscription = this.sessionService.getWrongCredential()
      .subscribe(wrong => {
        if(wrong) {
          presentToast(
            this.toastController,
            this.translateService.instant(
              'login.wrongCredential'
            ),
            true
          ).then(() => this.sessionService.setWrongCredential(false));
        }
      });
  }
  get currentColorTheme() {
    return document.body.getAttribute('color-theme');
  }
  @HostListener('document:keydown.enter', ['$event'])
  handleKeyDown(_event: KeyboardEvent) {
    this.logIn();
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.loginFG.reset();
    this.rememberMeFC.reset();
  }

  ionViewWillLeave() {
    this.loginFG.reset();
    this.rememberMeFC.reset();
  }

  logIn() {
    this.loginFG.markAllAsTouched();
    this.loginFG.updateValueAndValidity();
    if (this.loginFG.valid) {
      this.sessionService.logIn(this.emailFC.value, this.passwordFC.value);
    }
  }

  ngOnDestroy(): void {
    unsubscribeAll(this.loginSubscription, this.wrongCredentialSubscription);
  }

  check(): boolean {
    return this.emailFC.valid && this.passwordFC.valid;
  }
  switchLanguage() {
    switchLanguage(this.translateService);
  }

  onToggleColorTheme(event) {
    switchColorTheme(event.detail.checked);
  }
  private redirect() {
    if(this.route.snapshot.paramMap.has('idp')) {
      this.router.navigate([this.route.snapshot.paramMap.get('idp')], {replaceUrl: true}).then();
    } else {
      this.router.navigate(['/home'], {replaceUrl: true}).then();
    }
  }






}
