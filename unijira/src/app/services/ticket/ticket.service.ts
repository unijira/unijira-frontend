import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {catchError, Observable, of} from 'rxjs';
import {Item} from '../../models/item/Item';
import {HttpService} from '../http-service.service';
import {AccountService} from '../account.service';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(
    private http: HttpService,
    private accountService: AccountService
  ) { }


  public getMyTicketsOpen(limit: number): Observable<Item[]> {

    return this.http.get<Item[]>('/users/me/tickets/OPEN', new HttpParams()
        .set('page', 0)
        .set('size', limit))
      .pipe(catchError(e => of([])));

  }

  public getMyTicketsDone(limit: number): Observable<Item[]> {

    return this.http.get<Item[]>('/users/me/tickets/DONE', new HttpParams()
      .set('page', 0)
      .set('size', limit))
      .pipe(catchError(e => of([])));

  }

  public getTickets(projectId: number): Observable<Item[]> {

      return this.http.get<Item[]>(`/projects/${projectId}/items`)
        .pipe(catchError(e => of(null)));

  }

  public getTicket(projectId: number, ticketId: number): Observable<Item> {

    return this.http.get<Item>(`/projects/${projectId}/items/${ticketId}`)
      .pipe(catchError(e => of(null)));

  }

}
