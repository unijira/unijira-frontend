import {Injectable} from '@angular/core';
import {HttpService} from '../http-service.service';
import {catchError, Observable, of} from 'rxjs';
import {Sprint} from '../../models/Sprint';
import {Item} from '../../models/item/Item';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(private http: HttpService) { }

  getActiveSprint(idProject: number): Observable<Sprint> {
    return this.http.get<Sprint>('/projects/' + idProject + '/sprint')
      .pipe(catchError(() => of(null)));;
  }

  getFatherById(idFather: number): Observable<Item> {
    return this.http.get<Item>('/items/' + idFather)
      .pipe(catchError(() => of(null)));
  }
}
