import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {DetailsPageRoutingModule} from './details-routing.module';

import {DetailsPage} from './details.page';
import {TranslateModule} from '@ngx-translate/core';
import {NgxPopperjsModule} from 'ngx-popperjs';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        DetailsPageRoutingModule,
        ReactiveFormsModule,
        TranslateModule,
        NgxPopperjsModule,
    ],
  declarations: [DetailsPage]
})
export class DetailsPageModule {}
