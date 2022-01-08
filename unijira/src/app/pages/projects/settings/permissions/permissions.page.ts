import {Component, Input, OnInit} from '@angular/core';
import {PageService} from '../../../../services/page.service';
import {Project} from '../../../../models/projects/Project';
import {Subscription} from 'rxjs';
import {Membership} from '../../../../models/projects/Membership';
import {UserInfo} from '../../../../models/users/UserInfo';
import {SessionService} from '../../../../store/session.service';
import {AlertController, ToastController} from '@ionic/angular';
import {ProjectService} from '../../../../services/common/project.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {UsersService} from '../../../../services/common/users.service';
import {MembershipRoles} from '../../../../models/projects/MembershipRoles';
import {MembershipPermission} from '../../../../models/projects/MembershipPermission';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.page.html',
  styleUrls: ['./permissions.page.scss'],
})
export class PermissionsPage implements OnInit {

  @Input() project: Project;
  @Input() projectSubscription: Subscription;

  @Input() updates = false;

  @Input() permissions = [MembershipPermission.details, MembershipPermission.admin,
    MembershipPermission.invitations, MembershipPermission.roles];

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
  MembershipRoles = MembershipRoles;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  MembershipPermission = MembershipPermission;
  memberships: Array<Membership>;

  userInfoSubscription: Subscription;
  userInfo: UserInfo;
  selectedUser: string;

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
                  });

                }
              );

            }
          );

        }

      });

    });

  }

  get membership(): Membership[] {

    if(this.memberships === undefined) {
      return [];
    }

    this.memberships.forEach(membership => {
      if(membership.userInfo !== undefined){
        if(membership.userInfo.username === this.selectedUser) {
          return membership;
        }
      }
    });

  }

  ngOnInit() {
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
