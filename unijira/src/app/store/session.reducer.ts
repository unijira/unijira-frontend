import { Action, createReducer, on } from '@ngrx/store';
import { isLoggedAction, loadingAction } from './session.action';
import { User } from '../models/User';
import {
  logInAction,
  saveCredentialAction,
  wrongCredentialAction
} from "./session.action";
import {Credential} from "../classes/credential";

export interface SessionState {
  loading: boolean;
  isLoggedIn: boolean;
  user: User;
  token: string;
  wrongCredential: boolean;
  credential: Credential;
}

export const initialState: SessionState = {
  loading: false,
  isLoggedIn: false,
  user: null,
  token: null,
  wrongCredential: false,
  credential: null,
}
export const sessionReducer = createReducer(
  initialState,
  on(loadingAction, (state, {loading}) => ({ ...state, loading: loading})),
  on(isLoggedAction, (state, {isLoggedIn}) => ({ ...state, isLoggedIn: isLoggedIn})),
  on(logInAction, (state, {token}) => ({...state, token: token})),
  on(wrongCredentialAction, (state, {wrongCredential}) => ({...state, wrongCredential: wrongCredential})),
  on(saveCredentialAction, (state, {credential}) => ({...state, credential: credential})),

);
