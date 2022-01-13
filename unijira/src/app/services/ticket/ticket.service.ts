import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {catchError, Observable, of, switchMap} from 'rxjs';
import {Item} from '../../models/item/Item';
import {HttpService} from '../http-service.service';
import {AccountService} from '../account.service';
import {ItemStatus} from '../../models/item/ItemStatus';
import {MeasureUnit} from '../../models/item/MeasureUnit';
import {ItemType} from '../../models/item/ItemType';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(
    private http: HttpService,
    private accountService: AccountService
  ) { }


  public getMyTicketsOpen(limit: number): Observable<Item[]> {

    return this.http.get<Item[]>(`/users/me/tickets/${ItemStatus.open}`, new HttpParams()
        .set('page', 0)
        .set('size', limit))
      .pipe(catchError(e => of([])));

  }

  public getMyTicketsDone(limit: number): Observable<Item[]> {

    return this.http.get<Item[]>(`/users/me/tickets/${ItemStatus.done}`, new HttpParams()
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

  public createTicket(projectId: number, itemType: ItemType, parentId: number): Observable<Item> {

    return this.accountService.me()
      .pipe(switchMap(me => this.http.post<Item>(`/items`, new Item(
          undefined,
          'Nuovo Ticket',
          '',
          MeasureUnit.storyPoints,
          0,
          '',
          itemType,
          ItemStatus.open,
          me,
         parentId
        )))
      ).pipe(catchError(_ => of(null)));

  }

}
