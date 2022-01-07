import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReleasePageRoutingModule } from './releases-routing.module';

import { ReleasesPage } from './releases-page.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReleasePageRoutingModule
  ],
  declarations: [ReleasesPage]
})
export class ReleasePageModule {}
