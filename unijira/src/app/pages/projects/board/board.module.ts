import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {BoardPageRoutingModule} from './board-routing.module';

import {BoardPage} from './board.page';
import {TranslateModule} from '@ngx-translate/core';
import {BoardCardComponent} from './board-card/board-card.component';
import {PipeModule} from '../../../pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BoardPageRoutingModule,
    TranslateModule,
    ReactiveFormsModule,
    PipeModule
  ],
  declarations: [BoardPage, BoardCardComponent]
})
export class BoardPageModule {}
