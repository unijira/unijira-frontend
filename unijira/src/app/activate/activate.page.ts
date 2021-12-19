import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AccountService} from '../services/account.service';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.page.html',
  styleUrls: ['./activate.page.scss'],
})
export class ActivatePage implements OnInit {
  token: string;
  msg: string;
  color: string;

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.token = params['q'];
    });
    this.accountService.activate(this.token).subscribe(
      (res) => {
        this.color = 'success';
        this.msg = 'Your account has been activated. Please login.';
      },
      (error) => {
        this.color = 'danger';
        this.msg = 'Activation failed. Please try again.';
      }
    );
  }
}
