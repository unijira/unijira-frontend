import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtered'
})
export class FilteredPipe implements PipeTransform {

  transform(value: string, ...args: string[]): string {

    if (args[0]) {
      return value.replace(new RegExp('(' + args[0] + ')', 'ig'), '<mark>$1</mark>');
    }

    return value;

  }

}
