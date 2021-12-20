import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProjectHomePageRoutingModule } from './project-home-routing.module';

import { ProjectHomePage } from './project-home.page';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProjectHomePageRoutingModule,
    TranslateModule
  ],
  declarations: [ProjectHomePage]
})
export class ProjectHomePageModule {}
