import { Injectable } from '@angular/core';

import {
  createFeatureSelector,
  createReducer,
  createSelector,
} from '@ngrx/store';
import { Store } from '@ngrx/store';
import { Sprint } from '../models/Sprint';
import { Observable } from 'rxjs';
import { BacklogState } from './backlog.reducer';
import { saveBacklogAction, saveSprintAction } from './backlog.action';
@Injectable()
export class BacklogService {
  constructor(private store: Store) {}

  public getBacklog(): Observable<Sprint> {
    const tmp = createSelector(
      createFeatureSelector<BacklogState>('backlogReducer'),
      (state) => {
        return state.backlog;
      }
    );
    return this.store.select(tmp);
  }

  public setBacklog(backlog: Sprint): void {
    this.store.dispatch(saveBacklogAction({ backlog }));
  }

  public getSprint(): Observable<Sprint> {
    const tmp = createSelector(
      createFeatureSelector<BacklogState>('backlogReducer'),
      (state) => {
        return state.sprint;
      }
    );
    return this.store.select(tmp);
  }

  public setSprint(sprint: Sprint): void {
    this.store.dispatch(saveSprintAction({ sprint }));
  }
}
