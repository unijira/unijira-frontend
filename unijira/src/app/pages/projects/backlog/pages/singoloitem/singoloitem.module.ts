import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SingoloitemPageRoutingModule } from './singoloitem-routing.module';

import { SingoloitemPage } from './singoloitem.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SingoloitemPageRoutingModule
  ],
  declarations: [SingoloitemPage]
})
export class SingoloitemPageModule {}
