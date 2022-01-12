import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {TicketsPageRoutingModule} from './tickets-routing.module';

import {TicketsPage} from './tickets.page';
import {TranslateModule} from '@ngx-translate/core';
import {PipeModule} from '../../../pipe.module';
import {TicketStatusPipe} from './pipes/ticket-status.pipe';
import {TicketStatusColorPipe} from './pipes/ticket-status-color.pipe';
import {TicketTypePipe} from './pipes/ticket-type.pipe';
import {TicketDataTableComponent} from './components/ticket-data-table/ticket-data-table.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TicketsPageRoutingModule,
    TranslateModule,
    PipeModule
  ],
  exports: [
    TicketDataTableComponent,
    TicketStatusPipe,
    TicketStatusColorPipe
  ],
  declarations: [TicketsPage, TicketStatusPipe, TicketStatusColorPipe, TicketTypePipe, TicketDataTableComponent]
})
export class TicketsPageModule {}
