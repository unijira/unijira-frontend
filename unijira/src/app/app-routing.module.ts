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
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./pages/registration/registration.module').then(m => m.RegistrationPageModule)
  },
  {
    path: 'home/projects/:id/backlog',
    // canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/projects/backlog/backlog.module').then((m) => m.BacklogPageModule),
  },
  {
    path: 'auth/active',
    loadChildren: () =>
      import('./pages/activate/activate.module').then(
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
    path: 'home/projects/:id/project-home',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/projects/home/project-home.module').then(m => m.ProjectHomePageModule)
  },
  {
    path: 'home/projects/:id/settings/details',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/projects/settings/details/details.module').then(m => m.DetailsPageModule)
  },
  {
    path: 'home/projects/:id/settings/notifications',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/projects/settings/notifications/notifications.module').then(m => m.NotificationsPageModule)
  },
  {
    path: 'home/projects/:id/settings/roles',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/projects/settings/roles/roles.module').then(m => m.RolesPageModule)
  },
  {
    path: 'home/projects/:id/settings/invitations',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/projects/settings/invitations/invitations.module').then(m => m.InvitationsPageModule)
  },
  {
    path: 'home/projects/:id/settings/permissions',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/projects/settings/permissions/permissions.module').then(m => m.PermissionsPageModule)
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


