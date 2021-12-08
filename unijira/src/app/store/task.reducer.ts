import { Action, createReducer, on } from '@ngrx/store';

import { Task } from '../models/Task';
import { Sprint } from '../models/Sprint';
import { User } from '../models/User';

import * as TaskActions from './task.action';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

export interface TaskState {
  backlog: Sprint;
  sprint: Sprint;
}
export const initialState: TaskState = {
  backlog: null,
  sprint: null,
};

export const taskReducer = createReducer(
  initialState,
  on(TaskActions.setBacklogAction, (state, { backlog }) => ({
    ...state,
    backlog,
  })),
  on(TaskActions.setSprintAction, (state, { sprint }) => ({ ...state, sprint }))
);

const store = createStore(taskReducer, composeWithDevTools(applyMiddleware()));
