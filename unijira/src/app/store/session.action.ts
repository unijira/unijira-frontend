import { createAction, props } from '@ngrx/store';
import { User } from '../models/User';

export const loadingAction = createAction(
  '[Session] loading',
  props<{ loading: boolean }>()
);

export const isLoggedAction = createAction(
  '[Session] loggedIn',
  props<{ isLoggedIn: boolean }>()
);

export const setUserAction = createAction(
  '[Session] Set User',
  props<{ user: User }>()
);
