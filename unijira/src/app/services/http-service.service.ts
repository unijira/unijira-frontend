import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {catchError, map, Observable, of} from 'rxjs';
import {Store} from '@ngrx/store';
import {errorAction} from '../store/session.action';


@Injectable({
  providedIn: 'root',
})
export class HttpService {

  private opt = {
    headers: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/json',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: sessionStorage.getItem('token') ?? 'Bearer ' + sessionStorage.getItem('token')
    },
  };

  constructor(
    private http: HttpClient,
    private store: Store,
  ) { }


  public get<T>(api: string, params?: HttpParams): Observable<T> {
    return this.handleResponse<T>(this.http.get<T>(`${environment.baseURL}${api}`, {
      ...this.opt, observe: 'response', params
    }));
  }

  public put<T>(api: string, body?: object, params?: HttpParams): Observable<T> {
    return this.handleResponse<T>(this.http.put<T>(`${environment.baseURL}${api}`, body ?? {},{
      ...this.opt, observe: 'response', params
    }));
  }

  public post<T>(api: string, body?: object, params?: HttpParams): Observable<T> {
    return this.handleResponse<T>(this.http.post<T>(`${environment.baseURL}${api}`, body ?? {},{
      ...this.opt, observe: 'response', params
    }));
  }

  public delete<T>(api: string, params?: HttpParams): Observable<T> {
    return this.handleResponse<T>(this.http.delete<T>(`${environment.baseURL}${api}`,{
      ...this.opt, observe: 'response', params
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

        return of(error);

      })).pipe(map((res: HttpResponse<T>) => res.body));
  }

}
