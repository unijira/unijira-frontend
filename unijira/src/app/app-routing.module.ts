import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './classes/auth-guard';

const routes: Routes = [
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
    path: 'backlog',
    // canActivate: [AuthGuard],
    loadChildren: () =>
      import('./backlog/backlog.module').then((m) => m.BacklogPageModule),
  },
  {
    path: 'auth/active',
    loadChildren: () =>
      import('./activate/activate.module').then(
        (m) => m.ActivatePageModule
      ),
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'home/projects',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/projects/projects.module').then( m => m.ProjectsPageModule)
  },
  {
    path: 'home/projects/wizard',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/projects/wizard/wizard.module').then(m => m.WizardPageModule)
  },
  {
    path: 'projects/:id/invite',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/projects/invite/invite.module').then(m => m.InvitePageModule)
  },
  {
    path: 'project-home',
    canActivate: [AuthGuard],
    loadChildren: () => import('./project-home/project-home.module').then( m => m.ProjectHomePageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  providers: [AuthGuard],
  exports: [RouterModule]
})
export class AppRoutingModule { }


