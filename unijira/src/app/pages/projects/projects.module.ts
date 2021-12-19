import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ProjectsPageRoutingModule} from './projects-routing.module';

import {ProjectsPage} from './projects.page';
import {TranslateModule} from '@ngx-translate/core';
import {PipeModule} from '../../pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProjectsPageRoutingModule,
    TranslateModule,
    PipeModule
  ],
  declarations: [ProjectsPage]
})
export class ProjectsPageModule {}
