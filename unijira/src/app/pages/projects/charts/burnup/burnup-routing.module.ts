import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BurnupPage } from './burnup.page';
import {BrowserModule} from '@angular/platform-browser';
import {ChartModule} from '@syncfusion/ej2-angular-charts';

const routes: Routes = [
  {
    path: '',
    component: BurnupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BurnupPageRoutingModule {}
