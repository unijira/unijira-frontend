import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { HostListener } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from '../store/session.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  emailFC: FormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFC1: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
  ]);
  passwordFC2: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
  ]);

  serverResponseOk: String = null;
  serverResponseErr: String = null;

  registrationFG: FormGroup = new FormGroup({
    email: this.emailFC,
    password1: this.passwordFC1,
    password2: this.passwordFC2,
  });

  constructor(
    private router: Router,
    private sessionService: SessionService,
    private accountService: AccountService
  ) {}

  ngOnInit() {}

  onSubmit() {
    if (
      this.registrationFG.valid &&
      this.passwordFC1.value === this.passwordFC2.value
    ) {
      let user = {
        username: this.emailFC.value,
        password: this.passwordFC1.value,
      };

      this.accountService.register(user).subscribe(
        (response) => {
          this.serverResponseOk = 'OK';
          this.serverResponseErr = '';
          this.registrationFG.reset();
        },
        (error) => {
          this.serverResponseOk = '';
          this.serverResponseErr = 'Errore';
        }
      );
    } else {
    }
  }
}
