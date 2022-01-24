import {Component, OnInit} from '@angular/core';
import {PageService} from '../../../../../services/page.service';
import {SessionService} from '../../../../../store/session.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TicketService} from '../../../../../services/ticket/ticket.service';
import {Item} from '../../../../../models/item/Item';
import {ItemStatus} from '../../../../../models/item/ItemStatus';
import {MeasureUnit} from '../../../../../models/item/MeasureUnit';
import {Release} from '../../../../../models/releases/Release';
import {ReleaseService} from '../../../../../services/release/release.service';
import {ProjectService} from '../../../../../services/project/project.service';
import {MembershipStatus} from '../../../../../models/projects/MembershipStatus';
import {ReleaseStatus} from '../../../../../models/releases/ReleaseStatus';
import {Membership} from '../../../../../models/projects/Membership';
import {AlertController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import {ItemType} from '../../../../../models/item/ItemType';
import {catchError, of} from 'rxjs';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {

  projectId: number;

  ticket: Item = null;
  initialTicket: string;
  memberships: Membership[];
  releases: Release[];

  ticketStatus = ItemStatus;
  measureUnit = MeasureUnit;
  ticketType = ItemType;

  constructor(
    private pageService: PageService,
    private sessionService: SessionService,
    private ticketService: TicketService,
    private releaseService: ReleaseService,
    private projectService: ProjectService,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    private translateService: TranslateService,
    private router: Router
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
          .filter(i => i.status === MembershipStatus.enabled);
      });

    });

  }


  save() {
    this.ticketService.updateTicket(this.projectId, this.ticket).subscribe(ticket => {
      if(ticket) {
        this.ticket = ticket;
        this.initialTicket = JSON.stringify(this.ticket);
      } else {
        this.alertController.create({
          header: this.translateService.instant('error.title'),
          message:  this.translateService.instant('error.projects.tickets.save'),
          buttons: [this.translateService.instant('error.buttons.ok')]
        }).then(alert => alert.present());
      }
    });
  }

  create(itemType: ItemType) {
    this.ticketService.createTicket(this.projectId, itemType, this.ticket.id)
      .pipe(catchError(_ => of(null)))
      .subscribe(response => {
        if (response) {
          this.router.navigate(['/projects', this.projectId, 'tickets', response.id]).then();
        } else {
          this.alertController.create({
            header: this.translateService.instant('error.title'),
            message: this.translateService.instant('error.projects.tickets.create'),
            buttons: [this.translateService.instant('error.buttons.ok')]
          }).then(alert => alert.present());
        }
      });
  }

}
