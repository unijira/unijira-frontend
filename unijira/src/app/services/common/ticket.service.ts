import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {catchError, Observable, of} from 'rxjs';
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

    return this.http.get<Ticket[]>('/users/0/tickets/OPEN', new HttpParams()
        .set('page', 0)
        .set('size', limit))
      .pipe(catchError(e => of([])));


  }

  public getMyTicketsDone(limit: number): Observable<Ticket[]> {

    return this.http.get<Ticket[]>('/users/0/tickets/DONE', new HttpParams()
      .set('page', 0)
      .set('size', limit))
      .pipe(catchError(e => of([])));

  }

}
