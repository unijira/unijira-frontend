import {Subscription} from "rxjs";

export function unsubscribeAll(...subs: Subscription[]) {
  (subs || []).forEach(s => s.unsubscribe())
}

export const monthsName =  [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
