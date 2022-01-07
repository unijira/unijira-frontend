import {createAction, props} from '@ngrx/store';
import {Sprint} from '../../../../models/Sprint';
import {Backlog} from '../../../../models/Backlog';
import {BacklogInsertion} from '../../../../models/BacklogInsertion';
import {SprintInsertion} from '../../../../models/SprintInsertion';

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
