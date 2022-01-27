import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {PageService} from '../../../../services/page.service';
import {Project} from '../../../../models/projects/Project';
import {forkJoin, Observable, Subscription} from 'rxjs';
import {Membership} from '../../../../models/projects/Membership';
import {UserInfo} from '../../../../models/users/UserInfo';
import {SessionService} from '../../../../store/session.service';
import {AlertController, IonSelect, ToastController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {MembershipRoles} from '../../../../models/projects/MembershipRoles';
import {MembershipPermission} from '../../../../models/projects/MembershipPermission';
import {ProjectService} from '../../../../services/project/project.service';
import {UserService} from '../../../../services/user/user.service';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.page.html',
  styleUrls: ['./permissions.page.scss'],
})
export class PermissionsPage implements OnInit {

  @ViewChild('userSelect', { static: false }) userSelect: IonSelect;
  @ViewChild('maskSelect', { static: false }) maskSelect: IonSelect;

  @Input() project: Project;
  @Input() projectSubscription: Subscription;

  @Input() updates = false;

  @Input() permissions = [

    { type: MembershipPermission.admin,
      title: 'project.settings.permissions.admin.title',
      description: 'project.settings.permissions.admin.description',
      value: false },

    { type: MembershipPermission.details,
      title: 'project.settings.permissions.details.title',
      description: 'project.settings.permissions.details.description',
      value: false },

    { type: MembershipPermission.invitations,
      title: 'project.settings.permissions.invitations.title',
      description: 'project.settings.permissions.invitations.description',
      value: false },

    { type: MembershipPermission.roles,
      title: 'project.settings.permissions.roles.title',
      description: 'project.settings.permissions.roles.description',
      value: false },

    { type: MembershipPermission.ticket,
      title: 'project.settings.permissions.ticket.title',
      description: 'project.settings.permissions.ticket.description',
      value: false }

  ];
  @Input() initialPermissions: any = this.permissions;

  @Input() masks = [

    { role: MembershipRoles.member,
      permissions: [MembershipPermission.details],
      translate: 'project.settings.roles.member'},

    { role: MembershipRoles.productOwner,
      permissions: [MembershipPermission.details, MembershipPermission.admin,
                    MembershipPermission.invitations],
      translate: 'project.settings.roles.product.owner'},

    { role: MembershipRoles.scrumMaster,
      permissions: [MembershipPermission.details, MembershipPermission.admin,
                    MembershipPermission.invitations, MembershipPermission.roles],
      translate: 'project.settings.roles.scrum.master'},

    { role: MembershipRoles.manager,
      permissions: [MembershipPermission.details],
      translate: 'project.settings.roles.manager'},

    { role: MembershipRoles.stakeholder,
      permissions: [MembershipPermission.admin],
      translate: 'project.settings.roles.stakeholder'}

  ];

  // eslint-disable-next-line @typescript-eslint/naming-convention
  MembershipPermission = MembershipPermission;
  selectedMembership: Membership = null;
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

              members.forEach(member => {

                  if (member.keyUserId === this.userInfo.id) {
                    this.userMembership = member;
                  }

                  this.usersService.getUser(member.keyUserId).subscribe(user => {
                    member.userInfo = user;
                  });

                }
              );

            }
          );

        }

      });

    });

  }

  ngOnInit() {}

  updatePermissions() {

    this.memberships.forEach(membership => {
      if(membership.userInfo.username === this.selectedMembership.userInfo.username) {

        const p = [];

        this.permissions.forEach(j => {
          if(j.value) {
            p.push(j.type);
          }
        });

        membership.permissions = p;

      }
    });

    this.showAlert(this.translateService.instant('project.settings.permissions.alert.title'),
      this.translateService.instant('project.settings.permissions.alert.description'),
      this.translateService.instant('wizard.alert.message.button.cancel'),
      this.translateService.instant('wizard.alert.message.button.confirm'))
      .then(results => {

        if (results) {

          const obs: Observable<Membership>[] = [];

          this.memberships.forEach(member => {
            obs.push(this.projectService.updateMemberships(member.keyProjectId, member.keyUserId, member.role, member.status, member.permissions));
          });


          forkJoin(obs).subscribe(i => {

            if(i.filter(j => j).length > 0) {

              this.permissions = this.initialPermissions;
              this.selectedMembership = null;
              this.updates = false;
              this.userSelect.value = '';
              this.maskSelect.value = '';

              this.projectService.getMemberships(this.project.id).subscribe(
                members => {

                  this.memberships = members;

                  members.forEach(member => {

                      this.usersService.getUser(member.keyUserId).subscribe(user => {
                        member.userInfo = user;
                      });

                    }
                  );

                }
              );

              this.presentToast(this.translateService.instant('project.settings.permissions.toast.success')).then();

            } else {
              this.presentToast(this.translateService.instant('project.settings.permissions.toast.failed')).then();
            }

          });

        }

      });

  }

  onChangeUser($event: any) {

    if(this.selectedMembership !== null) {

      this.maskSelect.value = '';

      this.memberships.forEach(membership => {
          if(membership.userInfo.username === this.selectedMembership.userInfo.username) {

            const p = [];
            const differences = [];

            this.permissions.forEach(j => {
              if(j.value) {
                p.push(j.type);
              }
            });

            membership.permissions.forEach(i => {
              this.permissions.forEach(j => {

                if(j.type === i && !j.value) {
                  differences.push(j.type);
                }

                if(membership.permissions.filter(e => e === j.type).length === 0 && j.value) {
                  differences.push(j.type);
                }

              });
            });

            if(differences.length > 0 || p.length > membership.permissions.length ||
              p.length < membership.permissions.length) {

              membership.permissions = p;
              this.updates = true;

            }

          }
      });

    }

    this.permissions.forEach(j => {
      j.value = false;
    });

    this.memberships.forEach(membership => {

      if(membership.userInfo !== undefined){

        if(membership.userInfo.username === $event.detail.value) {

          membership.permissions.forEach(i => {
            this.permissions.forEach(j => {
              if(i === j.type) {
                j.value = true;
              }
            });
          });

          this.selectedMembership = membership;

        }

      }

    });

  }

  check() {

    if(this.updates) {
      return true;
    }

    const p = [];
    const differences = [];

    this.permissions.forEach(j => {
      if(j.value) {
        p.push(j.type);
      }
    });

    if(p.length > this.selectedMembership.permissions.length ||
      p.length < this.selectedMembership.permissions.length) {
      return true;
    }

    this.selectedMembership.permissions.forEach(i => {
      this.permissions.forEach(j => {

        if(j.type === i && !j.value) {
          differences.push(j.type);
        }

        if(this.selectedMembership.permissions.filter(e => e === j.type).length === 0 && j.value) {
          differences.push(j.type);
        }

      });
    });

    return differences.length > 0;

  }

  onChangeMask($event: any) {

    this.permissions.forEach(j => {
      j.value = false;
    });

    this.masks.forEach(mask => {

        if(mask.role === $event.detail.value) {

          mask.permissions.forEach(i => {

            this.permissions.forEach(j => {

              if(i === j.type) {
                j.value = true;
              }

            });

          });

          return;

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

  restorePermissions() {

    this.permissions.forEach(j => {
      j.value = false;
    });

    this.maskSelect.value = '';

  }

}
