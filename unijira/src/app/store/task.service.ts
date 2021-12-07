import { Injectable } from '@angular/core';
import { TaskState } from './task.reducer';
import {
  createFeatureSelector,
  createReducer,
  createSelector,
} from '@ngrx/store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as TaskActions from './task.action';
import { Sprint } from '../models/Sprint';

@Injectable()
export class TaskService {
  constructor(private store: Store) {}

  getBacklog(): Observable<Sprint> {
    const selector = createSelector(
      createFeatureSelector<TaskState>('taskReducer'),
      (state) => { return state.backlog}
    );
    return this.store.select(selector);
  }

  getSprint(): Observable<Sprint> {
    const selector = createSelector(
      createFeatureSelector<TaskState>('taskReducer'),
      (state) => { return state.sprint}
    );
    return this.store.select(selector);
  }
}
