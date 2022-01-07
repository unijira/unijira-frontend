import { Backlog } from './../models/Backlog';
import {Injectable} from '@angular/core';
import {TaskState} from './task.reducer';
import {createFeatureSelector, createSelector, Store,} from '@ngrx/store';
import {Observable} from 'rxjs';
import {Sprint} from '../models/Sprint';

@Injectable()
export class TaskService {
  constructor(private store: Store) {}

  getBacklog(): Observable<Backlog> {
    const selector = createSelector(
      createFeatureSelector<TaskState>('taskReducer'),
      (state) => state.backlog
    );
    return this.store.select(selector);
  }

  getSprint(): Observable<Sprint> {
    const selector = createSelector(
      createFeatureSelector<TaskState>('taskReducer'),
      (state) => state.sprint
    );
    return this.store.select(selector);
  }

}
