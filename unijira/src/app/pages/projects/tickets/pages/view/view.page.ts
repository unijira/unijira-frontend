import {Component, OnInit} from '@angular/core';
import {PageService} from '../../../../../services/page.service';
import {SessionService} from '../../../../../store/session.service';
import {ActivatedRoute} from '@angular/router';
import {TicketService} from '../../../../../services/ticket/ticket.service';
import {Item} from '../../../../../models/item/Item';
import {ItemStatus} from '../../../../../models/item/ItemStatus';
import {MeasureUnit} from '../../../../../models/item/MeasureUnit';
import {UserInfo} from '../../../../../models/users/UserInfo';
import {Release} from '../../../../../models/releases/Release';
import {ReleaseService} from '../../../../../services/release/release.service';
import {ProjectService} from '../../../../../services/project/project.service';
import {MembershipStatus} from '../../../../../models/projects/MembershipStatus';
import {ReleaseStatus} from '../../../../../models/releases/ReleaseStatus';
import {ItemType} from '../../../../../models/item/ItemType';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {

  projectId: number;

  ticket: Item = null;
  initialTicket: string;
  memberships: UserInfo[];
  releases: Release[];

  ticketStatus = ItemStatus;
  measureUnit = MeasureUnit;

  constructor(
    private pageService: PageService,
    private sessionService: SessionService,
    private ticketService: TicketService,
    private releaseService: ReleaseService,
    private projectService: ProjectService,
    private activatedRoute: ActivatedRoute,
  ) { }

  get dirty(): boolean {
    return JSON.stringify(this.ticket || {}) !== this.initialTicket;
  }

  ngOnInit() {

    this.pageService.setTitle('projects.tickets.title');

    this.activatedRoute.params.subscribe(params => {

      this.projectId = params.id;
      this.sessionService.loadProject(params.id);

      this.ticketService.getTicket(this.projectId, params.ticket).subscribe(ticket => {
        this.pageService.setTitle(['projects.tickets.title' , `#${ticket.id}`]);
        this.initialTicket = JSON.stringify(ticket);
        this.ticket = ticket;
      });

      this.releaseService.getReleases(this.projectId).subscribe(releases => {
        this.releases = releases
          .filter(i => i.status === ReleaseStatus.draft);
      });

      this.projectService.getMemberships(this.projectId).subscribe(memberships => {
        this.memberships = memberships
          .filter(i => i.status === MembershipStatus.enabled)
          .map(i => i.userInfo);
      });

    });

  }


  save() {

  }

}
