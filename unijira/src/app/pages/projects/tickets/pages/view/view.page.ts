import {Component, OnInit} from '@angular/core';
import {PageService} from '../../../../../services/page.service';
import {SessionService} from '../../../../../store/session.service';
import {ActivatedRoute} from '@angular/router';
import {TicketService} from '../../../../../services/ticket/ticket.service';
import {Item} from '../../../../../models/item/Item';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {

  projectId: number = null;
  ticket: Item = null;

  constructor(
    private pageService: PageService,
    private sessionService: SessionService,
    private ticketService: TicketService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {

    this.pageService.setTitle('projects.tickets.title');

    this.activatedRoute.params.subscribe(params => {

      this.projectId = params.id;
      this.sessionService.loadProject(params.id);

      this.ticketService.getTicket(this.projectId, params.ticket).subscribe(ticket => {
        this.pageService.setTitle(['projects.tickets.title' , `#${ticket.id}`]);
        this.ticket = ticket;
      });

    });

  }

}