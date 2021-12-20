import {Injectable} from '@angular/core';
import {HttpService} from '../http-service.service';
import {catchError, Observable, of} from 'rxjs';
import {Notify} from '../../models/Notify';
import {HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor(private httpService: HttpService) {

  }

  getNotifications(page: number, limit: number): Observable<Notify[]> {

    return this.httpService.get<Notify[]>('/notifications', new HttpParams()
        .set('page', page)
        .set('size', limit))
      .pipe(catchError(() => of([])));

  }


  public markAsRead(id: number): void {
    this.httpService.put<Notify>('/notifications/' + id, {
      read: true
    }).subscribe();
  }

  public markAllAsRead(): void {
    this.httpService.put('/notifications/mark', {}).subscribe();
  }

}
