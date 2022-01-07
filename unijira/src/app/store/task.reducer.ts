import {createReducer, on} from '@ngrx/store';
import {Sprint} from '../models/Sprint';
import {Backlog} from '../models/Backlog';
import {BacklogInsertion} from '../models/BacklogInsertion';
import {SprintInsertion} from '../models/SprintInsertion';
import * as TaskActions from './task.action';
import * as _ from 'lodash';
export interface TaskState {
  backlog: Backlog;
  sprint: Sprint;
}
export const initialState: TaskState = {
  backlog: new Backlog(0, null, null, []),
  sprint: new Sprint(0, new Date(), new Date(), [], 0),
};

export const taskReducer = createReducer(
  initialState,

  on(TaskActions.setBacklogAction, (state, { backlog }) => {
    console.log('setBacklogAction', backlog);
    const nb = _.cloneDeep(backlog);
    return {...state, nb};
  }),


  on(TaskActions.setSprintAction, (state, { sprint }) => {
    console.log('setSprintAction', sprint);
    const ns = _.cloneDeep(sprint);
    return {...state, ns };
  })
);
