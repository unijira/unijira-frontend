import * as moment from 'moment';

export class DateUtils {

  public static toLocalDate(date?: Date): string {
    return moment(date ?? new Date()).format('YYYY-MM-DD');
  }

  public static toLocalDateTime(date?: Date): string {
    return moment(date ?? new Date()).add(1, 'hours').toISOString();
  }

  public static fromLocalDate(date: string): Date {
    return moment(date, 'YYYY-MM-DD').toDate();
  }

  public static fromLocalDateTime(date: string): Date {
    return moment(date, moment.ISO_8601).toDate();
  }
  public static fromFullDateToLocalDate(date: Date): Date {
    return moment(date, 'YYYY-MM-dd').toDate();
  }
}
