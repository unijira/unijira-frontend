import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileOverviewPage } from './profile-overview.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileOverviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileOverviewPageRoutingModule {}
