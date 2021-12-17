import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProjectWizardPageRoutingModule } from './project-wizard-routing.module';

import { ProjectWizardPage } from './project-wizard.page';
import {ProjectWizardInfoPageModule} from "./project-wizard-info/project-wizard-info.module";
import {ProjectWizardInvitePageModule} from "./project-wizard-invite/project-wizard-invite.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProjectWizardPageRoutingModule,
    ProjectWizardInfoPageModule,
    ProjectWizardInvitePageModule
  ],
  declarations: [ProjectWizardPage]
})
export class ProjectWizardPageModule {}
