import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ProjectsPageRoutingModule} from './projects-routing.module';

import {ProjectsPage} from './projects.page';
import {TranslatePipe} from '@ngx-translate/core';
import {TimePipe} from '../../pipes/time.pipe';
import {FilteredPipe} from '../../pipes/filtered.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProjectsPageRoutingModule
  ],
  declarations: [ProjectsPage, TranslatePipe, TimePipe, FilteredPipe]
})
export class ProjectsPageModule {}
