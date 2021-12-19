import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import {sessionReducer} from "./store/session.reducer";
import {SessionService} from "./store/session.service";
import {LoadingComponent} from "./loading/loading.component";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {AuthGuard} from "./classes/auth-guard";
import { DragulaModule } from 'ng2-dragula';
import { taskReducer } from './store/task.reducer';
import { TaskService } from './store/task.service';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import {SessionEffects} from "./store/session.effects";

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

import { BlDetailComponent } from './bl-detail/bl-detail.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/translations/', '.json');
}


@NgModule({
  declarations: [AppComponent, LoadingComponent, BlDetailComponent],
  entryComponents: [],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    FontAwesomeModule,
    AppRoutingModule,
    StoreModule.forRoot({sessionReducer, taskReducer}),
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
    EffectsModule.forRoot([SessionEffects])
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, SessionService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}

