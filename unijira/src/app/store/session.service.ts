import {Injectable} from '@angular/core';
import {SessionState} from './session.reducer';
import {createFeatureSelector, createSelector, Store} from '@ngrx/store';
import {catchError, Observable, of} from 'rxjs';
import {User} from '../models/User';
import {Error} from '../classes/error';
import {AccountService} from '../services/account.service';

import {
  errorAction,
  isLoggedAction,
  loadingAction,
  logInAction,
  logOutAction, projectAction,
  setUserAction,
  userInfoAction,
  wrongCredentialAction
} from './session.action';
import {UserInfo} from '../models/users/UserInfo';
import {ProjectService} from '../services/common/project.service';
import {Project} from '../models/projects/Project';


@Injectable({
  providedIn: 'root'
})
export class SessionService {

  public token: string;

  constructor(
    private store: Store,
    private accountService: AccountService,
    private projectService: ProjectService
  ) {

    if(localStorage.getItem('token')){

      this.saveToken(localStorage.getItem('token'));
      this.userLogged(true);

    }

  }

  dispatchError(error: any) {
    this.store.dispatch(errorAction({error: Error.toError(error)}));
  }


  toggleLoading(toggle: boolean) {
    this.store.dispatch(loadingAction({loading: toggle}));
  }

  userLogged(isLoggedIn: boolean) {
    this.store.dispatch(isLoggedAction({isLoggedIn}));
  }

  getLoading(): Observable<boolean> {
    const selectLoading = createSelector(createFeatureSelector<SessionState>('sessionReducer'),
      (state) => state.loading);
    return this.store.select(selectLoading);
  }

  getIsUserLogged(): Observable<boolean> {
    const selectIsLoggedIn = createSelector(createFeatureSelector<SessionState>('sessionReducer'),
      (state) => state.isLoggedIn);
    return this.store.select(selectIsLoggedIn);
  }

  setUser(user: User) {
    this.store.dispatch(setUserAction({ user }));
  }

  logIn(username: string, password: string) {
    this.accountService.logIn(username, password)
      .pipe(catchError(error => {

        switch(error.status) {
          case 401:
          case 403:
            this.store.dispatch(wrongCredentialAction({wrongCredential: true}));
            break;
          default:
            this.store.dispatch(errorAction({error}));
        }

        return of(null);

      })).subscribe(res => {

        this.saveToken(res);
        this.userLogged(res != null);

      });
  }

  logout() {
    this.saveToken(null);
    this.userLogged(false);
    this.store.dispatch(logOutAction());
  }

  refreshToken(token: string) {

    this.accountService.refreshToken(token)
      .pipe(catchError(err => {

        this.dispatchError(err);
        return of(null);

      })).subscribe(res => this.saveToken(res));

  }

  saveToken(token?: string) {

    if(token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }

    this.store.dispatch(logInAction({ token }));

  }

  getToken(): Observable<string>{
    const selectToken = createSelector(createFeatureSelector<SessionState>('sessionReducer'),
      (state) => state.token);
    return this.store.select(selectToken);
  }

  setWrongCredential(wrongCrdential: boolean) {
    this.store.dispatch(wrongCredentialAction({wrongCredential: wrongCrdential}));
  }

  getWrongCredential(): Observable<boolean> {
    const selectWrongCred = createSelector(createFeatureSelector<SessionState>('sessionReducer'),
      (state) => state.wrongCredential);
    return this.store.select(selectWrongCred);
  }

  setUserInfo(userInfo: UserInfo) {
    this.store.dispatch(userInfoAction({userInfo}));
  }

  loadUserInfo() {
    this.accountService.me()
      .subscribe(user => this.setUserInfo(user),
          err => this.dispatchError(err));
  }

  getUserInfo(): Observable<UserInfo> {
    const selectUserInfo = createSelector(createFeatureSelector<SessionState>('sessionReducer'),
      (state) => state.userInfo);
    return this.store.select(selectUserInfo);
  }

  loadProject(id: number){
    this.projectService.getProject(id).subscribe(
      (project) => this.store.dispatch(projectAction({project})),
      (err) => this.dispatchError(err)
    );
  }

  getProject(): Observable<Project> {
    const selectProject = createSelector(createFeatureSelector<SessionState>('sessionReducer'),
      (state) => state.project);
    return this.store.select(selectProject);
  }
}
