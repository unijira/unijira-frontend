import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../../classes/auth-guard';

const routes: Routes = [
  {
    path: 'permissions',
    canActivate: [AuthGuard],
    loadChildren: () => import('./settings/permissions/permissions.module').then( m => m.PermissionsPageModule)
  },
  {
    path: 'board',
    canActivate: [AuthGuard],
    loadChildren: () => import('./board/board.module').then( m => m.BoardPageModule)
  },
  {
    path: 'release',
    canActivate: [AuthGuard],
    loadChildren: () => import('./release/release.module').then( m => m.ReleasePageModule)
  },
  {
    path: 'wizard',
    canActivate: [AuthGuard],
    loadChildren: () => import('./wizard/wizard.module').then(m => m.WizardPageModule)
  },
  {
    path: ':id',
    canActivate: [AuthGuard],
    loadChildren: () => import('./board/board.module').then(m => m.BoardPageModule)
  },
  {
    path: ':id/invite',
    canActivate: [AuthGuard],
    loadChildren: () => import('./invite/invite.module').then(m => m.InvitePageModule)
  },
  {
    path: ':id/settings/details',
    canActivate: [AuthGuard],
    loadChildren: () => import('./settings/details/details.module').then(m => m.DetailsPageModule)
  },
  {
    path: ':id/settings/roles',
    canActivate: [AuthGuard],
    loadChildren: () => import('./settings/roles/roles.module').then(m => m.RolesPageModule)
  },
  {
    path: ':id/settings/invitations',
    canActivate: [AuthGuard],
    loadChildren: () => import('./settings/invitations/invitations.module').then(m => m.InvitationsPageModule)
  },
  {
    path: ':id/settings/permissions',
    canActivate: [AuthGuard],
    loadChildren: () => import('./settings/permissions/permissions.module').then(m => m.PermissionsPageModule)
  },
  {
    path: ':id/tickets',
    canActivate: [AuthGuard],
    loadChildren: () => import('./tickets/tickets.module').then(m => m.TicketsPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectsPageRoutingModule {}
