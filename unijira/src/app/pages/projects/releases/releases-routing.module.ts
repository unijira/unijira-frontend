import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ReleasesPage} from './releases-page';
import {AuthGuard} from '../../../classes/auth-guard';

const routes: Routes = [
  {
    path: '',
    component: ReleasesPage
  },
  {
    path: ':release',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/view/view.module').then( m => m.ViewPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReleasesPageRoutingModule {}
