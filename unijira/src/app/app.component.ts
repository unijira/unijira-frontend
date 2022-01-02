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
import { trigger,style,transition,animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  animations:[
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0 }), animate('300ms', style({ opacity: 1 }))]
      ),
      transition(':leave',
        [style({ opacity: 1 }), animate('300ms', style({ opacity: 0 }))]
      )
    ])
]})

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
          {name: 'project.pages.board', url: `home/projects/${proj.id}/project-home`, icon: 'clipboard-outline'},
          {name: 'project.pages.backlog', url: `home/projects/${proj.id}/backlog`, icon: 'albums-outline'},
          {name: 'project.pages.roadmap', url: `home/projects/${proj.id}/roadmap` + proj.id, icon: 'map-outline'},
          {name: 'project.pages.settings', url: `home/projects/${proj.id}/settings/details`, icon: 'settings-outline'},
        ];

        this.settings = [
          {name: 'project.pages.settings.details', url: `home/projects/${proj.id}/settings/details`, icon: 'information-outline'},
          {name: 'project.pages.settings.notifications', url: `home/projects/${proj.id}/settings/notifications`, icon: 'notifications-outline'},
          {name: 'project.pages.settings.roles', url: `home/projects/${proj.id}/settings/roles`, icon: 'people-outline'},
          {name: 'project.pages.settings.invitations', url: `home/projects/${proj.id}/settings/invitations`, icon: 'mail-outline'},
          {name: 'project.pages.settings.permissions', url: `home/projects/${proj.id}/settings/permissions`, icon: 'shield-checkmark-outline'},
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

  checkUrl() {
    return /home\/projects\/\d/.test(this.router.url);
  }

}
