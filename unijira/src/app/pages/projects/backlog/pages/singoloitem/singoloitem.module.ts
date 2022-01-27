import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {SingoloitemPageRoutingModule} from './singoloitem-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {SingoloitemPage} from './singoloitem.page';
import {ClipboardModule, ClipboardService} from 'ngx-clipboard';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SingoloitemPageRoutingModule,
    FontAwesomeModule,
    TranslateModule,
    ClipboardModule
  ],
  declarations: [SingoloitemPage],
  providers: [ClipboardService]
})
export class SingoloitemPageModule {}
