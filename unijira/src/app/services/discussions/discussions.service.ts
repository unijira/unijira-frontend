import {Injectable} from '@angular/core';
import {HttpService} from '../http-service.service';
import {catchError, Observable, of} from 'rxjs';
import {Topic} from '../../models/topic/Topic';
import {Message} from "../../models/topic/Message";

@Injectable({
  providedIn: 'root'
})
export class DiscussionsService {

  constructor(private http: HttpService) { }

  getDiscussions(idProject: number): Observable<Topic[]> {
    return this.http.get<Topic[]>('/projects/' + idProject + '/topics')
      .pipe(catchError(() => of([])));
  }

  getDiscussion(idProject: number, idTopic: number): Observable<Topic> {
    return this.http.get<Topic>('/projects/' + idProject + '/topics/' + idTopic)
      .pipe(catchError(() => of(null)));
  }

  getNumMessages(idProject: number, idTopic: number): Observable<number> {
    return this.http.get<number>('/projects/'+idProject+'/topics/'+idTopic+'/messages/count')
      .pipe(catchError(() => of(0)));
  }

  createDiscussion(idProject: number, topic: Topic): Observable<Topic> {
    return this.http.post<Topic>('/projects/' + idProject + '/topics', topic)
      .pipe(catchError(() => of(null)));
  }

  updateDiscussion(idProject: number, topic: Topic): Observable<Topic> {
    return this.http.put<Topic>('/projects/' + idProject + '/topics/' + topic.id, topic)
      .pipe(catchError(() => of(null)));
  }

  deleteDiscussion(idProject: number, idTopic: number): Observable<boolean> {
    return this.http.delete<boolean>('/projects/' + idProject + '/topics/' + idTopic)
      .pipe(catchError(() => of(false)));
  }

  getMessages(idProject: number, idTopic: number): Observable<Message[]> {
    return this.http.get<Message[]>('/projects/' + idProject + '/topics/' + idTopic + '/messages')
      .pipe(catchError(() => of([])));
  }

  createMessage(idProject: number, idTopic: number, message: Message): Observable<Message> {
    return this.http.post<Message>('/projects/' + idProject + '/topics/' + idTopic + '/messages', message)
      .pipe(catchError(() => of(null)));
  }

  updateMessage(idProject: number, idTopic: number, message: Message): Observable<Message> {
    return this.http.put<Message>('/projects/' + idProject + '/topics/' + idTopic + '/messages/' + message.id, message)
      .pipe(catchError(() => of(null)));
  }

  deleteMessage(idProject: number, idTopic: number, idMessage: number): Observable<boolean> {
    return this.http.delete<boolean>('/projects/' + idProject + '/topics/' + idTopic + '/messages/' + idMessage)
      .pipe(catchError(() => of(false)));
  }



}
