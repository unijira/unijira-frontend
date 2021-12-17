import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class HttpService {

  private opt = {
    headers: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/json',
    },
  };

  constructor(private http: HttpClient) { }

  sendPost<T>(url: string, body: any): Observable<T> {
    return this.http.post<T>(`${environment.baseURL}${url}`, body, this.opt);
  }

  sendGet<T>(url: string): Observable<T> {
    return this.http.get<T>(`${environment.baseURL}${url}`);
  }

  sendGetWithParams<T>(url: string, params: HttpParams): Observable<T> {
    return this.http.get<T>(`${environment.baseURL}${url}`, { params });
  }

  sendPostTxtResponse(url: string, body: object): Observable<string> {
    return this.http.post(`${environment.baseURL}${url}`, body, { responseType: 'text' });
  }

}
