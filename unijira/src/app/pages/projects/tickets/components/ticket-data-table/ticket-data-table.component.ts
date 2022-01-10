import {Component, Input, OnInit} from '@angular/core';
import {Item} from '../../../../../models/item/Item';
import {ItemType} from '../../../../../models/item/ItemType';
import {ItemStatus} from '../../../../../models/item/ItemStatus';

@Component({
  selector: 'app-ticket-data-table',
  templateUrl: './ticket-data-table.component.html',
  styleUrls: ['./ticket-data-table.component.scss'],
})
export class TicketDataTableComponent implements OnInit {

  @Input() filterSearch;
  @Input() filterStatus: string[];
  @Input() filterType: string[];
  @Input() tickets: Item[];
  @Input() projectId: number;
  @Input() showFilters = true;

  itemType = ItemType;
  itemStatus = ItemStatus;


  constructor() { }

  get filteredTickets() {
    return this.tickets?.filter(ticket => (
      (this.filterSearch === ''         || ticket.summary?.toLowerCase().includes(this.filterSearch.toLowerCase())) &&
      (this.filterStatus?.length === 0  || this.filterStatus?.includes(ticket.status)) &&
      (this.filterType?.length === 0    || this.filterType?.includes(ticket.type))
    )) || [];
  }

  ngOnInit() {

    this.filterType = this.filterType ?? [
      ItemType.epic,
      ItemType.story,
      ItemType.task,
      ItemType.issue
    ];

    this.filterStatus = this.filterStatus ?? [
      ItemStatus.open,
      ItemStatus.done
    ];

    this.filterSearch = this.filterSearch ?? '';

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
