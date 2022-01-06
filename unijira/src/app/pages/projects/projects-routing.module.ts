import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ProjectsPage} from './projects.page';

const routes: Routes = [
  {
    path: '',
    component: ProjectsPage
  },
  {
    path: 'permissions',
    loadChildren: () => import('./settings/permissions/permissions.module').then( m => m.PermissionsPageModule)
  },  {
    path: 'board',
    loadChildren: () => import('./board/board.module').then( m => m.BoardPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectsPageRoutingModule {}
