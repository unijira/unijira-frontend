import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';
import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {StoreModule} from '@ngrx/store';
import {SessionService} from './store/session.service';
import {LoadingComponent} from './loading/loading.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {AuthGuard} from './classes/auth-guard';
import {DragulaModule} from 'ng2-dragula';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';
import {SessionEffects} from './store/session.effects';
import {sessionReducer} from './store/session.reducer';
import {UserActionPopoverComponent} from './popovers/user-action-popover/user-action-popover.component';


export const createTranslateLoader =
  (http: HttpClient) => new TranslateHttpLoader(http, './assets/translations/', '.json');


@NgModule({
  declarations: [AppComponent, LoadingComponent, UserActionPopoverComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    StoreModule.forRoot({
      sessionReducer
    }),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    DragulaModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: false,
    }),
    EffectsModule.forRoot([SessionEffects]),
  ],
  providers: [{provide: RouteReuseStrategy, useClass: IonicRouteStrategy}, SessionService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}

