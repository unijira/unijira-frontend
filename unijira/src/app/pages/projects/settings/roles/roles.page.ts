import {Component, Input, OnInit} from '@angular/core';
import {PageService} from '../../../../services/page.service';
import {SessionService} from '../../../../store/session.service';
import {AlertController, ToastController} from '@ionic/angular';
import {ProjectService} from '../../../../services/common/project.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {UsersService} from '../../../../services/common/users.service';
import {MembershipRoles} from '../../../../models/projects/MembershipRoles';
import {MembershipStatus} from '../../../../models/projects/MembershipStatus';
import {Project} from '../../../../models/projects/Project';
import {Subscription} from 'rxjs';
import {Membership} from '../../../../models/projects/Membership';
import {UserInfo} from '../../../../models/users/UserInfo';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.page.html',
  styleUrls: ['./roles.page.scss'],
})
export class RolesPage implements OnInit {

  @Input() project: Project;
  @Input() projectSubscription: Subscription;

  @Input() searchTerm: string;
  @Input() updates = false;

  @Input() filters = [
    { value: MembershipRoles.member,  translate: 'project.settings.roles.member',  active: true },
    { value: MembershipRoles.productOwner,  translate: 'project.settings.roles.product.owner',  active: true },
    { value: MembershipRoles.scrumMaster, translate: 'project.settings.roles.scrum.master', active: true },
    { value: MembershipRoles.manager, translate: 'project.settings.roles.manager', active: true },
    { value: MembershipRoles.stakeholder, translate: 'project.settings.roles.stakeholder', active: true }
  ];

  @Input() users = [];

  // eslint-disable-next-line @typescript-eslint/naming-convention
  MembershipRoles = MembershipRoles;
  memberships: Array<Membership>;

  userInfoSubscription: Subscription;
  userInfo: UserInfo;

  constructor(private sessionService: SessionService,
              public alertController: AlertController,
              private projectService: ProjectService,
              private activatedRoute: ActivatedRoute,
              private translateService: TranslateService,
              private router: Router,
              public toastController: ToastController,
              public usersService: UsersService,
              private pageService: PageService) {

    this.pageService.setTitle(['project.pages.settings','project.pages.settings.roles']);

    this.userInfoSubscription = sessionService.getUserInfo().subscribe(info => this.userInfo = info);

    this.projectSubscription = this.sessionService.getProject().subscribe((p) => {

      this.project = p;

      if(p) {

        this.projectService.getMemberships(p.id).subscribe(
          members => {

            this.memberships = members;

            console.log(this.memberships);

            members.forEach(member => {
                this.usersService.getUser(member.keyUserId).subscribe(user => {
                  member.userInfo = user;
                });
              }
            );

          }
        );

      }

    });

    this.activatedRoute.params.subscribe(params => this.sessionService.loadProject(params.id));

  }

  get filteredMemberships(): Membership[] {

    const filtered = [];

    if(this.memberships === undefined) {
      return filtered;
    }

    this.filters.forEach(f => {

        if(f.active) {

          this.memberships.forEach(membership => {

            if (membership.role === f.value) {
              filtered.push(membership);
            }

          });
        }

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

  updateRoles() {


    this.showAlert(this.translateService.instant('project.settings.roles.alert.title'),
      this.translateService.instant('project.settings.roles.alert.description'),
      this.translateService.instant('wizard.alert.message.button.cancel'),
      this.translateService.instant('wizard.alert.message.button.confirm'))
      .then(results => {

        if (results) {

          this.memberships.forEach(member => {

            this.projectService.updateMemberships(member.keyProjectId, member.keyUserId, member.role, member.status, member.permissions).subscribe(i => {

              if (i) {

                this.presentToast(this.translateService.instant('project.settings.roles.toast.success')).then();

                this.projectService.getMemberships(this.project.id).subscribe(
                  members => {
                    this.memberships = members;
                    members.forEach(m => {
                        this.usersService.getUser(m.keyUserId).subscribe(user => m.userInfo = user);
                      }
                    );
                  }
                );

              } else {

                this.presentToast(this.translateService.instant('project.settings.roles.toast.failed')).then();

              }

            });

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
