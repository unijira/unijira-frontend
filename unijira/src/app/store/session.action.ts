import { createAction, props } from '@ngrx/store';


export const loadingAction = createAction(
  '[Session] loading',
  props<{ loading: boolean }>()
)

export const isLoggedAction = createAction(
  '[Session] loggedIn',
  props<{ isLoggedIn: boolean }>()
)
