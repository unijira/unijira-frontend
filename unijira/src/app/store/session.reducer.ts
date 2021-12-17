import {Action, createReducer, on} from '@ngrx/store';
import {
  isLoggedAction,
  loadingAction,
  logInAction,
  wrongCredentialAction
} from './session.action';
import { User } from '../models/User';

export interface SessionState {
  loading: boolean;
  isLoggedIn: boolean;
  user: User;
  token: string;
  wrongCredential: boolean;
}

export const initialState: SessionState = {
  loading: false,
  isLoggedIn: false,
  user: null,
  token: null,
  wrongCredential: false,
};
export const sessionReducer = createReducer(
  initialState,
  on(loadingAction, (state, {loading}) => ({ ...state, loading})),
  on(isLoggedAction, (state, {isLoggedIn}) => ({ ...state, isLoggedIn})),
  on(logInAction, (state, {token}) => ({...state, token})),
  on(wrongCredentialAction, (state, {wrongCredential}) => ({...state, wrongCredential})),
);
