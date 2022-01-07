import {createReducer, on} from '@ngrx/store';
import {Sprint} from '../models/Sprint';
import {Backlog} from '../models/Backlog';
import {BacklogInsertion} from '../models/BacklogInsertion';
import {SprintInsertion} from '../models/SprintInsertion';
import * as TaskActions from './task.action';

export interface TaskState {
  backlog: Backlog;
  sprint: Sprint;
}
export const initialState: TaskState = {
  // backlog: new Sprint([], new Date(), new Date()),
  // sprint: new Sprint([], new Date(), new Date()),
  backlog: new Backlog(0, new Date(), new Date(), [], 0),
  sprint: new Sprint(0, new Date(), new Date(), [], 0),
};

export const taskReducer = createReducer(
  initialState,
  on(TaskActions.setBacklogAction, (state, { backlog }) => ({
    ...state,
    backlog,
  })),
  on(TaskActions.setSprintAction, (state, { sprint }) => ({ ...state, sprint }))
);

