import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WizardPageRoutingModule } from './wizard-routing.module';
import { TranslateModule } from '@ngx-translate/core';

import { WizardPage } from './wizard.page';
import { InfoPageModule } from './info/info.module';
import { InvitePageModule } from './invite/invite.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WizardPageRoutingModule,
    InfoPageModule,
    InvitePageModule,
    TranslateModule
  ],
  declarations: [WizardPage]
})
export class WizardPageModule {}
