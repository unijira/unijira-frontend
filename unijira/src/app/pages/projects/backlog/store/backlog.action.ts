import {createAction, props} from '@ngrx/store';
import {Backlog} from '../../../../models/Backlog';

export const saveBacklogAction = createAction(
  '[Backlog] save',
  props<{ backlog: Backlog }>()
);

export const saveBacklogSuccessAction = createAction(
  '[Backlog] save success',
  props<{ backlog: Backlog }>()
);

export const saveBacklogFailureAction = createAction(
  '[Backlog] save failure',
  props<{ error: any }>()
);

export const saveSprintAction = createAction(
  '[Backlog] save sprint',
  props<{ sprint: any }>()
);
