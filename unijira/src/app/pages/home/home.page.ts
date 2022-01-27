import {Component, OnInit} from '@angular/core';
import {Project} from '../../models/projects/Project';
import {ProjectService} from '../../services/project/project.service';
import {Item} from '../../models/item/Item';
import {TicketService} from '../../services/ticket/ticket.service';
import {TimePipe} from '../../pipes/time.pipe';
import {PageService} from '../../services/page.service';
import {Router} from '@angular/router';
import {SessionService} from '../../store/session.service';
import {UserStatus} from '../../models/users/UserStatus';
import {ToastController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  providers: [TimePipe]
})
export class HomePage implements OnInit {

  recentProjects: Array<Project> = null;
  myTicketsOpen: Array<Item> = null;
  myTicketsDone: Array<Item> = null;
  currentSegment = 'open';

  constructor(
    private projectService: ProjectService,
    private ticketService: TicketService,
    private pageService: PageService,
    private sessionService: SessionService,
    private translateService: TranslateService,
    private toastController: ToastController,
    private router: Router
  ) {
    this.pageService.setTitle('user.home.title');
  }

  ngOnInit() {

    this.projectService.getProjects(0, 5).subscribe(
      (projects: Array<Project>) => {

        this.recentProjects = projects || [];

        if(this.recentProjects.length === 0) {
          this.router.navigate(['/projects/wizard']).then();
        }

      }
    );

    this.ticketService.getMyTicketsOpen(20).subscribe(
      (tickets: Array<Item>) => {
        this.myTicketsOpen = tickets;
      }
    );

    this.ticketService.getMyTicketsDone(20).subscribe(
      (tickets: Array<Item>) => {
        this.myTicketsDone = tickets;
      }
    );

    this.sessionService.getUserInfo().subscribe(user => {
      if(user.status === UserStatus.requireConfirm) {
        this.toastController.create({
          message: this.translateService.instant('backlog.server.hints.warning'),
          duration: 3000,
          position: 'top',
          color: 'warning',
          icon: 'warning'
        }).then(toast => toast.present());
      }
    });

  }

  onSegmentChanged(e: CustomEvent) {
    this.currentSegment = e.detail?.value;
  }

  myTicketsDonePerProject(projectId: number) {
    return this.myTicketsDone.filter(ticket => ticket.projectId === projectId).length;
  }

  myTicketsOpenPerProject(projectId: number) {
    return this.myTicketsOpen.filter(ticket => ticket.projectId === projectId).length;
  }

}
