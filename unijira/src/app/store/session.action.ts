import {createAction, props} from '@ngrx/store';
import {User} from '../models/User';
import {Error} from '../classes/error';

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

export const errorAction = createAction(
  '[Session] Error',
  props<{ error: Error }>()
);

export const logInAction = createAction(
  '[Session] logIn',
  props<{ token: string }>()
);

export const wrongCredentialAction = createAction(
  '[Session] wrong credential',
  props<{ wrongCredential: boolean }>()
);
