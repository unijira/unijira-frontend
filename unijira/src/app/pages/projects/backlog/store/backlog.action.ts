import {createAction, props} from '@ngrx/store';
import {Sprint} from '../../../../models/Sprint';

export const saveBacklogAction = createAction(
  '[Backlog] save',
  props<{ backlog: Sprint }>()
);

export const saveBacklogSuccessAction = createAction(
  '[Backlog] save success',
  props<{ backlog: Sprint }>()
);

export const saveBacklogFailureAction = createAction(
  '[Backlog] save failure',
  props<{ error: any }>()
);

export const saveSprintAction = createAction(
  '[Backlog] save sprint',
  props<{ sprint: any }>()
);
