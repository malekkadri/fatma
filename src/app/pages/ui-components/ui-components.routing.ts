import { Routes } from '@angular/router';

// ui components
import { AccountOverviewComponent } from './compte/account-overview.component';
import { BankSearchComponent } from './bank-search-form/bank-search.component';
import { OperationMovementComponent } from './operation-movement/operation-movement.component';
import { VirementComponent } from './virement/virement.component';
import { VirementPlusieursComponent } from './virement-plusieurs/virement-plusieurs.component';
import { VirementPermanentComponent } from './virement-permanent/virement-permanent.component';
import { BourseComponent } from './bourse/bourse.component';
import { SimulateurCreditComponent } from './simulateur-credit/simulateur-credit.component';
import { DemandeCreditComponent } from './demande-credit/demande-credit.component';
import { UsersComponent } from './users/users.component';

// guards
import { AdminGuard } from '../../admin.guard';
import { UserGuard } from '../../user.guard';
import { DemandeCreditAdminComponent } from './demande-credit-admin/demande-credit-admin.component';
import { ChangeComponent } from './change/change.component';

export const UiComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'admin/users',
        component: UsersComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'change',
        component: ChangeComponent,
        canActivate: [UserGuard],
      },
      {
        path: 'bourse',
        component: BourseComponent,
        canActivate: [UserGuard],
      },
      {
        path: 'virement-permanent',
        component: VirementPermanentComponent,
        canActivate: [UserGuard],
      },
      {
        path: 'virement-plusieurs',
        component: VirementPlusieursComponent,
        canActivate: [UserGuard],
      },
      {
        path: 'virement',
        component: VirementComponent,
        canActivate: [UserGuard],
      },
      {
        path: 'operation',
        component: OperationMovementComponent,
        canActivate: [UserGuard],
      },
      {
        path: 'banksearch',
        component: BankSearchComponent,
        canActivate: [UserGuard],
      },
      {
        path: 'compte',
        component: AccountOverviewComponent,
        canActivate: [UserGuard],
      },
      {
        path: 'demande',
        component: DemandeCreditComponent,
        canActivate: [UserGuard],
      },
      {
        path: 'credit',
        component: SimulateurCreditComponent,
        canActivate: [UserGuard],
      },
      {
        path: 'validatecredit',
        component: DemandeCreditAdminComponent,
        canActivate: [AdminGuard],
      },
    ],
  },
];
