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

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FontAwesomeModule,
    BacklogPageRoutingModule,
    DragulaModule.forRoot(),
    TranslateModule
  ],
  declarations: [BacklogPage],
  providers: [TaskService],
})
export class BacklogPageModule {}
