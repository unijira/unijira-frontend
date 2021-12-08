import { Action, createReducer, on } from '@ngrx/store';
import { saveBacklogAction } from './backlog.action';
import { User } from '../models/User';
import { Sprint } from '../models/Sprint';

export interface BacklogState {
  backlog: Sprint;
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
