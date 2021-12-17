import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./classes/auth-guard";

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
  // {
  //   path: 'backlog',
  //   loadChildren: () =>
  //     import('./backlog/backlog.module').then((m) => m.BacklogPageModule),
  // },
  {
    path: 'auth/active',
    loadChildren: () =>
      import('./activate/activate.module').then(
        (m) => m.ActivatePageModule
      ),
  },
  {
    path: 'project-wizard',
    loadChildren: () => import('./project-wizard/project-wizard.module').then( m => m.ProjectWizardPageModule)
  },
  {
    path: 'project-wizard-info',
    loadChildren: () => import('./project-wizard/project-wizard-info/project-wizard-info.module').then( m => m.ProjectWizardPageModule)
  },
  {
    path: 'project-wizard-invite',
    loadChildren: () => import('./project-wizard/project-wizard-invite/project-wizard-invite.module').then( m => m.ProjectWizardPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }


