import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProjectsPage} from './projects.page';
import {AuthGuard} from '../../classes/auth-guard';

const routes: Routes = [
  {
    path: '',
    component: ProjectsPage
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
    path: ':id/permissions',
    canActivate: [AuthGuard],
    loadChildren: () => import('./settings/permissions/permissions.module').then( m => m.PermissionsPageModule)
  },
  {
    path: ':id/board',
    canActivate: [AuthGuard],
    loadChildren: () => import('./board/board.module').then( m => m.BoardPageModule)
  },
  {
    path: ':id/releases',
    canActivate: [AuthGuard],
    loadChildren: () => import('./releases/releases.module').then(m => m.ReleasesPageModule)
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
  {
    path: ':id/discussions',
    canActivate: [AuthGuard],
    loadChildren: () => import('./discussions/discussions.module').then( m => m.DiscussionsPageModule)
  },
  {
    path: ':id/charts/burnup',
    canActivate: [AuthGuard],
    loadChildren: () => import('./charts/burnup/burnup.module').then( m => m.BurnupPageModule)
  },
  {
    path: ':id/settings/defofdone',
    canActivate: [AuthGuard],
    loadChildren: () => import('./settings/defofdone/defofdone.module').then( m => m.DefOfDonePageModule)
  },
  {
    path: ':id/documents',
    loadChildren: () => import('./documents/documents.module').then( m => m.DocumentsPageModule)
  },

  {
    path: ':id/charts/burndown',
    loadChildren: () => import('./charts/burndown/burndown.module').then( m => m.BurndownPageModule)
  },






];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectsPageRoutingModule {}
