import {Injectable} from "@angular/core";
import {SessionState} from "./session.reducer";
import {createFeatureSelector, createReducer, createSelector} from "@ngrx/store";
import { Store } from '@ngrx/store';
import {
  errorAction,
  isLoggedAction,
  loadingAction,
  logInAction, saveCredentialAction,
  setUserAction,
  wrongCredentialAction
} from "./session.action";
import {Observable} from "rxjs";
import { User } from '../models/User'
import {Error} from "../classes/error";
import {AccountService} from "../services/account.service";
import {Credential} from "../classes/credential";
@Injectable()
export class SessionService {

  public token: string;
  public credential: Credential;

  constructor(
    private store: Store,
    private accountService: AccountService
  ) {
    this.getToken().subscribe(tok => this.token = tok);
    this.getCredential().subscribe(cred => this.credential = cred);
  }

  setWrongCredential(wrongCrdential: boolean) {
    this.store.dispatch(wrongCredentialAction({wrongCredential: wrongCrdential}));
  }

  getWrongCredential(): Observable<boolean> {
    const selectWrongCred = createSelector(createFeatureSelector<SessionState>('sessionReducer'),
      (state) => {return state.wrongCredential});
    return this.store.select(selectWrongCred);
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

  getUser(): Observable<User> {
    const selectUser = createSelector(createFeatureSelector<SessionState>('sessionReducer'),
      (state) => {return state.user});
    return this.store.select(selectUser);
  }

  logIn(username: string, password: string) {
    this.accountService.logIn(username, password).subscribe(
      (res: string) => {
        this.store.dispatch(logInAction({ token: res }));
        this.userLogged(true);
        this.setCredential(new Credential(username, password));
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

  getToken(): Observable<string>{
    const selectToken = createSelector(createFeatureSelector<SessionState>('sessionReducer'),
      (state) => {return state.token});
    return this.store.select(selectToken);
  }

  setCredential(credential: Credential) {
    this.store.dispatch(saveCredentialAction({credential: credential}));
    const func = arguments.callee.toString();
    console.log("---------------" + func + "---------------");
  }

  getCredential(): Observable<Credential> {
  const selectCredential = createSelector(createFeatureSelector<SessionState>('sessionReducer'),
    (state) => {return state.credential});
  return this.store.select(selectCredential);
  }
}
