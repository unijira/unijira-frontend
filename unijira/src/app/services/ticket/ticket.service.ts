import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {catchError, map, Observable, of, switchMap} from 'rxjs';
import {Item} from '../../models/item/Item';
import {HttpService} from '../http-service.service';
import {AccountService} from '../account.service';
import {ItemStatus} from '../../models/item/ItemStatus';
import {MeasureUnit} from '../../models/item/MeasureUnit';
import {ItemType} from '../../models/item/ItemType';
import {ProjectService} from '../project/project.service';
import {BacklogInsertion} from '../../models/BacklogInsertion';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(
    private http: HttpService,
    private projectService: ProjectService,
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

    return this.http.get<Item>(`/items/${ticketId}`)
      .pipe(catchError(e => of(null)));

  }

  public createTicket(projectId: number, itemType: ItemType, parentId: number): Observable<Item> {

    const item = new Item(undefined, 'Ticket', 'Ticket', MeasureUnit.storyPoints, 0, '', itemType, ItemStatus.open, null, parentId);

    return this.accountService.me()
      .pipe(switchMap(me => this.projectService.getProject(projectId)
          .pipe(switchMap(project => {

            item.owner = me;

            return this.http.post<Item>(`/items`, item)
              .pipe(switchMap(ticket => this.http.post<BacklogInsertion>(`/projects/${projectId}/backlogs/${project.backlogs[0].id}/insertions`, new BacklogInsertion(null, ticket, project.backlogs[0], 0))
                  .pipe(map(_ => ticket))));

          }))
      ));

  }

  public updateTicket(projectId: number, ticket: Item): Observable<Item> {
    return this.http.put<Item>(`/items/${ticket.id}`, ticket)
      .pipe(catchError(e => of(null)));
  }
}
