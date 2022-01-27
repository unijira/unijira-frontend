import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DefOfDonePageRoutingModule } from './defofdone-routing.module';

import { DefOfDonePage } from './defofdone.page';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DefOfDonePageRoutingModule,
    TranslateModule
  ],
  declarations: [DefOfDonePage]
})
export class DefOfDonePageModule {}
