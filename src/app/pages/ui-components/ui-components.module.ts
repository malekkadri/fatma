import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

import { UiComponentsRoutes } from './ui-components.routing';

// ui components

import { MatNativeDateModule } from '@angular/material/core';
import { AccountOverviewComponent } from './compte/account-overview.component';
import { BankSearchComponent } from './bank-search-form/bank-search.component';
import { OperationMovementComponent } from './operation-movement/operation-movement.component';
import { VirementComponent } from './virement/virement.component';
import { VirementPlusieursComponent } from './virement-plusieurs/virement-plusieurs.component';
import { VirementPermanentComponent } from './virement-permanent/virement-permanent.component';
import { BourseComponent } from './bourse/bourse.component';
import { SimulateurCreditComponent } from './simulateur-credit/simulateur-credit.component';
import { DemandeCreditComponent } from './demande-credit/demande-credit.component';
import { UserFormModalComponent  } from './users/user-form-modal/user-form-modal.component';
import { UsersComponent } from './users/users.component';
import { BankAccountComponent } from './bank-account/bank-account.component';
import { DemandeCreditAdminComponent } from './demande-credit-admin/demande-credit-admin.component';
import { CreditDemandModalComponent } from './demande-credit/credit-demand-modal.component';
import { ChangeComponent } from './change/change.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(UiComponentsRoutes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TablerIconsModule.pick(TablerIcons),
    MatNativeDateModule,
  ],
  declarations: [
    VirementComponent,
    ChangeComponent,
    BourseComponent,
    UsersComponent,
    UserFormModalComponent,
    VirementPlusieursComponent,
    BankSearchComponent,
    OperationMovementComponent,
    AccountOverviewComponent,
    DemandeCreditComponent,
    CreditDemandModalComponent,
    SimulateurCreditComponent,
    VirementPermanentComponent,
    BankAccountComponent,
    DemandeCreditAdminComponent,

  ],
})
export class UicomponentsModule {}
