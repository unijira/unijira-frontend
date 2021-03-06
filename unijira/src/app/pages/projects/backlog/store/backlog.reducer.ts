import {createReducer, on} from '@ngrx/store';
import {saveBacklogAction} from './backlog.action';
import {Sprint} from '../../../../models/Sprint';
import {Backlog} from '../../../../models/Backlog';

export interface BacklogState {
  backlog: Backlog;
  sprint: Sprint;
}

export const initialState: BacklogState = {
  backlog: null,
  sprint: null,
};

export const backlogReducer = createReducer(
  initialState,
  on(saveBacklogAction, (state, { backlog }) => ({ ...state, backlog }))
);
