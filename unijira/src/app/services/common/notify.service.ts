import {Injectable} from '@angular/core';
import {HttpService} from '../http-service.service';
import {delay, Observable, of} from 'rxjs';
import {Notify} from '../../models/Notify';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor(private http: HttpService) {

  }

  getNotifies(page: number, limit: number): Observable<Notify[]> {

    // return this.http.get<Notify[]>('/notifies', new HttpParams().set('page', page).set('size', limit))
    //   .pipe(catchError(() => of([])));

    return of([
      new Notify(1, 'Title 1', 'Message hello world', 'HIGH', false, null, 1),
      new Notify(2, 'Title 2', 'Message hello world', 'HIGH', false, null, 1),
      new Notify(3, 'Title 3', 'Message hello world', 'HIGH', false, null, 1),
      new Notify(4, 'Title 4', 'Message hello world', 'HIGH', false, null, 1),
      new Notify(5, 'Title 5', 'Message hello world', 'HIGH', false, null, 1),
      new Notify(6, 'Title 6', 'Message hello world', 'HIGH', true, null, 1),
      new Notify(7, 'Title 7', 'Message hello world', 'HIGH', true, null, 1),
      new Notify(8, 'Title 8', 'Message hello world', 'HIGH', true, null, 1),
      new Notify(9, 'Title 9', 'Message hello world', 'HIGH', true, null, 1),
      new Notify(10, 'Title 10', 'Message hello world', 'HIGH', true, null, 1),
      new Notify(11, 'Title 11', 'Message hello world', 'HIGH', true, null, 1),
      new Notify(12, 'Title 12', 'Message hello world', 'HIGH', true, null, 1),
      new Notify(13, 'Title 13', 'Message hello world', 'HIGH', true, null, 1),
      new Notify(14, 'Title 14', 'Message hello world', 'HIGH', true, null, 1),
      new Notify(15, 'Title 15', 'Message hello world', 'HIGH', true, null, 1),
      new Notify(16, 'Title 16', 'Message hello world', 'HIGH', true, null, 1),
      new Notify(17, 'Title 17', 'Message hello world', 'HIGH', true, null, 1),
      new Notify(18, 'Title 18', 'Message hello world', 'HIGH', true, null, 1),
      new Notify(19, 'Title 19', 'Message hello world', 'HIGH', true, null, 1),
      new Notify(20, 'Title 20', 'Message hello world', 'HIGH', true, null, 1),
      new Notify(21, 'Title 21', 'Message hello world', 'HIGH', true, null, 1),
      new Notify(22, 'Title 22', 'Message hello world', 'HIGH', true, null, 1),
      new Notify(23, 'Title 23', 'Message hello world', 'HIGH', true, null, 1),
      new Notify(24, 'Title 24', 'Message hello world', 'HIGH', true, null, 1),
      new Notify(25, 'Title 25', 'Message hello world Message hello worldMessage hello worldMessage hello world', 'HIGH', true, null, 1),
    ]).pipe(delay(1000));

  }


}
