import {Injectable} from '@angular/core';

import {createFeatureSelector, createSelector, Store,} from '@ngrx/store';
import {Sprint} from '../../../../models/Sprint';
import {Observable} from 'rxjs';
import {BacklogState} from './backlog.reducer';
import {saveBacklogAction, saveSprintAction} from './backlog.action';
import {Backlog} from '../../../../models/Backlog';

@Injectable()
export class BacklogService {
  constructor(private store: Store) {}

  public getBacklog(): Observable<Backlog> {
    const tmp = createSelector(
      createFeatureSelector<BacklogState>('backlogReducer'),
      (state) => state.backlog
    );
    return this.store.select(tmp);
  }

  public setBacklog(backlog: Backlog): void {
    this.store.dispatch(saveBacklogAction({ backlog }));
  }

  public getSprint(): Observable<Sprint> {
    const tmp = createSelector(
      createFeatureSelector<BacklogState>('backlogReducer'),
      (state) => state.sprint
    );
    return this.store.select(tmp);
  }

  public setSprint(sprint: Sprint): void {
    this.store.dispatch(saveSprintAction({ sprint }));
  }
}
