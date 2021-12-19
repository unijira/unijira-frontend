import { Injectable } from '@angular/core';
import { HttpService } from './http-service.service';
import { SessionService } from './../store/session.service';
import { Sprint } from '../models/Sprint';
import { Task } from '../models/Task';
import { User } from '../models/User';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BacklogAPIService {
  constructor(
    private httpService: HttpService,
    private sessionService: SessionService
  ) {}

  getBacklog() {
    return this.httpService.get<Sprint>(`backlog/`);
  }

  getSprint() {
    return this.httpService.get<Sprint>(`sprint/`);
  }

  setBacklog(backlog: Sprint) {
    return this.httpService.post<Sprint>(`backlog/`, backlog);
  }

  setSprint(sprint: Sprint) {
    return this.httpService.post<Sprint>(`sprint/`, sprint);
  }
}
