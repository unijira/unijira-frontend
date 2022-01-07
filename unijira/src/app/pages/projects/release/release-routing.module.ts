import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReleasePage } from './release.page';

const routes: Routes = [
  {
    path: '',
    component: ReleasePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReleasePageRoutingModule {}
