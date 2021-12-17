import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProjectWizardInfoPageRoutingModule } from './project-wizard-info-routing.module';

import { ProjectWizardInfoPage } from './project-wizard-info.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ProjectWizardInfoPageRoutingModule
    ],
    exports: [
        ProjectWizardInfoPage
    ],
    declarations: [ProjectWizardInfoPage]
})
export class ProjectWizardInfoPageModule {}
