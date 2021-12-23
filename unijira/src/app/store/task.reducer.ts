import {createReducer, on} from '@ngrx/store';
import {Sprint} from '../models/Sprint';

import * as TaskActions from './task.action';

export interface TaskState {
  backlog: Sprint;
  sprint: Sprint;
}
export const initialState: TaskState = {
  backlog: new Sprint([], new Date(), new Date()),
  sprint: new Sprint([], new Date(), new Date()),
};

export const taskReducer = createReducer(
  initialState,
  on(TaskActions.setBacklogAction, (state, { backlog }) => ({
    ...state,
    backlog,
  })),
  on(TaskActions.setSprintAction, (state, { sprint }) => ({ ...state, sprint }))
);

