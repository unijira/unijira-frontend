import {Action, createReducer, on} from '@ngrx/store';
import {isLoggedAction, loadingAction} from "./session.action";
import { User } from '../models/User'

export interface SessionState {
  loading: boolean;
  isLoggedIn: boolean;
  user: User;
}

export const initialState: SessionState = {
  loading: false,
  isLoggedIn: false,
  user: null
}
export const sessionReducer = createReducer(
  initialState,
  on(loadingAction, (state, {loading}) => ({ ...state, loading: loading})),
  on(isLoggedAction, (state, {isLoggedIn}) => ({ ...state, isLoggedIn: isLoggedIn})),

);
