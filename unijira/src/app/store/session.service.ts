import {Injectable} from '@angular/core';
import {SessionState} from './session.reducer';
import {createFeatureSelector, createSelector, Store} from '@ngrx/store';
import {
  errorAction,
  isLoggedAction,
  loadingAction,
  logInAction,
  setUserAction,
  wrongCredentialAction
} from './session.action';
import {catchError, Observable, of} from 'rxjs';
import {User} from '../models/User';
import {Error} from '../classes/error';
import {AccountService} from '../services/account.service';

@Injectable()
export class SessionService {

  public token: string;
  public credential: Credential;

  constructor(
    private store: Store,
    private accountService: AccountService
  ) {
    const tok = localStorage.getItem('token');
    if (tok) {
      this.saveToken(tok);
      this.userLogged(true);
    }
    this.getToken().subscribe(res => this.token = res);
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
      .pipe(catchError(err => {

        const error = Error.toError(err);

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
  }

  refreshToken(token: string) {

    this.accountService.refreshToken(token)
      .pipe(catchError(err => {

        this.store.dispatch(errorAction({error: Error.toError(err)}));
        return of(null);

      })).subscribe(res => this.saveToken(res));

  }

  saveToken(token: string) {
    this.store.dispatch(logInAction({ token }));
    localStorage.setItem('token', token);
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
}
