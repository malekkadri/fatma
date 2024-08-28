import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { AdminGuard } from './admin.guard';
import { UserGuard } from './user.guard';
import { UsersComponent } from './pages/ui-components/users/users.component';
import { BankAccountComponent } from './pages/ui-components/bank-account/bank-account.component';
import { DemandeCreditAdminComponent } from './pages/ui-components/demande-credit-admin/demande-credit-admin.component';

const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: 'admin/dashboard',
        pathMatch: 'full',
      },
      {
        path: 'admin/dashboard',
        loadChildren: () =>
          import('./pages/pages.module').then((m) => m.PagesModule),
        canActivate: [AdminGuard],
      },
      {
        path: 'admin/users',
        component: UsersComponent,
        canActivate: [AdminGuard], // Assuming you have an AuthGuard for protecting routes
      },
      {
        path: 'admin/bankaccount',
        component: BankAccountComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'admin/validatecredit',
        component: DemandeCreditAdminComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'bank',
        loadChildren: () =>
          import('./pages/ui-components/ui-components.module').then(
            (m) => m.UicomponentsModule
          ),
        canActivate: [UserGuard],
      },
      {
        path: 'extra',
        loadChildren: () =>
          import('./pages/extra/extra.module').then((m) => m.ExtraModule),
        canActivate: [UserGuard],
      },
      
    ],
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () =>
          import('./pages/authentication/authentication.module').then(
            (m) => m.AuthenticationModule
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'authentication/login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
