import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SingoloitemPage } from './singoloitem.page';

const routes: Routes = [
  {
    path: '',
    component: SingoloitemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingoloitemPageRoutingModule {}
