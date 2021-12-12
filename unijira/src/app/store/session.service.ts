import {Injectable} from "@angular/core";
import {SessionState} from "./session.reducer";
import {createFeatureSelector, createReducer, createSelector} from "@ngrx/store";
import { Store } from '@ngrx/store';
import {
  errorAction,
  isLoggedAction,
  loadingAction,
  logInAction,
  setUserAction,
  wrongCredentialAction
} from "./session.action";
import {Observable} from "rxjs";
import { User } from '../models/User'
import {Error} from "../classes/error";
import {AccountService} from "../services/account.service";

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
    this.getToken().subscribe(tok => this.token = tok);
  }

  toggleLoading(toggle: boolean) {
    this.store.dispatch(loadingAction({loading: toggle}));
  }

  userLogged(isLoggedIn: boolean) {
    this.store.dispatch(isLoggedAction({isLoggedIn: isLoggedIn}));
  }

  getLoading(): Observable<boolean> {
    const selectLoading = createSelector(createFeatureSelector<SessionState>('sessionReducer'),
      (state) => {return state.loading});
    return this.store.select(selectLoading);
  }

  getIsUserLogged(): Observable<boolean> {
    const selectIsLoggedIn = createSelector(createFeatureSelector<SessionState>('sessionReducer'),
      (state) => {return state.isLoggedIn});
    return this.store.select(selectIsLoggedIn);
  }
  setUser(user: User) {
    this.store.dispatch(setUserAction({ user: user }));
  }

  logIn(username: string, password: string) {
    this.accountService.logIn(username, password).subscribe(
      (res: string) => {
        this.saveToken(res);
        this.userLogged(true);
      },
      err => {
        const error = Error.toError(err);
        if (error.status === 401) {
          this.store.dispatch(wrongCredentialAction({wrongCredential: true}));
        } else {
          this.store.dispatch(errorAction({error: error}));
        }
      });
  }

  logout() {
    this.saveToken(null);
    this.userLogged(false);
  }

  refreshToken(token: string) {
    this.accountService.refreshToken(token).subscribe(
      (res: string) => this.saveToken(res),
      err => this.store.dispatch(errorAction({error: Error.toError(err)}))
    );
  }

  saveToken(token: string) {
    this.store.dispatch(logInAction({ token: token }));
    localStorage.setItem('token', token);
  }

  getToken(): Observable<string>{
    const selectToken = createSelector(createFeatureSelector<SessionState>('sessionReducer'),
      (state) => {return state.token});
    return this.store.select(selectToken);
  }

  setWrongCredential(wrongCrdential: boolean) {
    this.store.dispatch(wrongCredentialAction({wrongCredential: wrongCrdential}));
  }

  getWrongCredential(): Observable<boolean> {
    const selectWrongCred = createSelector(createFeatureSelector<SessionState>('sessionReducer'),
      (state) => {return state.wrongCredential});
    return this.store.select(selectWrongCred);
  }
}
