import {Action, createReducer, on} from '@ngrx/store';
import {isLoggedAction, loadingAction} from "./session.action";

export interface SessionState {
  loading: boolean;
  isLoggedIn: boolean;
}

export const initialState: SessionState = {
  loading: false,
  isLoggedIn: false,
}

export const sessionReducer = createReducer(
  initialState,
  on(loadingAction, (state, {loading}) => ({ ...state, loading: loading})),
  on(isLoggedAction, (state, {isLoggedIn}) => ({ ...state, isLoggedIn: isLoggedIn})),

);
