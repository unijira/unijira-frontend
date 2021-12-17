import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProjectWizardInvitePageRoutingModule } from './project-wizard-invite-routing.module';

import { ProjectWizardInvitePage } from './project-wizard-invite.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ProjectWizardInvitePageRoutingModule
    ],
    exports: [
        ProjectWizardInvitePage
    ],
    declarations: [ProjectWizardInvitePage]
})
export class ProjectWizardInvitePageModule {}
