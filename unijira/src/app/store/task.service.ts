import {Injectable} from '@angular/core';
import {TaskState} from './task.reducer';
import {createFeatureSelector, createSelector, Store} from '@ngrx/store';
import {Observable} from 'rxjs';

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
