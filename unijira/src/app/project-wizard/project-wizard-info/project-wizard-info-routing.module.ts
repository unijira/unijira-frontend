import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectWizardInfoPage } from './project-wizard-info.page';

const routes: Routes = [
  {
    path: '',
    component: ProjectWizardInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectWizardInfoPageRoutingModule {}
