import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ViewPageRoutingModule} from './view-routing.module';

import {ViewPage} from './view.page';
import {TranslateModule} from '@ngx-translate/core';
import {ReleasesPageModule} from '../../releases.module';
import {PipeModule} from '../../../../../pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ViewPageRoutingModule,
    ReleasesPageModule,
    PipeModule
  ],
  declarations: [ViewPage]
})
export class ViewPageModule {}
