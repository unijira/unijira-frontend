import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {SessionService} from './store/session.service';
import {unsubscribeAll} from './util';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import * as moment from 'moment';
import 'moment/locale/it';
import 'moment/locale/en-gb';

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

    translateService.setDefaultLang('it');
    translateService.use('it');
    translateService.onLangChange.subscribe(() => {
      moment.locale(translateService.currentLang);
    });

    moment.locale('it');

    this.pages.push({name: 'home', url: '/home'});
    this.pages.push({name: 'backlog', url: '/backlog'});
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
      document.body.setAttribute('color-theme', 'dark');
    } else {
      document.body.setAttribute('color-theme', 'light');
    }
  }

  toggleLoading(toggle: boolean) {
    this.sessionService.toggleLoading(toggle);
  }

  switchLanguage() {
    if (this.translateService.currentLang === 'it') {
      this.translateService.use('en');
    } else {
      this.translateService.use('it');
    }
  }

  ngOnDestroy() {
    unsubscribeAll(this.loadingSubscription);
  }

}
