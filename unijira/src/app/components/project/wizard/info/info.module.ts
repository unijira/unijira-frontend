import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {InfoPageRoutingModule} from './info-routing.module';
import {TranslateModule} from '@ngx-translate/core';

import {InfoPage} from './info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoPageRoutingModule,
    TranslateModule
  ],
  exports: [
    InfoPage
  ],
  declarations: [InfoPage]
})
export class InfoPageModule {}
