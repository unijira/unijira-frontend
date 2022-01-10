import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {SessionService} from './store/session.service';
import {switchColorTheme, switchLanguage, unsubscribeAll} from './util';
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

  isDisabled = false;

  projectSubscription: Subscription;
  project: Project;

  public settings = [];

  constructor(
    public router: Router,
    public translateService: TranslateService,
    private sessionService: SessionService,
    private library: FaIconLibrary,
    private popCtrl: PopoverController
  ) {

    library.addIconPacks(fas, fab, far);

    this.loadingSubscription = sessionService.getLoading().subscribe((load) => {
      this.loading = load;
    });

    this.userInfoSubscription = sessionService.getUserInfo().subscribe(info => this.userInfo = info);

    this.configLang();
    this.configTheme();

    this.projectSubscription = this.sessionService.getProject().subscribe((proj) => {

      if (this.project !== proj && proj) {

        this.project = proj;

        this.pages = [
          {name: 'project.pages.board', url: `/projects/${proj.id}`, icon: 'clipboard-outline'},
          {name: 'project.pages.backlog', url: `/projects/${proj.id}/backlog`, icon: 'albums-outline'},
          {name: 'project.pages.roadmap', url: `/projects/${proj.id}/roadmap`, icon: 'map-outline'},
          {name: 'project.pages.tickets', url: `/projects/${proj.id}/tickets`, icon: 'ticket-outline'},
          {name: 'project.pages.releases', url: `/projects/${proj.id}/releases`, icon: 'cube-outline'},
          {name: 'project.pages.settings', url: `/projects/${proj.id}/settings/details`, icon: 'settings-outline'},
        ];

        this.settings = [
          {name: 'project.pages.settings.details', url: `/projects/${proj.id}/settings/details`, icon: 'information-outline'},
          {name: 'project.pages.settings.invitations', url: `/projects/${proj.id}/settings/invitations`, icon: 'mail-outline'},
          {name: 'project.pages.settings.roles', url: `/projects/${proj.id}/settings/roles`, icon: 'people-outline'},
          {name: 'project.pages.settings.permissions', url: `/projects/${proj.id}/settings/permissions`, icon: 'shield-checkmark-outline'},
        ];

      }
    });

  }


  get currentColorTheme() {
    return document.body.getAttribute('color-theme');
  }


  configLang() {
    this.translateService.onLangChange.subscribe(() => {
      moment.locale(this.translateService.currentLang);
    });

    this.translateService.setDefaultLang('it');

    const deviceLang = localStorage.getItem('currentLang');

    if(deviceLang)
      {this.translateService.use(deviceLang);}
    else {
      this.translateService.use('it');
    }
  }


  configTheme() {
    const deviceTheme = localStorage.getItem('colorTheme');

    if(deviceTheme)
      {document.body.setAttribute('color-theme', deviceTheme);}
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
    switchColorTheme(event.detail.checked);
  }

  toggleLoading(toggle: boolean) {
    this.sessionService.toggleLoading(toggle);
  }

  switchLanguage() {
    switchLanguage(this.translateService);
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

  checkUrl() {
    return /\/projects\/\d/.test(this.router.url) && !(this.router.url.includes('invite'));
  }

  isPageWithoutHeader() {
    return /\/login/.test(this.router.url) ||
      /\/registration/.test(this.router.url) ||
      /\/activate/.test(this.router.url) ||
      /\/invite/.test(this.router.url);
  }
}
