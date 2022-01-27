import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {DiscussionsPageRoutingModule} from './discussions-routing.module';

import {DiscussionsPage} from './discussions.page';
import {TranslateModule} from '@ngx-translate/core';
import {PipeModule} from '../../../pipe.module';
import {NewDiscussionComponent} from './new-discussion/new-discussion.component';

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
  exports: [
    NewDiscussionComponent
  ],
  declarations: [DiscussionsPage, NewDiscussionComponent]
})
export class DiscussionsPageModule {}
