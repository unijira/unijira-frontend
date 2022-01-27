import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {DiscussionPageRoutingModule} from './discussion-routing.module';

import {DiscussionPage} from './discussion.page';
import {TranslateModule} from '@ngx-translate/core';
import {DiscussionsPageModule} from '../discussions.module';
import {PipeModule} from '../../../../pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiscussionPageRoutingModule,
    TranslateModule,
    DiscussionsPageModule,
    ReactiveFormsModule,
    PipeModule,
  ],
  declarations: [DiscussionPage]
})
export class DiscussionPageModule {}
