import {createAction, props} from '@ngrx/store';
import {Error} from '../classes/error';
import {UserInfo} from '../models/users/UserInfo';
import {Project} from '../models/projects/Project';

export const loadingAction = createAction(
  '[Session] loading',
  props<{ loading: boolean }>()
);

export const isLoggedAction = createAction(
  '[Session] loggedIn',
  props<{ isLoggedIn: boolean }>()
);

export const errorAction = createAction(
  '[Session] Error',
  props<{ error: Error }>()
);

export const logInAction = createAction(
  '[Session] logIn',
  props<{ token: string }>()
);

export const logOutAction = createAction(
  '[Session] logOut'
);

export const wrongCredentialAction = createAction(
  '[Session] wrong credential',
  props<{ wrongCredential: boolean }>()
);

export const userInfoAction = createAction(
  '[Session] User info',
  props<{ userInfo: UserInfo}>()
);

export const projectAction = createAction(
  '[Session] project',
  props<{project: Project}>()
);
