import {Component, OnInit, ViewChild} from '@angular/core';
import {PageService} from '../../../services/page.service';
import {TicketService} from '../../../services/ticket/ticket.service';
import {Item} from '../../../models/item/Item';
import {SessionService} from '../../../store/session.service';
import {first} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {TicketDataTableComponent} from './components/ticket-data-table/ticket-data-table.component';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.page.html',
  styleUrls: ['./tickets.page.scss'],
})
export class TicketsPage implements OnInit {

  @ViewChild('ticketDataTable') ticketDataTable: TicketDataTableComponent;

  tickets: Item[] = null;
  projectId: number = null;


  constructor(
    private ticketService: TicketService,
    private pageService: PageService,
    private sessionService: SessionService,
    private activatedRoute: ActivatedRoute) {

    this.activatedRoute.params
      .subscribe(params => {
        this.sessionService.loadProject(params.id);
        this.projectId = params.id;
      });

    this.pageService.setTitle('projects.tickets.title');

  }


  get filteredTickets(): Item[] {
    return this.ticketDataTable?.filteredTickets ?? [];
  }

  ngOnInit() {

    this.ticketService.getTickets(this.projectId).subscribe(tickets => {
      this.tickets = tickets;
    });

  }

  export() {
    this.ticketDataTable.export();
  }

}
