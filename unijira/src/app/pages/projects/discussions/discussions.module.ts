import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {DiscussionsPageRoutingModule} from './discussions-routing.module';

import {DiscussionsPage} from './discussions.page';
import {TranslateModule} from '@ngx-translate/core';
import {PipeModule} from '../../../pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiscussionsPageRoutingModule,
    TranslateModule,
    ReactiveFormsModule,
    PipeModule
  ],
  declarations: [DiscussionsPage]
})
export class DiscussionsPageModule {}
