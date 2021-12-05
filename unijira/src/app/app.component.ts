import {Component, OnDestroy, OnInit} from '@angular/core';
import {SessionState} from "./store/session.reducer";
import {Subscription} from "rxjs";
import {SessionService} from "./store/session.service";
import {unsubscribeAll} from "./util";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {

  pages: any[] = [];

  loadingSubscription: Subscription;
  loading = false;

  isLoggedSubscription: Subscription;
  isLogged = false;
  constructor(
    public sessionService: SessionService,
    public router: Router
  ) {
    this.loadingSubscription = sessionService.getLoading().subscribe(load => {
      this.loading = load;
    });

    this.isLoggedSubscription = sessionService.getIsUserLogged().subscribe(log => {
      this.isLogged = log;
      // this.router.navigate(['/login']);
    });

    this.pages.push({name: "tab 1", url: "/home"});
    this.pages.push({name: "tab 2", url: "/home"});
  }

  ngOnInit() {

  }

  onToggleColorTheme(event) {
    if (event.detail.checked) {
      document.body.setAttribute('color-theme', 'dark')
    } else {
      document.body.setAttribute('color-theme', 'light')
    }
  }

  toggleLoading(toggle: boolean) {
    this.sessionService.toggleLoading(toggle);
  }

  ngOnDestroy() {
    unsubscribeAll(this.loadingSubscription);
  }

}
