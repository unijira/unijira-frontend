import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './classes/auth-guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./pages/registration/registration.module').then(m => m.RegistrationPageModule)
  },
  {
    path: 'projects/:id/backlog',
    // canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/projects/backlog/backlog.module').then((m) => m.BacklogPageModule),
  },
  {
    path: 'activate',
    loadChildren: () => import('./pages/activate/activate.module').then(m => m.ActivatePageModule)
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'projects',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/projects/projects.module').then( m => m.ProjectsPageModule)
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/user/settings/profile/profile.module').then( m => m.ProfilePageModule)
},
{
    path: 'users/:id/overview',
    canActivate: [AuthGuard],
  loadChildren: () => import('./pages/user/profile-overview/profile-overview.module').then( m => m.ProfileOverviewPageModule)
}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload',
    })
  ],
  providers: [AuthGuard],
  exports: [RouterModule]
})
export class AppRoutingModule { }


