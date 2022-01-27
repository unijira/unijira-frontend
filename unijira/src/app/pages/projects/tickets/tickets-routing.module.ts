import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {TicketsPage} from './tickets.page';
import {AuthGuard} from '../../../classes/auth-guard';

const routes: Routes = [
  {
    path: '',
    component: TicketsPage
  },
  {
    path: ':ticket',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/view/view.module').then( m => m.ViewPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicketsPageRoutingModule {}
