import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ProjectHomePage} from './project-home.page';

const routes: Routes = [
  {
    path: '',
    component: ProjectHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectHomePageRoutingModule {}
