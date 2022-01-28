import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CumulativePage } from './cumulative.page';

const routes: Routes = [
  {
    path: '',
    component: CumulativePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CumulativePageRoutingModule {}
