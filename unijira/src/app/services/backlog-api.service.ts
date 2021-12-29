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

  // TODO questo diventa getBacklogItems. Creare getBacklog per prendere i dati del backlog senza gli items
  getBacklog(projectId: number, backlogId: number) {
    const url = `/projects/${projectId}/backlogs/${backlogId}/items`;
    return this.httpService.get<any>(url).pipe(
      map((res) => {
        const newBacklog = new Sprint([], new Date(), new Date());
        const randInt = Math.floor(Math.random() * (110 - 100) + 100);
        res.forEach((element) => {
          const task = new Task(
            element.item.id,
            element.item.summary,
            element.item.status ?? 'da_completare',
            [
              new User(
                element.item.owner.id,
                element.item.owner.username,
                '',
                '',
                '',
                '',
                `http://unsplash.it/${randInt}/${randInt}`
              ),
            ],
            element.item.evaluation,
            element.item.children,
            element.item.type,
            element.item.comments,
            element.item.tags.split(';'),
            element.item.description,
            element.item.note,
            element.item.epic,
            element.item.story,
            element.backlog.sprints
              ? '#' + element.backlog.sprints[0].id
              : '--',
            new User(
              element.item.owner.id,
              element.item.owner.username,
              '',
              '',
              '',
              '',
              `http://unsplash.it/${randInt}/${randInt}`
            )
          );
          newBacklog.tasks.push(task);
        });
        return newBacklog;
      })
    );
  }

  // TODO questo diventa getSprintItems. Creare getSprint per prendere i dati del sprint senza gli items
  getSprint(projectId: number, backlogId: number, sprintId: number) {
    const url = `/projects/${projectId}/backlogs/${backlogId}/sprints/${sprintId}/items`;
    return this.httpService.get<any>(url).pipe(
      map((res) => {
        if (res.length === 0) {
          return new Sprint([], new Date(), new Date());
        }
        const newSprint = new Sprint([], new Date(), new Date());
        const randInt = Math.floor(Math.random() * (110 - 100) + 100);
        res.forEach((element) => {
          const task = new Task(
            element.item.id,
            element.item.summary,
            element.item.status ?? 'da_completare',
            [
              new User(
                element.item.owner.id,
                element.item.owner.username,
                '',
                '',
                '',
                '',
                `http://unsplash.it/${randInt}/${randInt}`
              ),
            ],
            element.item.evaluation,
            element.item.children,
            element.item.type,
            element.item.comments,
            element.item.description,
            element.item.tags,
            element.item.note,
            element.item.epic,
            element.item.story,
            element.backlog.sprints
              ? '#' + element.backlog.sprints[0].id
              : '--',
            new User(
              element.item.owner.id,
              element.item.owner.username,
              '',
              '',
              '',
              '',
              `http://unsplash.it/${randInt}/${randInt}`
            )
          );
          newSprint.tasks.push(task);
        });
        return newSprint;
      })
    );
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
    const items = [];
    console.log('[MAP setBacklog] #items ', backlog.tasks.length);
    backlog.tasks.forEach((element, index) => {
      items.push({
        id: element.id,
        item: {
          id: element.id,
          summary: element.name,
          description: element.description,
          measureUnit: 'story points',
          evaluation: element.weight,
          tags: element.tags.join(';'),
          type: element.type,
          notes: [],
          owner: {
            id: 1,
            username: 'paolaguarasci@gmail.com',
          },
          assegnees: [
            {
              id: 1,
              username: 'paolaguarasci@gmail.com',
            },
          ],
          father: null,
        },
        priority: '' + index,
      });
    });

    items.forEach((element) => {
      const url = `/projects/${projectId}/backlogs/${backlogId}/items/${element.id}`;
      console.log('[MAP setBacklog] #items ', element);
      this.httpService.put<any>(url, element);
    });

    // return this.httpService.put<any>(url, backlog);
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
    let itemToSend = {
      id: sprintId,
      startingDate: start,
      endingDate: end,
      insertions: [],
      backlogId: backlogId,
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
}
