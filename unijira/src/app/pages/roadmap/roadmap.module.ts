import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoadmapPageRoutingModule } from './roadmap-routing.module';
import { DialogModule} from '@syncfusion/ej2-angular-popups';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { RoadmapPage } from './roadmap.page';
import { GanttComponent, EditService , FilterService, SortService, SelectionService, RowDDService,ToolbarService,DayMarkersService }
from '@syncfusion/ej2-angular-gantt';
import { GanttAllModule } from '@syncfusion/ej2-angular-gantt';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import {TranslateModule} from '@ngx-translate/core';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoadmapPageRoutingModule,GanttAllModule,DialogModule,TextBoxModule,DatePickerModule,TranslateModule
  ],
  declarations: [RoadmapPage],
  providers: [EditService , FilterService, SortService, SelectionService, RowDDService,ToolbarService,DayMarkersService,GanttComponent,
    ]
})
export class RoadmapPageModule {}
