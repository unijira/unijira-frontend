import {Pipe, PipeTransform} from '@angular/core';
import {MeasureUnit} from '../../../../models/item/MeasureUnit';

@Pipe({
  name: 'measureUnit'
})
export class MeasureUnitPipe implements PipeTransform {

  transform(value: MeasureUnit, ...args: unknown[]): string {

    switch(value) {
      case MeasureUnit.storyPoints:
        return 'projects.tickets.measureUnit.storyPoints';
      case MeasureUnit.workingHours:
        return 'projects.tickets.measureUnit.workingHours';
      case MeasureUnit.workingDays:
        return 'projects.tickets.measureUnit.workingDays';
      default:
        return 'projects.tickets.measureUnit.unknown';
    }

  }

}
