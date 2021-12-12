import { Action, createReducer, on } from '@ngrx/store';

import { Task } from '../models/Task';
import { Sprint } from '../models/Sprint';
import { User } from '../models/User';

import * as TaskActions from './task.action';

export interface TaskState {
  backlog: Sprint;
  sprint: Sprint;
}
export const initialState: TaskState = {
  backlog: new Sprint(),
  sprint: new Sprint(),
};

export const taskReducer = createReducer(
  initialState,
  on(TaskActions.setBacklogAction, (state, { backlog }) => ({
    ...state,
    backlog,
  })),
  on(TaskActions.setSprintAction, (state, { sprint }) => ({ ...state, sprint }))
);

