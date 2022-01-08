import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ReleasesPageRoutingModule} from './releases-routing.module';

import {ReleasesPage} from './releases-page';
import {TranslateModule} from '@ngx-translate/core';
import {PipeModule} from '../../../pipe.module';
import {ReleaseStatusColorPipe} from './pipes/release-status-color.pipe';
import {ReleaseStatusPipe} from './pipes/release-status.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReleasesPageRoutingModule,
    TranslateModule,
    PipeModule
  ],
  declarations: [ReleasesPage, ReleaseStatusColorPipe, ReleaseStatusPipe]
})
export class ReleasesPageModule {}
