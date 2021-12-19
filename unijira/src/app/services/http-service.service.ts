import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {catchError, map, Observable} from 'rxjs';
import {State, Store} from '@ngrx/store';
import {errorAction} from '../store/session.action';
import {SessionState} from '../store/session.reducer';


@Injectable({
  providedIn: 'root',
})
export class HttpService {

  private opt = {
    headers: new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
  };

  constructor(
    private http: HttpClient,
    private store: Store,
    private state: State<SessionState>
  ) {

    if(localStorage.getItem('token')) {
      this.opt.headers = this.opt.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    }

    this.state.subscribe(s => {

      if (s.sessionReducer.token) {
        this.opt.headers = this.opt.headers.set('Authorization', 'Bearer ' + s.sessionReducer.token);
      }

    });

  }


  public get<T>(api: string, params?: HttpParams, options?: object): Observable<T> {
    return this.handleResponse<T>(this.http.get<T>(`${environment.baseURL}${api}`, {
      ...this.opt, ...options, observe: 'response', params
    }));
  }

  public put<T>(api: string, body?: object, params?: HttpParams, options?: object): Observable<T> {
    return this.handleResponse<T>(this.http.put<T>(`${environment.baseURL}${api}`, body ?? {},{
      ...this.opt, ...options, observe: 'response', params
    }));
  }

  public post<T>(api: string, body?: object, params?: HttpParams, options?: object): Observable<T> {
    return this.handleResponse<T>(this.http.post<T>(`${environment.baseURL}${api}`, body ?? {},{
      ...this.opt, ...options, observe: 'response', params
    }));
  }

  public delete<T>(api: string, params?: HttpParams, options?: object): Observable<T> {
    return this.handleResponse<T>(this.http.delete<T>(`${environment.baseURL}${api}`,{
      ...this.opt, ...options, observe: 'response', params
    }));
  }




  /** @deprecated **/
  sendPost<T>(url: string, body: any): Observable<T> {
    return this.http.post<T>(`${environment.baseURL}${url}`, body, this.opt);
  }

  /** @deprecated **/
  sendGet<T>(url: string): Observable<T> {
    return this.http.get<T>(`${environment.baseURL}${url}`);
  }

  /** @deprecated **/
  sendGetWithParams<T>(url: string, params: HttpParams): Observable<T> {
    return this.http.get<T>(`${environment.baseURL}${url}`, { params });
  }

  /** @deprecated **/
  sendPostTxtResponse(url: string, body: object): Observable<string> {
    return this.http.post(`${environment.baseURL}${url}`, body, { responseType: 'text' });
  }


  private handleResponse<T>(response: Observable<HttpResponse<T>>): Observable<T> {
    return response
      .pipe(catchError((error) => {

        this.store.dispatch(errorAction({
          error: {
            status: error.status,
            message: error.statusText
          }
        }));

        throw error;

      })).pipe(map((res: HttpResponse<T>) => res.body));
  }

}
