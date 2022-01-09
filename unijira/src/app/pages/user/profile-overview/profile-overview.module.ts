import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ProfileOverviewPageRoutingModule} from './profile-overview-routing.module';

import {TranslateModule} from '@ngx-translate/core';
import {ProfileOverviewPage} from './profile-overview.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ProfileOverviewPageRoutingModule,
        TranslateModule
    ],
  declarations: [ProfileOverviewPage]
})
export class ProfileOverviewPageModule {}
