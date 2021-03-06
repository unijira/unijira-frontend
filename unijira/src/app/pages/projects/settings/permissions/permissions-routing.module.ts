import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {PermissionsPage} from './permissions.page';

const routes: Routes = [
  {
    path: '',
    component: PermissionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PermissionsPageRoutingModule {}
