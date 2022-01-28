import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BurndownPage } from './burndown.page';
import {
  CategoryService, ChartModule,
  DataLabelService, DateTimeCategoryService, DateTimeService,
  LegendService,
  LineSeriesService, StripLineService,
  TooltipService
} from '@syncfusion/ej2-angular-charts';
import {TranslateModule} from '@ngx-translate/core';
import {PipeModule} from '../../../../pipe.module';
import {BurndownPageRoutingModule} from './burndown-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BurndownPageRoutingModule,
    ChartModule,
    TranslateModule, ReactiveFormsModule,
    PipeModule
  ],
  declarations: [BurndownPage],
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
export class BurndownPageModule {}
