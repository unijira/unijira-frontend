import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectWizardInvitePage } from './project-wizard-invite.page';

const routes: Routes = [
  {
    path: '',
    component: ProjectWizardInvitePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectWizardInvitePageRoutingModule {}
