import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoadmapPageRoutingModule } from './roadmap-routing.module';

import { RoadmapPage } from './roadmap.page';
import { GanttComponent, EditService , FilterService, SortService, SelectionService, RowDDService,ToolbarService,DayMarkersService }
from '@syncfusion/ej2-angular-gantt';
import { GanttAllModule } from '@syncfusion/ej2-angular-gantt';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoadmapPageRoutingModule,GanttAllModule
  ],
  declarations: [RoadmapPage],
  providers: [EditService , FilterService, SortService, SelectionService, RowDDService,ToolbarService,DayMarkersService,GanttComponent]
})
export class RoadmapPageModule {}
