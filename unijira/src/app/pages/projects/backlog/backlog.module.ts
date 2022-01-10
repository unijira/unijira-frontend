import { SprintlistComponent } from '../../../components/sprintlist/sprintlist.component';
import { BackloglistComponent } from '../../../components/backloglist/backloglist.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {BacklogPageRoutingModule} from './backlog-routing.module';
import {TicketStatusPipe} from './pipes/ticket-status.pipe';
import {TicketStatusColorPipe} from './pipes/ticket-status-color.pipe';
import {TicketTypePipe} from './pipes/ticket-type.pipe';
import {BacklogPage} from './backlog.page';
import {DragulaModule} from 'ng2-dragula';
import {TaskService} from '../../../store/task.service';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

import {TranslateModule} from '@ngx-translate/core';

import {PipeModule} from '../../../pipe.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FontAwesomeModule,
    BacklogPageRoutingModule,
    DragulaModule.forRoot(),
    TranslateModule,
    PipeModule
  ],
  declarations: [BacklogPage, BackloglistComponent, SprintlistComponent , TicketStatusPipe, TicketStatusColorPipe, TicketTypePipe],
  providers: [TaskService],
})
export class BacklogPageModule {}
