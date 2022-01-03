import {Component, Input, OnInit} from '@angular/core';
import {SessionService} from '../../../../store/session.service';
import {AlertController, ToastController} from '@ionic/angular';
import {ProjectService} from '../../../../services/common/project.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {Project} from '../../../../models/projects/Project';
import {Subscription} from 'rxjs';
import {Membership} from '../../../../models/projects/Membership';
import {UsersService} from '../../../../services/common/users.service';
import {MembershipStatus} from '../../../../models/projects/MembershipStatus';

@Component({
  selector: 'app-invitations',
  templateUrl: './invitations.page.html',
  styleUrls: ['./invitations.page.scss'],
})
export class InvitationsPage implements OnInit {

  @Input() project: Project;
  @Input() projectSubscription: Subscription;

  @Input() searchTerm: string;

  memberships: Array<Membership>;

  // eslint-disable-next-line @typescript-eslint/naming-convention
  MembershipStatus = MembershipStatus;

  filters = [
    { value: MembershipStatus.pending, translate: 'project.settings.invitations.pending',  active: true },
    { value: MembershipStatus.enabled, translate: 'project.settings.invitations.enabled',  active: true },
    { value: MembershipStatus.disabled, translate: 'project.settings.invitations.disabled', active: true }
  ];

  constructor(private sessionService: SessionService,
              public alertController: AlertController,
              private projectService: ProjectService,
              private activatedRoute: ActivatedRoute,
              private translateService: TranslateService,
              private router: Router,
              public toastController: ToastController,
              public usersService: UsersService) {

    this.projectSubscription = this.sessionService.getProject().subscribe((p) => {

      this.project = p;

      if(p) {

        this.projectService.getMemberships(p.id).subscribe(
          members => {
            this.memberships = members;
            members.forEach(member => {
                this.usersService.getUser(member.keyUserId).subscribe(user => member.userInfo = user);
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

            if (membership.status === f.value) {
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

}
