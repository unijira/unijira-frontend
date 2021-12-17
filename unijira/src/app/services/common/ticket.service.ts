import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {catchError, delay, Observable, of} from 'rxjs';
import {Ticket} from '../../models/projects/Ticket';
import {HttpService} from '../http-service.service';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(
    private http: HttpService
  ) { }

  public getMyTicketsOpen(limit: number): Observable<Ticket[]> {
    // return this.http.get<Ticket[]>('/me/tickets', new HttpParams()
    //     .set('size', limit)
    //     .set('status', 'OPEN'))
    //   .pipe(catchError(e => of([])));

    return of([
      new Ticket(1, 'Ticket 1', 'Description of ticket 1', 'STORY', 'OPEN', 'HIGH', 1, 1),
      new Ticket(2, 'Ticket 2', 'Description of ticket 2', 'TASK', 'OPEN', 'HIGH', 1, 1),
      new Ticket(3, 'Ticket 3', 'Description of ticket 3', 'STORY', 'OPEN', 'HIGH', 1, 1),
      new Ticket(4, 'Ticket 4', 'Description of ticket 4', 'STORY', 'OPEN', 'HIGH', 1, 1),
      new Ticket(5, 'Ticket 5', 'Description of ticket 5', 'STORY', 'OPEN', 'HIGH', 1, 1),
      new Ticket(6, 'Ticket 6', 'Description of ticket 6', 'TASK', 'OPEN', 'HIGH', 1, 1),
      new Ticket(7, 'Ticket 7', 'Description of ticket 7', 'TASK', 'OPEN', 'HIGH', 1, 1),
      new Ticket(8, 'Ticket 8', 'Description of ticket 8', 'TASK', 'OPEN', 'HIGH', 1, 1),
    ]).pipe(delay(3000));

  }

  public getMyTicketsDone(limit: number): Observable<Ticket[]> {
    return this.http.get<Ticket[]>('/me/tickets', new HttpParams()
        .set('size', limit)
        .set('status', 'DONE'))
      .pipe(catchError(e => of([])));
  }

}
