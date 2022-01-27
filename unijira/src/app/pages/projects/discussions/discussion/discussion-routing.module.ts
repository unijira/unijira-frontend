import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DiscussionPage} from './discussion.page';

const routes: Routes = [
  {
    path: '',
    component: DiscussionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiscussionPageRoutingModule {}
