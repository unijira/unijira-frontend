import {Injectable} from '@angular/core';
import {HttpService} from './http-service.service';
import {SessionService} from '../store/session.service';
import {Sprint} from '../models/Sprint';
import {Item} from '../models/item/Item';
import {map} from 'rxjs/operators';
import {Backlog} from '../models/Backlog';
import {BacklogInsertion} from '../models/BacklogInsertion';
import {SprintInsertion} from '../models/SprintInsertion';
import {SprintStatus} from '../models/SprintStatus';


import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class BacklogAPIService {
  constructor(
    private httpService: HttpService,
    private sessionService: SessionService,
    private http: HttpClient
  ) {}

  getFirstBacklog(projectId: number) {
    const url = `/projects/${projectId}/backlogs`;
    return this.httpService.get<any>(url).pipe(map((res) => res[0]));
  }

  getBacklog(projectId: number, backlogId: number) {
    const url = `/projects/${projectId}/backlogs/${backlogId}`;
    return this.httpService.get<Backlog>(url).pipe(map((res) => res));
  }

  getBacklogItems(projectId: number, backlogId: number) {
    const url = `/projects/${projectId}/backlogs/${backlogId}/insertions`;
    return this.httpService.get<BacklogInsertion>(url);
  }

  getSprintInsertions(projectId: number, backlogId: number, sprintId: number) {
    const url = `/projects/${projectId}/backlogs/${backlogId}/sprints/${sprintId}/insertions`;
    return this.httpService.get<SprintInsertion[]>(url);
  }

  getSprint(projectId: number, backlogId: number, sprintId: number) {
    const url = `/projects/${projectId}/backlogs/${backlogId}/sprints/${sprintId}`;
    return this.httpService.get<Sprint>(url);
  }

  addItem(item) {
    const url = `/items`;
    return this.httpService.post<Item>(url, item);
  }

  setItems(item) {
    const url = `/items/${item.id}`;
    return this.httpService.put<Item>(url, item);
  }
  addBacklogInsertion(
    projectId: number,
    backlogId: number,
    backlogInsertion: BacklogInsertion
  ) {
    const url = `/projects/${projectId}/backlogs/${backlogId}/insertions`;
    console.log('set backlog insertion', backlogInsertion);
    return this.httpService.post<BacklogInsertion>(url, backlogInsertion);
  }
  setBacklog(projectId: number, backlogId: number, backlog: Backlog) {
    const url = `/projects/${projectId}/backlogs/${backlogId}`;
    return this.httpService.put<Backlog>(url, backlog);
  }

  addSprintInsertion(
    projectId: number,
    backlogId: number,
    sprintId: number,
    sprintInsertion: SprintInsertion
  ) {
    console.log('add sprint insertion', sprintInsertion);
    const url = `/projects/${projectId}/backlogs/${backlogId}/sprints/${sprintId}/insertions`;
    return this.httpService.post<SprintInsertion>(url, sprintInsertion);
  }

  // updateSprintInsertion(projectId: number, backlogId: number, sprintId: number, sprintInsertion: SprintInsertion) {
  //   console.log('add sprint insertion', sprintInsertion);
  //   const url = `/projects/${projectId}/backlogs/${backlogId}/sprints/${sprintId}/insertions`;
  //   return this.httpService.put<SprintInsertion>(url, sprintInsertion);
  // }

  updateBacklogInsertion(
    projectId: number,
    backlogId: number,
    backlogInsertion: BacklogInsertion
  ) {
    console.log('update backlog insertion', backlogInsertion);
    const url = `/projects/${projectId}/backlogs/${backlogId}/insertions/${backlogInsertion.id}`;
    return this.httpService.put<BacklogInsertion>(url, backlogInsertion);
  }

  deleteBacklogInsertion(
    projectId: number,
    backlogId: number,
    backlogInsertion: BacklogInsertion
  ) {
    const url = `/projects/${projectId}/backlogs/${backlogId}/insertions/${backlogInsertion.id}`;
    return this.httpService.delete<BacklogInsertion>(url);
  }

  deleteSprintInsertion(
    projectId: number,
    backlogId: number,
    sprintId: number,
    sprintInsertion: SprintInsertion
  ) {
    const url = `/projects/${projectId}/backlogs/${backlogId}/sprints/${sprintId}/insertions/${sprintInsertion.id}`;
    return this.httpService.delete<SprintInsertion>(url);
  }

  newSprint(projectId: number, backlogId: number) {
    const sprint = {
      name: 'Sprint',
      startingDate: null,
      endingDate: null,
      status: SprintStatus.inactive,
    };
    const url = `/projects/${projectId}/backlogs/${backlogId}/sprints`;
    return this.httpService.post<any>(url, sprint);
  }
  startSprint(
    projectId: number,
    backlogId: number,
    sprintId: number,
    sprint: Sprint
  ) {
    const url = `/projects/${projectId}/backlogs/${backlogId}/sprints/${sprintId}`;
    return this.httpService.put<Sprint>(url, sprint);
  }
  updateSprint(
    projectId: number,
    backlogId: number,
    sprintId: number,
    sprint: Sprint
  ) {
    console.log('Update sprint', sprint);
    const url = `/projects/${projectId}/backlogs/${backlogId}/sprints/${sprintId}`;
    return this.httpService.put<any>(url, sprint);
  }
  deleteSprint(projectId: number, backlogId: number, sprintId: number) {
    const url = `/projects/${projectId}/backlogs/${backlogId}/sprints/${sprintId}`;
    return this.httpService.delete<any>(url);
  }

  getItem(itemId: number) {
    const url = `/items/${itemId}`;
    return this.httpService.get<Item>(url);
  }

  setSprint(
    projectId: number,
    backlogId: number,
    sprintId: number,
    sprint: Sprint
  ) {
    const url = `/projects/${projectId}/backlogs/${backlogId}/sprints/${sprintId}`;
    return this.httpService.put<any>(url, sprint);
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
    return this.httpService.get<any>(url).pipe(map((res) => res));
  }

  getSprintList(projectId: number, backlogId: number) {
    const url = `/projects/${projectId}/backlogs/${backlogId}/sprints`;
    return this.httpService.get<Sprint[]>(url);
  }

  getSprintInfo(projectId: number, backlogId: number, sprintId: number) {
    const url = `/projects/${projectId}/backlogs/${backlogId}/sprints/${sprintId}`;
    return this.httpService.get<any>(url).pipe(map((res) => res));
  }

  getHints(
    projectId: number,
    backlogId: number,
    sprintId: number
  ) {
    let userInfo;
    this.sessionService.getUserInfo().subscribe((user) => {
      userInfo = user;
    });
    const url = `/projects/${projectId}/backlogs/${backlogId}/sprints/${sprintId}/user/${userInfo.id}/hint`;
    return this.httpService.get<any>(url);
    //const url = `/assets/mock/hints.json`;
    //return this.http.get(url);
  }
}
