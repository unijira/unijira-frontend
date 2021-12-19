import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.page.html',
  styleUrls: ['./invite.page.scss'],
})
export class InvitePage implements OnInit {

  invites: string[] = [];
  mail: string;

  mailForm: FormControl = new FormControl('', [Validators.required, Validators.email]);

  constructor() { }

  ngOnInit() {
  }

  invite() {

    this.mailForm.markAllAsTouched();
    this.mailForm.updateValueAndValidity();

    if (this.mailForm.valid && !this.invites.includes(this.mailForm.value)) {
      this.invites.push(this.mailForm.value);
    }

  }

  delete(invites: string) {
    this.invites = this.invites.filter(obj => obj !== invites);
  }

}
