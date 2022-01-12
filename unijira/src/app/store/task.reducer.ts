import {createReducer, on} from '@ngrx/store';
import {Sprint} from '../models/Sprint';
import {Backlog} from '../models/Backlog';
import * as TaskActions from './task.action';
import * as _ from 'lodash';
import {SprintStatus} from '../models/SprintStatus';

export interface TaskState {
  backlog: Backlog;
  sprint: Sprint;
}
export const initialState: TaskState = {
  backlog: new Backlog(0, null, null, []),
  sprint: new Sprint(0, new Date(), new Date(), [], 0, SprintStatus.inactive),
};

export const taskReducer = createReducer(
  initialState,

  on(TaskActions.setBacklogAction, (state, { backlog }) => {
    const nb = _.cloneDeep(backlog);
    console.log('setBaclogAction', nb);
    return {...state, nb};
  }),


  on(TaskActions.setSprintAction, (state, { sprint }) => {
    const ns = _.cloneDeep(sprint);
    console.log('setSprintAction', ns);
    return {...state, ns };
  })
);
