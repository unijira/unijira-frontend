import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectWizardPage } from './project-wizard.page';

const routes: Routes = [
  {
    path: '',
    component: ProjectWizardPage
  },
  {
    path: 'project-wizard-info',
    loadChildren: () => import('./project-wizard-info/project-wizard-info.module').then( m => m.ProjectWizardInfoPageModule)
  },
  {
    path: 'project-wizard-invite',
    loadChildren: () => import('./project-wizard-invite/project-wizard-invite.module').then( m => m.ProjectWizardInvitePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectWizardPageRoutingModule {}
