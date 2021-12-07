import { createAction, props } from '@ngrx/store';
import { Sprint } from '../models/Sprint';

export const setSprintAction = createAction(
  '[Task] set sprint',
  props<{ sprint: Sprint }>()
);

export const setBacklogAction = createAction(
  '[Task] set backlog',
  props<{ backlog: Sprint }>()
);
