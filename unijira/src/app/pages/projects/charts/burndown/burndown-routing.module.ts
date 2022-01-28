import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BurndownPage } from './burndown.page';

const routes: Routes = [
  {
    path: '',
    component: BurndownPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BurndownPageRoutingModule {}
