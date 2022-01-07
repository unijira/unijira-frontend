import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReleasePageRoutingModule } from './release-routing.module';

import { ReleasePage } from './release.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReleasePageRoutingModule
  ],
  declarations: [ReleasePage]
})
export class ReleasePageModule {}
