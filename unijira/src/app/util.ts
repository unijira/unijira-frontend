import {Subscription} from "rxjs";

export function unsubscribeAll(...subs: Subscription[]) {
  (subs || []).forEach(s => s.unsubscribe())
}
