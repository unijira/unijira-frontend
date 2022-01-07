import { Injectable } from '@angular/core';
import { HttpService } from './http-service.service';
import { SessionService } from '../store/session.service';
import { Sprint } from '../models/Sprint';
import { Item } from '../models/item/Item';
import { User } from '../models/User';
import { map } from 'rxjs/operators';
import { Backlog } from '../models/Backlog';
import { BacklogInsertion } from '../models/BacklogInsertion';
import { SprintInsertion } from '../models/SprintInsertion';
@Injectable({
  providedIn: 'root',
})
export class BacklogAPIService {
  constructor(
    private httpService: HttpService,
    private sessionService: SessionService
  ) {}

  // TODO questo diventa getBacklogItems. Creare getBacklog per prendere i dati del backlog senza gli items
  getBacklog(projectId: number, backlogId: number) {
    const url = `/projects/${projectId}/backlogs/${backlogId}`;
    console.log('[getBacklog]', url);
    return this.httpService.get<Backlog>(url);
  }

  // TODO questo diventa getSprintItems. Creare getSprint per prendere i dati del sprint senza gli items
  getSprint(projectId: number, backlogId: number, sprintId: number) {
    const url = `/projects/${projectId}/backlogs/${backlogId}/sprints`;
    return this.httpService.get<Sprint>(url);
  }

  setItems(task) {
    const url = `/items/${task.id}`;
    const item = {
      id: task.id,
      summary: task.name,
      description: task.description,
      measureUnit: 'story points',
      evaluation: task.weight,
      tags: task.tags.join(';'),
      type: task.type,
      owner: {
        id: 1,
        username: 'paolaguarasci@gmail.com',
      },
    };
    return this.httpService.put<any>(url, item);
  }

  setBacklog(projectId: number, backlogId: number, backlog: Sprint) {
    console.log(backlog);
  }

  setSprint(
    projectId: number,
    backlogId: number,
    sprintId: number,
    sprint: Sprint
  ) {
    const url = `/projects/${projectId}/backlogs/${backlogId}/sprints/${sprintId}/items`;
    return this.httpService.post<any>(url, sprint);
  }

  editSprint(
    projectId: number,
    backlogId: number,
    sprintId: number,
    start: string,
    end: string
  ) {
    const url = `/projects/${projectId}/backlogs/${backlogId}/sprints/${sprintId}`;
    const itemToSend = {
      id: sprintId,
      startingDate: start,
      endingDate: end,
      insertions: [],
      backlogId,
    };
    return this.httpService.put<any>(url, itemToSend);
  }

  getBacklogList(projectId: number) {
    const url = `/projects/${projectId}/backlogs`;
    return this.httpService.get<any>(url).pipe(
      map((res) => {
        console.log('[MAP getbackloglist]', res);
        return res;
      })
    );
  }

  getSprintList(projectId: number, backlogId: number) {
    const url = `/projects/${projectId}/backlogs/${backlogId}/sprints`;
    return this.httpService.get<any>(url).pipe(
      map((res) => {
        console.log('[MAP getSrintList]', res);
        return res;
      })
    );
  }

  getSprintInfo(projectId: number, backlogId: number, sprintId: number) {
    const url = `/projects/${projectId}/backlogs/${backlogId}/sprints/${sprintId}`;
    return this.httpService.get<any>(url).pipe(
      map((res) => {
        console.log('[MAP getSprintInfo]', res);
        return res;
      })
    );
  }
}
