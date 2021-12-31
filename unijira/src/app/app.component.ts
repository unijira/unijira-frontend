import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {SessionService} from './store/session.service';
import {unsubscribeAll} from './util';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import * as moment from 'moment';
import 'moment/locale/it';
import 'moment/locale/en-gb';
import {UserInfo} from './models/users/UserInfo';
import {PopoverController} from '@ionic/angular';
import {UserActionPopoverComponent} from './popovers/user-action-popover/user-action-popover.component';
import {FaIconLibrary,} from '@fortawesome/angular-fontawesome';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import {fab} from '@fortawesome/free-brands-svg-icons';
import {NotificationsComponent} from './components/notifications/notifications.component';
import {Project} from './models/projects/Project';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent implements OnInit, OnDestroy {

  @ViewChild('notifications') notificationsComponent: NotificationsComponent;

  unreadNotificationsCount = 0;
  public pages = [];

  loadingSubscription: Subscription;
  loading = false;

  isLoggedSubscription: Subscription;
  isLogged = false;

  userInfoSubscription: Subscription;
  userInfo: UserInfo;

  isDisabled: boolean = false;

  projectSubscription: Subscription;
  project: Project;

  constructor(
    public sessionService: SessionService,
    public router: Router,
    public translateService: TranslateService,
    library: FaIconLibrary,
    private popCtrl: PopoverController
  ) {

    library.addIconPacks(fas, fab, far);

    this.loadingSubscription = sessionService.getLoading().subscribe((load) => {
      this.loading = load;
    });

    this.userInfoSubscription = sessionService.getUserInfo().subscribe(info => this.userInfo = info);

    translateService.setDefaultLang('it');
    translateService.use('it');
    translateService.onLangChange.subscribe(() => {
      moment.locale(translateService.currentLang);
    });

    this.projectSubscription = this.sessionService.getProject().subscribe((proj) => {
      this.project = proj;
      if (proj) {
        this.pages = [
          {name: 'board', url: '/project-home/' + proj.id, icon: 'table'},
          {name: 'backlog', url: '/backlog/' + proj.id, icon: 'clipboard-list'},
          {name: 'roadmap', url: '/roadmap/' + proj.id, icon: 'road'},
        ];
      }
    });

    moment.locale('it');

  }


  get currentColorTheme() {
    return document.body.getAttribute('color-theme');
  }



  ngOnInit() {
    this.isLoggedSubscription = this.sessionService.getIsUserLogged().subscribe(log => {
      this.isLogged = log;
      if (!log){
        //this.router.navigate(['/login']);
      } else {
        this.sessionService.loadUserInfo();
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
    unsubscribeAll(this.loadingSubscription, this.isLoggedSubscription, this.userInfoSubscription);
  }


  showNotifications(e?: Event) {
    this.notificationsComponent.show(e).then();
  }

  async _userPopOver(ev: any) {
    const popOver = await this.popCtrl.create({
      component: UserActionPopoverComponent,
      cssClass: 'my-popover-class',
      event: ev,
    });

    popOver.onDidDismiss().then(data=> console.log(data));

    return await popOver.present();
  }


}
