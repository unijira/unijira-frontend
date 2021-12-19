import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private baseurl = 'http://localhost:7090/';
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
  sendGet(url) {
    let urlFull = `${this.baseurl}${url}`;
    return this.http.get(urlFull);
  }

  sendGetWithAuth(url, token) {
    return this.http.get(`${this.baseurl}${url}`, {
      headers: { Authorization: `Bearer ` + token },
    });
  }

  sendGetWithParams(url, params) {
    let urlFull = `${this.baseurl}${url}`;
    return this.http.get(urlFull, { params: params });
  }

  sendPostTxtResponse(url, body) {
    let urlFull = `${this.baseurl}${url}`;
    return this.http.post(urlFull, body, { responseType: 'text' });
  }

  sendPostWithAuthJson(url, token, payload) {
    console.log(payload);
    return this.http.post(`${this.baseurl}${url}`, payload, {
      headers: { Authorization: `Bearer ` + token },
    });
  }
}
