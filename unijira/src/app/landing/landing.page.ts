import { SessionService } from '../store/session.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/User';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {
  user: User = new User();

  constructor(private router: Router, private sessionService: SessionService) {}

  ngOnInit() {
    this.user.username = 'admin';
    this.user.token = 'token';
    this.sessionService.setUser(this.user);

    setTimeout(() => {
      this.sessionService.userLogged(true);
      this.router.navigate(['/home']);
    }, 1500);
  }
}
