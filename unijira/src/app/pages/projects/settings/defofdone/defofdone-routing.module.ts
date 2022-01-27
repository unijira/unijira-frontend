import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefOfDonePage } from './defofdone.page';

const routes: Routes = [
  {
    path: '',
    component: DefOfDonePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DefOfDonePageRoutingModule {}
