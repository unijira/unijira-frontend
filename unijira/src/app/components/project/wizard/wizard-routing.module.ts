import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


import {WizardPage} from './wizard.page';

const routes: Routes = [
  {
    path: '',
    component: WizardPage
  },
  {
    path: 'info',
    loadChildren: () => import('./info/info.module').then( m => m.InfoPageModule)
  },
  {
    path: 'invite',
    loadChildren: () => import('./invite/invite.module').then( m => m.InvitePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WizardPageRoutingModule {}
