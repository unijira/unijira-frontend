import { Injectable } from '@angular/core';
import { HttpService } from './http-service.service';
import { SessionService } from './../store/session.service';
import { Sprint } from '../models/Sprint';
@Injectable({
  providedIn: 'root',
})
export class BacklogAPIService {
  constructor(
    private httpService: HttpService,
    private sessionService: SessionService
  ) {}
  getB() {
    let token =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwYXNzd29yZCI6IlBhb2xldHRhLjg1IiwiaXNzIjoiYXV0aC1zZXJ2aWNlLXVuaWppcmEiLCJleHAiOjE2Mzk5MzM3NzUsInR5cGUiOiJBVVRIT1JJWkFUSU9OIiwiaWF0IjoxNjM5OTMwMTc1LCJ1c2VybmFtZSI6InBhb2xhZ3VhcmFzY2lAZ21haWwuY29tIn0.e3SKsl2PgBpD3ciqZ4pFAnEIfcJUHaVgeiBGj7j9p3c';
    return this.httpService.sendGetWithAuth('backlog/', token);
  }

  getS() {
    let token =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwYXNzd29yZCI6IlBhb2xldHRhLjg1IiwiaXNzIjoiYXV0aC1zZXJ2aWNlLXVuaWppcmEiLCJleHAiOjE2Mzk5MzM3NzUsInR5cGUiOiJBVVRIT1JJWkFUSU9OIiwiaWF0IjoxNjM5OTMwMTc1LCJ1c2VybmFtZSI6InBhb2xhZ3VhcmFzY2lAZ21haWwuY29tIn0.e3SKsl2PgBpD3ciqZ4pFAnEIfcJUHaVgeiBGj7j9p3c';
    return this.httpService.sendGetWithAuth('sprint/', token);
  }

  setB(backlog: Sprint) {
    let token =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwYXNzd29yZCI6IlBhb2xldHRhLjg1IiwiaXNzIjoiYXV0aC1zZXJ2aWNlLXVuaWppcmEiLCJleHAiOjE2Mzk5MzM3NzUsInR5cGUiOiJBVVRIT1JJWkFUSU9OIiwiaWF0IjoxNjM5OTMwMTc1LCJ1c2VybmFtZSI6InBhb2xhZ3VhcmFzY2lAZ21haWwuY29tIn0.e3SKsl2PgBpD3ciqZ4pFAnEIfcJUHaVgeiBGj7j9p3c';
    return this.httpService.sendPostWithAuthJson('backlog/', token, backlog);
  }

  setS(sprint: Sprint) {
    let token =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwYXNzd29yZCI6IlBhb2xldHRhLjg1IiwiaXNzIjoiYXV0aC1zZXJ2aWNlLXVuaWppcmEiLCJleHAiOjE2Mzk5MzM3NzUsInR5cGUiOiJBVVRIT1JJWkFUSU9OIiwiaWF0IjoxNjM5OTMwMTc1LCJ1c2VybmFtZSI6InBhb2xhZ3VhcmFzY2lAZ21haWwuY29tIn0.e3SKsl2PgBpD3ciqZ4pFAnEIfcJUHaVgeiBGj7j9p3c';
    return this.httpService.sendPostWithAuthJson('sprint/', token, sprint);
  }
}
