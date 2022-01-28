import {SprintlistComponent} from '../../../components/sprintlist/sprintlist.component';
import {BackloglistComponent} from '../../../components/backloglist/backloglist.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {BacklogPageRoutingModule} from './backlog-routing.module';
import {BacklogPage} from './backlog.page';
import {DragulaModule} from 'ng2-dragula';
import {TaskService} from '../../../store/task.service';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

import {TranslateModule} from '@ngx-translate/core';

import {PipeModule} from '../../../pipe.module';
import {TicketsPageModule} from '../tickets/tickets.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FontAwesomeModule,
    BacklogPageRoutingModule,
    DragulaModule.forRoot(),
    TranslateModule,
    PipeModule,
    TicketsPageModule
  ],
    declarations: [BacklogPage, BackloglistComponent, SprintlistComponent],
    providers: [TaskService]
})
export class BacklogPageModule {}
