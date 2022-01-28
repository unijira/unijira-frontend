import {Component, Input, OnInit} from '@angular/core';
import {PageService} from '../../../../services/page.service';
import {SessionService} from '../../../../store/session.service';
import {AlertController, ToastController} from '@ionic/angular';
import {ProjectService} from '../../../../services/project/project.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {UserService} from '../../../../services/user/user.service';
import {MembershipRoles} from '../../../../models/projects/MembershipRoles';
import {Project} from '../../../../models/projects/Project';
import {forkJoin, Observable, Subscription} from 'rxjs';
import {Membership} from '../../../../models/projects/Membership';
import {UserInfo} from '../../../../models/users/UserInfo';
import {MembershipPermission} from '../../../../models/projects/MembershipPermission';

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
    { value: MembershipRoles.member,  translate: 'project.settings.roles.member'},
    { value: MembershipRoles.productOwner,  translate: 'project.settings.roles.product.owner'},
    { value: MembershipRoles.scrumMaster, translate: 'project.settings.roles.scrum.master'},
    { value: MembershipRoles.manager, translate: 'project.settings.roles.manager'},
    { value: MembershipRoles.stakeholder, translate: 'project.settings.roles.stakeholder'}
  ];

  @Input() filterType: string[] = [];
  @Input() currentRoles: any = [];
  @Input() initialRoles: any = [];

  // eslint-disable-next-line @typescript-eslint/naming-convention
  MembershipRoles = MembershipRoles;
  memberships: Array<Membership>;

  userInfoSubscription: Subscription;
  userInfo: UserInfo;

  userMembership: Membership;
  membershipPermission = MembershipPermission;

  constructor(private sessionService: SessionService,
              public alertController: AlertController,
              private projectService: ProjectService,
              private activatedRoute: ActivatedRoute,
              private translateService: TranslateService,
              private router: Router,
              public toastController: ToastController,
              public usersService: UserService,
              private pageService: PageService) {

    this.pageService.setTitle(['project.pages.settings','project.pages.settings.roles']);

    this.userInfoSubscription = sessionService.getUserInfo().subscribe(info => {

      if(!this.userInfo) {
        this.userInfo = info;
      }

    });

    this.activatedRoute.params.subscribe(params => {

      this.sessionService.loadProject(params.id);

      this.projectSubscription = this.projectService.getProject(params.id).subscribe((p) => {

        this.project = p;

        if(p) {

          this.projectService.getMemberships(p.id).subscribe(
            members => {

              this.memberships = members;

              this.memberships.forEach(member => {

                if (member.keyUserId === this.userInfo.id) {
                  this.userMembership = member;
                }

                this.usersService.getUser(member.keyUserId).subscribe(user => {
                    member.userInfo = user;
                  });

                  this.currentRoles.push({keyUserId: member.keyUserId, role: member.role});
                  this.initialRoles.push({keyUserId: member.keyUserId, role: member.role});
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

          if (membership.role === f.value && !(this.filterType.includes(f.value))) {
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

  updateRoles() {

    this.showAlert(this.translateService.instant('project.settings.roles.alert.title'),
      this.translateService.instant('project.settings.roles.alert.description'),
      this.translateService.instant('wizard.alert.message.button.cancel'),
      this.translateService.instant('wizard.alert.message.button.confirm'))
      .then(results => {

        if (results) {

          const obs: Observable<Membership>[] = [];

          this.memberships.forEach(member => {
            obs.push(this.projectService.updateMemberships(member.keyProjectId, member.keyUserId, member.role, member.status, member.permissions));
          });

          forkJoin(obs).subscribe(i => {

            if (i.filter(j => j).length > 0) {

              this.projectService.getMemberships(this.project.id).subscribe(
                members => {

                  if(members) {

                    this.memberships = members;

                    this.memberships.forEach(m => {

                        if (m?.keyUserId === this.userInfo.id) {
                          this.userMembership = m;
                        }

                        this.usersService.getUser(m?.keyUserId).subscribe(user => {

                          if(user) {
                            m.userInfo = user;
                          }

                        });

                      this.currentRoles.push({keyUserId: m?.keyUserId, role: m?.role});
                      this.initialRoles.push({keyUserId: m?.keyUserId, role: m?.role});

                      }
                    );

                  }

                }
              );

              this.updates = false;

              this.presentToast(this.translateService.instant('project.settings.roles.toast.success'), 'success', 'checkmark-circle-outline').then();

            } else {

              this.presentToast(this.translateService.instant('project.settings.roles.toast.failed'), 'danger', 'alert-circle-outline').then();

            }


          });

        }

      });




  }

  async presentToast(message: string, color: string, icon: string) {
    const toast = await this.toastController.create({
      message,
      position: 'top',
      duration: 4000,
      color,
      icon
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

  updateChange($event: any, keyUserId: number | undefined) {

    let modify = false;

    this.currentRoles.forEach(item => {

      if(item.keyUserId === keyUserId) {
        item.role = $event.detail.value;
      }

    });


    this.currentRoles.forEach(i => {
      this.initialRoles.forEach(j => {

        if(i.keyUserId === j.keyUserId) {
          if(i.role !== j.role) {
            this.updates = true;
            modify = true;
          }
        }

      });
    });

    if(!modify) {
      this.updates = false;
    }

  }

}
