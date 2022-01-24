import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DiscussionsPage} from './discussions.page';

const routes: Routes = [
  {
    path: '',
    component: DiscussionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiscussionsPageRoutingModule {}
