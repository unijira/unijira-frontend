import {Component, Input, OnInit} from '@angular/core';
import {Project} from '../../models/projects/Project';
import {ProjectService} from '../../services/common/project.service';
import {Ticket} from '../../models/projects/Ticket';
import {TicketService} from '../../services/common/ticket.service';
import {TimePipe} from '../../pipes/time.pipe';
import {PageService} from '../../services/page.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  providers: [TimePipe]
})
export class HomePage implements OnInit {

  @Input() recentProjects: Array<Project> = null;
  @Input() myTicketsOpen: Array<Ticket> = null;
  @Input() myTicketsDone: Array<Ticket> = null;
  @Input() myTicketsOpenCount = 0;
  @Input() myTicketsDoneCount = 0;
  @Input() currentSegment = 'open';

  constructor(
    private projectService: ProjectService,
    private ticketService: TicketService,
    private pageService: PageService,
  ) {
    this.pageService.setTitle('user.home.title');
  }

  ngOnInit() {

    this.projectService.getProjects(0, 5).subscribe(
      (projects: Array<Project>) => {
        this.recentProjects = projects;
      }
    );

    this.ticketService.getMyTicketsOpen(20).subscribe(
      (tickets: Array<Ticket>) => {
        this.myTicketsOpen = tickets;
      }
    );

    this.ticketService.getMyTicketsDone(20).subscribe(
      (tickets: Array<Ticket>) => {
        this.myTicketsDone = tickets;
      }
    );

  }

  onSegmentChanged(e: CustomEvent) {
    this.currentSegment = e.detail?.value;
  }

  navigateToProjectHome(id: number) {
    // this.sessionService.loadProject(id);
    // this.router.navigate(['/project-home']);
  }

}
