import {createAction, props} from '@ngrx/store';
import {Sprint} from '../models/Sprint';

export const setSprintAction = createAction(
  '[Item] set sprint',
  props<{ sprint: Sprint }>()
);

export const setBacklogAction = createAction(
  '[Item] set backlog',
  props<{ backlog: Sprint }>()
);
