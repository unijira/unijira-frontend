import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BurnupPageRoutingModule } from './burnup-routing.module';

import { BurnupPage } from './burnup.page';
import {
  CategoryService,
  ChartModule,
  DataLabelService, DateTimeCategoryService, DateTimeService,
  LegendService, LineSeriesService, StripLineService,
  TooltipService
} from '@syncfusion/ej2-angular-charts';
import {TranslateModule} from '@ngx-translate/core';
import {PipeModule} from '../../../../pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BurnupPageRoutingModule,
    ChartModule,
    TranslateModule, ReactiveFormsModule,
    PipeModule
  ],
  declarations: [BurnupPage],
  providers: [
    CategoryService,
    LegendService,
    TooltipService,
    DataLabelService,
    LineSeriesService,
    DateTimeService,
    DateTimeCategoryService, StripLineService
  ]
})
export class BurnupPageModule {}
