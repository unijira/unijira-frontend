import { createReducer, on} from '@ngrx/store';
import {
  isLoggedAction,
  loadingAction,
  logInAction,
  logOutAction,
  userInfoAction,
  wrongCredentialAction
} from './session.action';
import {User} from '../models/User';
import {UserInfo} from '../models/users/UserInfo';

export interface SessionState {
  loading: boolean;
  isLoggedIn: boolean;
  user: User;
  token: string;
  wrongCredential: boolean;
  userInfo: UserInfo
}

export const initialState: SessionState = {
  loading: false,
  isLoggedIn: false,
  user: null,
  token: null,
  wrongCredential: false,
  userInfo: null
};


export const sessionReducer = createReducer(
  initialState,
  on(loadingAction, (state, {loading}) => ({ ...state, loading})),
  on(isLoggedAction, (state, {isLoggedIn}) => ({ ...state, isLoggedIn})),
  on(logInAction, (state, {token}) => ({...state, token})),
  on(wrongCredentialAction, (state, {wrongCredential}) => ({...state, wrongCredential})),
  on(userInfoAction, (state, {userInfo}) => ({...state, userInfo})),
  on(logOutAction, () => initialState),
);
