import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {SessionService} from '../../store/session.service';
import {Subscription} from 'rxjs';
import {unsubscribeAll} from '../../util';
import {PageService} from '../../services/page.service';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {

  emailFC: FormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFC: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.pattern('(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^0-9]*[0-9]).{8,}')]
  );

  loginSubscription: Subscription;

  wrongCredentialSubscription: Subscription;
  areWrongCredential = false;

  loginFG: FormGroup = new FormGroup({
    email: this.emailFC,
    password: this.passwordFC
  });
  formControlSubscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sessionService: SessionService,
    private pageService: PageService,
    public translateService: TranslateService,
  ) {

    this.pageService.setTitle('login.title');

    this.loginSubscription = this.sessionService.getIsUserLogged().subscribe(logged => {
      if (logged === true) {
        this.redirect();
      }
    });

    this.wrongCredentialSubscription = this.sessionService.getWrongCredential()
      .subscribe(wrong => this.areWrongCredential = wrong);

    this.formControlSubscription = this.loginFG.statusChanges.subscribe(() => this.sessionService.setWrongCredential(false));
  }


  ngOnInit() {
  }

  logIn() {
    this.loginFG.markAllAsTouched();
    this.loginFG.updateValueAndValidity();
    if (this.loginFG.valid) {
      this.sessionService.logIn(this.emailFC.value, this.passwordFC.value);
    }
  }

  ngOnDestroy(): void {
    unsubscribeAll(this.formControlSubscription, this.loginSubscription, this.wrongCredentialSubscription);
  }


  check(): boolean {
    return this.emailFC.valid && this.passwordFC.valid;
  }

  private redirect() {
    if(this.route.snapshot.paramMap.has('idp')) {
      this.router.navigate([this.route.snapshot.paramMap.get('idp')]).then();
    } else {
      this.router.navigate(['/home']).then();
    }
  }

  switchLanguage() {
    if (this.translateService.currentLang === 'it') {
      this.translateService.use('en');
    } else {
      this.translateService.use('it');
    }
  }
}
