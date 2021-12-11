import {Component, OnDestroy, OnInit} from '@angular/core';
import {SessionState} from "./store/session.reducer";
import {Subscription} from "rxjs";
import {SessionService} from "./store/session.service";
import {unsubscribeAll} from "./util";
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";


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
    public router: Router,
    public translateService: TranslateService
  ) {
    this.loadingSubscription = sessionService.getLoading().subscribe(load => {
      this.loading = load;
    });


    this.isLoggedSubscription = sessionService.getIsUserLogged().subscribe(log => {
      this.isLogged = log;
      // this.router.navigate(['/login']);
    });

    translateService.setDefaultLang('it');
    translateService.use('it');

    this.pages.push({name: "home", url: "/home"});
    this.pages.push({name: "backlog", url: "/backlog"});
  }

  ngOnInit() {
    this.isLoggedSubscription = this.sessionService.getIsUserLogged().subscribe(log => {
      this.isLogged = log;
      if (!log){
        this.router.navigate(['/login']);
      }
    });
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

  switchLanguage() {
    if (this.translateService.currentLang === 'it') {
      this.translateService.use('en')
    } else {
      this.translateService.use('it');
    }
  }

  ngOnDestroy() {
    unsubscribeAll(this.loadingSubscription);
  }

}
