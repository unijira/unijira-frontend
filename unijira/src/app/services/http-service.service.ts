import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})

export class HttpService {
  private baseurl = 'http://localhost:7080/';
  private opt = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  constructor(private http: HttpClient) {}

  sendPost(url, body) {
    let urlFull = `${this.baseurl}${url}`;
    return this.http.post(urlFull, body, this.opt);
  }

  sendPostTxtResponse(url, body) {
    let urlFull = `${this.baseurl}${url}`;
    return this.http.post(urlFull, body, {responseType: 'text' });
  }

}
