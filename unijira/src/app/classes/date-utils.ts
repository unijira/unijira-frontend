import * as moment from 'moment';

export class DateUtils {

  public static toLocalDate(date?: Date): string {
    return (date ?? new Date()).toISOString().substring(0, 10);
  }

  public static toLocalDateTime(date?: Date): string {
    return (date ?? new Date()).toISOString();
  }

  public static fromLocalDate(date: string): Date {
    return moment(date, 'YYYY-MM-dd').toDate();
  }

  public static fromLocalDateTime(date: string): Date {
    return moment(date, moment.ISO_8601).toDate();
  }

}
