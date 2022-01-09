import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {PermissionsPageRoutingModule} from './permissions-routing.module';

import {PermissionsPage} from './permissions.page';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PermissionsPageRoutingModule,
        TranslateModule,
        ReactiveFormsModule
    ],
  declarations: [PermissionsPage]
})
export class PermissionsPageModule {}
