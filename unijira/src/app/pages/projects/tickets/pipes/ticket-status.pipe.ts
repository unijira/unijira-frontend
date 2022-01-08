import {Pipe, PipeTransform} from '@angular/core';
import {ItemStatus} from '../../../../models/item/ItemStatus';

@Pipe({
  name: 'ticketStatus'
})
export class TicketStatusPipe implements PipeTransform {

  transform(value: string | ItemStatus, ...args: string[]): string {

    switch(value) {
      case ItemStatus.open:
        return 'projects.tickets.status.open';
      case ItemStatus.done:
        return 'projects.tickets.status.done';
      default:
        return 'projects.tickets.status.unknown';
    }

  }

}
