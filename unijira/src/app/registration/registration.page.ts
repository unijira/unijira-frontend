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
  emailFC: FormControl = new FormControl('', Validators.required);
  passwordFC1: FormControl = new FormControl('', Validators.required);
  passwordFC2: FormControl = new FormControl('', Validators.required);

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
    let user = {
      username: this.emailFC.value,
      password: this.passwordFC1.value,
    };
    console.log('Dati ', user);
    this.accountService.register(user).subscribe(
      (response) => {
        this.serverResponseOk = 'OK';
        this.serverResponseErr = '';
        this.registrationFG.reset()
      },
      (error) => {
        this.serverResponseOk = '';
        this.serverResponseErr = 'Errore';
      }
    );
  }
}
