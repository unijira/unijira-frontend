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
  // {
  //   path: 'projects/:id/backlog',
  //   // canActivate: [AuthGuard],
  //   loadChildren: () =>
  //     import('./pages/projects/backlog/backlog.module').then((m) => m.BacklogPageModule),
  // },
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
    path: 'projects',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/projects/projects.module').then( m => m.ProjectsPageModule)
  },
  {
    path: 'projects/wizard',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/projects/wizard/wizard.module').then(m => m.WizardPageModule)
  },
  {
    path: 'projects/:id/invite',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/projects/invite/invite.module').then(m => m.InvitePageModule)
  },
  {
    path: 'projects/:id',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/projects/board/board.module').then(m => m.BoardPageModule)
  },
  {
    path: 'projects/:id/settings/details',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/projects/settings/details/details.module').then(m => m.DetailsPageModule)
  },
  {
    path: 'projects/:id/settings/roles',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/projects/settings/roles/roles.module').then(m => m.RolesPageModule)
  },
  {
    path: 'projects/:id/settings/invitations',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/projects/settings/invitations/invitations.module').then(m => m.InvitationsPageModule)
  },
  {
    path: 'projects/:id/settings/permissions',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/projects/settings/permissions/permissions.module').then(m => m.PermissionsPageModule)
  },
  {
    path: 'projects/:id/tickets',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/projects/tickets/tickets.module').then(m => m.TicketsPageModule)
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
  },
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


