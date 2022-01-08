import {Pipe, PipeTransform} from '@angular/core';
import {ItemStatus} from '../../../../models/item/ItemStatus';

@Pipe({
  name: 'ticketStatusColor'
})
export class TicketStatusColorPipe implements PipeTransform {

  transform(value: string | ItemStatus, ...args: string[]): string {

    switch(value) {
      case ItemStatus.open:
        return 'tertiary';
      case ItemStatus.done:
        return 'success';
      default:
        return 'primary';
    }

  }

}
