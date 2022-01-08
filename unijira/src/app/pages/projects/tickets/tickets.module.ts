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

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        TicketsPageRoutingModule,
        TranslateModule,
        PipeModule
    ],
  declarations: [TicketsPage, TicketStatusPipe, TicketStatusColorPipe, TicketTypePipe]
})
export class TicketsPageModule {}
