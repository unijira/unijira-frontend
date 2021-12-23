import {Component, OnDestroy, OnInit} from '@angular/core';
import {Project} from '../models/projects/Project';
import {Membership} from '../models/projects/Membership';
import {MembershipRoles} from '../models/projects/MembershipRoles';
import {MembershipStatus} from '../models/projects/MembershipStatus';
import {UserInfo} from '../models/users/UserInfo';
import {Subscription} from 'rxjs';
import {unsubscribeAll} from '../util';
import {SessionService} from '../store/session.service';
import {ProjectService} from '../services/common/project.service';
import {UsersService} from '../services/common/users.service';

@Component({
  selector: 'app-project-home',
  templateUrl: './project-home.page.html',
  styleUrls: ['./project-home.page.scss'],
})
export class ProjectHomePage implements OnInit, OnDestroy {

  project: Project;
  projectSubscription: Subscription;
  membership: Membership[];

  membershipRole: typeof MembershipRoles = MembershipRoles;

  constructor(private sessionService: SessionService, private projectService: ProjectService, private userService: UsersService) {
    this.projectSubscription = this.sessionService.getProject().subscribe(proj => {
      if (proj) {
        this.project = proj;
        this.projectService.getMemberships(this.project.id).subscribe(memb => {
          if (memb) {
            this.membership = memb;
            this.membership.forEach(m => {
              this.userService.getUser(m.userId).subscribe(userInfo => m.userInfo = userInfo);
            });
          }
        });
      }
    });
  }

  ngOnInit() {
  }

  getHalfList(odd: boolean): Membership[] {
    if (odd) {
      return this.membership && this.membership.filter((v, i) => i%2 !== 0);
    }
    return this.membership && this.membership.filter((v, i) => i%2 === 0);
  }

  ngOnDestroy() {
    unsubscribeAll(this.projectSubscription);
  }

}
