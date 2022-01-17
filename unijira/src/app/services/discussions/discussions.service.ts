import { Injectable } from '@angular/core';
import {HttpService} from '../http-service.service';
import {catchError, Observable, of} from 'rxjs';
import {Topic} from '../../models/topic/Topic';

@Injectable({
  providedIn: 'root'
})
export class DiscussionsService {

  constructor(private http: HttpService) { }

  getDiscussions(idProject: number): Observable<Topic[]> {
    return this.http.get<Topic[]>('/projects/' + idProject + '/topics')
      .pipe(catchError(() => of([])));
  }

  getNumMessages(idProject: number, idTopic: number): Observable<number> {
    return this.http.get<number>('/projects/'+idProject+'/topics/'+idTopic+'/messages/count')
      .pipe(catchError(() => of(null)));
  }

}
