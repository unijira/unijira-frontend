import {Component, OnDestroy, OnInit} from '@angular/core';
import {PageService} from '../../../services/page.service';
import {ItemType} from '../../../models/item/ItemType';
import {ItemStatus} from '../../../models/item/ItemStatus';
import {TicketService} from '../../../services/common/ticket.service';
import {Ticket} from '../../../models/projects/Ticket';
import {SessionService} from '../../../store/session.service';
import {first} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.page.html',
  styleUrls: ['./tickets.page.scss'],
})
export class TicketsPage implements OnInit {

  filterSearch = '';
  filterStatus: string[] = [];
  filterType: string[] = [];
  tickets: Ticket[] = null;
  projectId: number = null;

  itemType = ItemType;
  itemStatus = ItemStatus;


  constructor(
    private ticketService: TicketService,
    private pageService: PageService,
    private sessionService: SessionService,
    private activatedRoute: ActivatedRoute) {

    this.activatedRoute.params
      .pipe(first())
      .subscribe(params => {
        this.sessionService.loadProject(params.id);
        this.projectId = params.id;
      });

    this.pageService.setTitle('projects.tickets.title');

  }


  get filteredTickets() {
    return this.tickets?.filter(ticket => (
        (this.filterSearch === ''         || ticket.summary.toLowerCase().includes(this.filterSearch.toLowerCase())) &&
        (this.filterStatus.length === 0   || this.filterStatus.includes(ticket.status)) &&
        (this.filterType.length === 0     || this.filterType.includes(ticket.type))
      )) || [];
  }

  ngOnInit() {

    this.filterType = [
      ItemType.epic,
      ItemType.story,
      ItemType.task,
      ItemType.issue
    ];

    this.filterStatus = [
      ItemStatus.open,
      ItemStatus.done
    ];

    this.ticketService.getTickets(1).subscribe(tickets => {
      this.tickets = tickets;
    });

  }

  getBadgeColor(status: string): string {
    switch (status) {
      case ItemStatus.open:
        return 'tertiary';
      case ItemStatus.done:
        return 'success';
      default:
        return 'primary';
    }
  }

  export() {

    let csv = '';
    csv += Object.keys(this.tickets[0]).join(';') + '\n';
    csv += Object.values(this.filteredTickets).map(ticket => Object.values(ticket).join(';')).join('\n');

    const blob = new Blob([csv], {type: 'text/csv'});
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');

    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'tickets.csv');
    a.click();


  }

}
