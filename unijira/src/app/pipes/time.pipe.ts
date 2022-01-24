import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';
import {TranslateService} from '@ngx-translate/core';
import {map, merge, Observable, of} from 'rxjs';
import {DateUtils} from '../classes/date-utils';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  constructor(private translateService: TranslateService) { }

  transform(value: number | string | Date): Observable<string> {

    if(typeof value === 'string') {
      value = DateUtils.fromLocalDateTime(value);
    }

    return merge(
      of(moment(value).fromNow()),
      this.translateService.onLangChange.pipe(map(() => moment(value).fromNow()))
    );
  }

}
