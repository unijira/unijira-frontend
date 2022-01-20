import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiscussionsPage } from './discussions.page';

const routes: Routes = [
  {
    path: '',
    component: DiscussionsPage
  },
  {
    path: ':id/discussions/:idDiscussion',
    loadChildren: () => import('./discussion/discussion.module').then( m => m.DiscussionPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiscussionsPageRoutingModule {}
