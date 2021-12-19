import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, size?: number): string {

    if(size && value.length > size) {
      return value.substring(0, size) + '...';
    } else {
      return value;
    }

  }

}
