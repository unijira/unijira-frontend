import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {catchError, map, Observable, of} from 'rxjs';
import {Item} from '../../models/item/Item';
import {HttpService} from '../http-service.service';
import {AccountService} from '../account.service';
import {ItemStatus} from '../../models/item/ItemStatus';
import {ItemType} from '../../models/item/ItemType';
import {ItemAssignment} from '../../models/item/ItemAssignment';
import {MeasureUnit} from '../../models/item/MeasureUnit';

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

    // return this.http.get<Item>(`/projects/${projectId}/items/${ticketId}`)
    //   .pipe(catchError(e => of(null)));
    return this.accountService.me()
      .pipe(map(me =>
          new Item(1, 'Ticket Uno', 'Lorem ipsum description', MeasureUnit.storyPoints, 2, 'tag', ItemType.epic, ItemStatus.open, me, null, null, null, [
            new ItemAssignment(1, 1, me)
          ]
      )));


  }

}
