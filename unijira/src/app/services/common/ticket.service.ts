import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {catchError, delay, map, Observable, of} from 'rxjs';
import {Item} from '../../models/item/Item';
import {HttpService} from '../http-service.service';
import {AccountService} from '../account.service';
import {ItemType} from '../../models/item/ItemType';
import {ItemStatus} from '../../models/item/ItemStatus';
import {ItemAssignment} from '../../models/item/ItemAssignment';

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

    return this.accountService.me()
      .pipe(map(me => [
          new Item(1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'Description 1', null, 1, null, ItemType.epic, ItemStatus.open, me, null, null, [
            new ItemAssignment(1, 1, me),
          ]),
          new Item(2, 'Summary 2', 'Description 2', null, 1, null, ItemType.story, ItemStatus.open, me, null),
          new Item(3, 'Summary 3', 'Description 3', null, 1, null, ItemType.epic, ItemStatus.open, me, null),
          new Item(4, 'Summary 4', 'Description 4', null, 1, null, ItemType.epic, ItemStatus.done, me, null),
          new Item(5, 'Summary 5', 'Description 5', null, 1, null, ItemType.issue, ItemStatus.done, me, null),
          new Item(6, 'Summary 6', 'Description 6', null, 1, null, ItemType.epic, ItemStatus.open, me, null),
          new Item(7, 'Summary 7', 'Description 7', null, 1, null, ItemType.task, ItemStatus.done, me, null),
          new Item(8, 'Summary 8', 'Description 8', null, 1, null, ItemType.epic, ItemStatus.open, me, null),
          new Item(9, 'Summary 9', 'Description 9', null, 1, null, ItemType.task, ItemStatus.done, me, null),
          new Item(10, 'Summary 10', 'Description 10', null, 1, null, ItemType.epic, ItemStatus.open, me, null),
        ])).pipe(delay(3000));

  }

}
