import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BurnupPage } from './burnup.page';


const routes: Routes = [
  {
    path: '',
    component: BurnupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BurnupPageRoutingModule {}
