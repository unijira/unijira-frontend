import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {CumulativePageRoutingModule} from './cumulative-routing.module';

import {CumulativePage} from './cumulative.page';
import {
  CategoryService,
  ChartModule,
  DataLabelService,
  DateTimeCategoryService,
  DateTimeService,
  LegendService,
  LineSeriesService,
  StepAreaSeriesService,
  StripLineService,
  TooltipService
} from '@syncfusion/ej2-angular-charts';
import {TranslateModule} from '@ngx-translate/core';
import {PipeModule} from '../../../../pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CumulativePageRoutingModule,
    ChartModule,
    TranslateModule, ReactiveFormsModule,
    PipeModule
  ],
  declarations: [CumulativePage],
  providers: [
    CategoryService,
    LegendService,
    TooltipService,
    DataLabelService,
    LineSeriesService,
    DateTimeService,
    DateTimeCategoryService, StripLineService, StepAreaSeriesService
  ]
})
export class CumulativePageModule {}
