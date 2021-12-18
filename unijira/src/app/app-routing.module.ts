import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './classes/auth-guard';

// @ts-ignore
const routes: Routes = [
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./registration/registration.module').then( m => m.RegistrationPageModule)
  },
  {
    path: 'auth/active',
    loadChildren: () =>
      import('./activate/activate.module').then(
        (m) => m.ActivatePageModule
      ),
  },
  {
    path: 'user/home/wizard',
    loadChildren: () => import('./components/project/wizard/wizard.module').then( m => m.WizardPageModule)
  },
  {
    path: 'user/home/wizard/info',
    loadChildren: () => import('./components/project/wizard/info/info.module').then( m => m.InfoPageModule)
  },
  {
    path: 'user/home/wizard/invite',
    loadChildren: () => import('./components/project/wizard/invite/invite.module').then( m => m.InvitePageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }


