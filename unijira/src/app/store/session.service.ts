import {Injectable} from "@angular/core";
import {SessionState} from "./session.reducer";
import {createFeatureSelector, createReducer, createSelector} from "@ngrx/store";
import { Store } from '@ngrx/store';
import {isLoggedAction, loadingAction, setUserAction} from "./session.action";
import {Observable} from "rxjs";
import { User } from '../models/User'
@Injectable()
export class SessionService {

  constructor(
    private store: Store,
  ) {
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
}
