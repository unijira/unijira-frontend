import {
  BacklogEditWeightPopoversComponent
} from './pages/projects/backlog/popovers/backlog-edit-weight-popovers/backlog-edit-weight-popovers.component';
import {
  BacklogEditStatusPopoversComponent
} from './pages/projects/backlog/popovers/backlog-edit-status-popovers/backlog-edit-status-popovers.component';
import {NgModule} from '@angular/core';
import {BrowserModule, Title} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';
import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {taskReducer} from './store/task.reducer';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {StoreModule} from '@ngrx/store';
import {SessionService} from './store/session.service';
import {LoadingComponent} from './components/loading/loading.component';
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
import {FontAwesomeModule,} from '@fortawesome/angular-fontawesome';
import {FormsModule} from '@angular/forms';
import {NotificationsComponent} from './components/notifications/notifications.component';
import {PipeModule} from './pipe.module';
<<<<<<< HEAD
import {BlDetailComponent} from './modals/bl-detail/bl-detail.component';
import { GanttModule } from '@syncfusion/ej2-angular-gantt';
import { DialogModule} from '@syncfusion/ej2-angular-popups';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
=======
import {BlDetailComponent} from './pages/projects/backlog/modals/bl-detail/bl-detail.component';
import {AngularFireModule} from '@angular/fire';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {environment} from '../environments/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
>>>>>>> 842baa80c8fc374561a139e905cab53fe9f8bcb8

export const createTranslateLoader = (http: HttpClient) =>
  new TranslateHttpLoader(http, './assets/translations/', '.json');

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    UserActionPopoverComponent,
    BacklogEditWeightPopoversComponent,
    BacklogEditStatusPopoversComponent,
    NotificationsComponent,
    BlDetailComponent
  ],
  entryComponents: [],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    PipeModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FontAwesomeModule,
    StoreModule.forRoot({ sessionReducer, taskReducer }),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    DragulaModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: false,
    }),
    EffectsModule.forRoot([SessionEffects]),
    FormsModule,
<<<<<<< HEAD
    GanttModule,
    DialogModule,
    TextBoxModule

=======
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule
>>>>>>> 842baa80c8fc374561a139e905cab53fe9f8bcb8
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    SessionService,
    AuthGuard,
    Title
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
