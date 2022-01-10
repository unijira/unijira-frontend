import {Pipe, PipeTransform} from '@angular/core';
import {ItemType} from '../../../../models/item/ItemType';

@Pipe({
  name: 'ticketType'
})
export class TicketTypePipe implements PipeTransform {

  transform(value: string | ItemType, ...args: string[]): string {
    console.log(value);
    switch(value) {
      case ItemType.epic:
        return 'projects.tickets.type.epic';
      case ItemType.story:
        return 'projects.tickets.type.story';
      case ItemType.task:
        return 'projects.tickets.type.task';
      case ItemType.issue:
        return 'projects.tickets.type.issue';
      default:
        return 'projects.tickets.type.unknown';
    }

  }

}
