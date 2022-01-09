import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {BacklogPage} from './backlog.page';

const routes: Routes = [
  {
    path: '',
    component: BacklogPage,
  },
  {
    path: 'singoloitem',
    loadChildren: () => import('./pages/singoloitem/singoloitem.module').then( m => m.SingoloitemPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BacklogPageRoutingModule {}
