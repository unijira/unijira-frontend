import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ActivatePageRoutingModule} from './activate-routing.module';

import {ActivatePage} from './activate.page';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActivatePageRoutingModule,
    TranslateModule
  ],
  declarations: [ActivatePage]
})
export class ActivatePageModule {}
