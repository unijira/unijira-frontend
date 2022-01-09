import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {SessionService} from '../../../../store/session.service';
import {AlertController, IonAccordionGroup, ToastController} from '@ionic/angular';
import {ProjectService} from '../../../../services/project/project.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {Project} from '../../../../models/projects/Project';
import {Subscription} from 'rxjs';
import {Membership} from '../../../../models/projects/Membership';
import {UserService} from '../../../../services/user/user.service';
import {MembershipStatus} from '../../../../models/projects/MembershipStatus';
import {PageService} from '../../../../services/page.service';
import {FormControl, Validators} from '@angular/forms';
import {UserInfo} from '../../../../models/users/UserInfo';

@Component({
  selector: 'app-invitations',
  templateUrl: './invitations.page.html',
  styleUrls: ['./invitations.page.scss'],
})
export class InvitationsPage implements OnInit {

  @ViewChild(IonAccordionGroup, { static: true }) accordionGroup: IonAccordionGroup;

  @Input() project: Project;
  @Input() projectSubscription: Subscription;

  @Input() searchTerm: string;

  @Input() invites: string[] = [];
  @Input() filters = [
    { value: MembershipStatus.pending,  translate: 'project.settings.invitations.pending'},
    { value: MembershipStatus.enabled,  translate: 'project.settings.invitations.enabled'},
    { value: MembershipStatus.disabled, translate: 'project.settings.invitations.disabled'}
  ];

  filterType: string[] = [];

  // eslint-disable-next-line @typescript-eslint/naming-convention
  MembershipStatus = MembershipStatus;
  memberships: Array<Membership>;

  userInfoSubscription: Subscription;
  userInfo: UserInfo;
  users: string[] = [];

  mailForm: FormControl = new FormControl('', [Validators.required, Validators.email]);

  constructor(private sessionService: SessionService,
              public alertController: AlertController,
              private projectService: ProjectService,
              private activatedRoute: ActivatedRoute,
              private translateService: TranslateService,
              private router: Router,
              public toastController: ToastController,
              public usersService: UserService,
              private pageService: PageService) {

    this.pageService.setTitle(['project.pages.settings','project.pages.settings.invitations']);

    this.userInfoSubscription = sessionService.getUserInfo().subscribe(info => {

      if(!this.userInfo) {
        this.userInfo = info;
      }

    });

    this.activatedRoute.params.subscribe(params => {

      this.projectSubscription = this.projectService.getProject(params.id).subscribe((p) => {

        this.project = p;

        if(p) {

          this.projectService.getMemberships(p.id).subscribe(
            members => {

              this.memberships = members;

              members.forEach(member => {
                  this.usersService.getUser(member.keyUserId).subscribe(user => {
                    member.userInfo = user;
                    this.users.push(user.username);
                  });
                }
              );

            }
          );

        }

      });

    });

  }

  get filteredMemberships(): Membership[] {

    const filtered = [];

    if(this.memberships === undefined) {
      return filtered;
    }

    this.filters.forEach(f => {

        this.memberships.forEach(membership => {

          if (membership.status === f.value && !(this.filterType.includes(f.value))) {
            filtered.push(membership);
          }

        });

      }
    );

    if (!this.searchTerm) {
      return filtered;
    } else {
      return filtered.filter(membership => membership.userInfo.username.toLowerCase().includes(this.searchTerm.toLowerCase()));
    }

  }

  ngOnInit() {

  }

  open() {
    this.accordionGroup.value = this.accordionGroup.value === 'invitations' ? undefined : 'invitations';
  }

  invite() {

    if(this.mailForm.value === this.userInfo.username || this.users.includes(this.mailForm.value)) {
      return;
    }

    this.mailForm.markAllAsTouched();
    this.mailForm.updateValueAndValidity();

    if (this.mailForm.valid && !this.invites.includes(this.mailForm.value)) {
      this.invites.push(this.mailForm.value);
    }

    this.mailForm.setValue('');

  }

  delete(invites: string) {
    this.invites = this.invites.filter(obj => obj !== invites);
  }

  sendInvitations() {

    this.showAlert(this.translateService.instant('project.settings.invitations.alert.title'),
      this.translateService.instant('project.settings.invitations.alert.description'),
      this.translateService.instant('wizard.alert.message.button.cancel'),
      this.translateService.instant('wizard.alert.message.button.confirm'))
      .then(results => {

        if (results) {

          this.projectService.sendInvitations(this.project.id, this.invites).subscribe(i => {

            if(i) {

              this.presentToast(this.translateService.instant('project.settings.invitations.toast.success')).then();
              this.accordionGroup.value = undefined;
              this.invites = [];

              this.projectService.getMemberships(this.project.id).subscribe(
                members => {
                  this.memberships = members;
                  members.forEach(member => {
                      this.usersService.getUser(member.keyUserId).subscribe(user => member.userInfo = user);
                    }
                  );
                }
              );

            } else {

              this.presentToast(this.translateService.instant('project.settings.invitations.toast.failed')).then();
              this.accordionGroup.value = undefined;
              this.invites = [];

            }

          });
        }

      });


  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      position: 'top',
      duration: 4000
    });
    await toast.present();
  }

  async showAlert(header: string, message: string, cancel: string, confirm: string): Promise<any> {

    return new Promise(async (resolve) => {

      const alert = await this.alertController.create({
        header,
        message,
        buttons: [
          {
            text: cancel,
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              resolve(false);
            }
          }, {
            text: confirm,
            handler: () => {
              resolve(true);
            }
          }
        ]
      });

      await alert.present();

    });
  }

}
