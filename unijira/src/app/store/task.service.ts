import { Backlog } from './../models/Backlog';
import { Injectable } from '@angular/core';
import { TaskState } from './task.reducer';
import { createFeatureSelector, createSelector, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Sprint } from '../models/Sprint';
import * as _ from 'lodash';
@Injectable()
export class TaskService {
  constructor(private store: Store) {}

  getBacklog(): Observable<any> {
    const selector = createSelector(
      createFeatureSelector<TaskState>('taskReducer'),
      (state) => state.backlog
    );

    return this.store.select(selector);
  }

  getSprint(): Observable<any> {
    const selector = createSelector(
      createFeatureSelector<TaskState>('taskReducer'),
      (state) => {
        console.log('getSprint');
        return state.sprint;
      }
    );

    return this.store.select(selector);
  }
}
