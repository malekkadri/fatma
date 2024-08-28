// import { Component, OnInit } from '@angular/core';
// import {MatTableModule} from '@angular/material/table';

// interface AccountElement {
//   ncompte: string;
//   libelle: string;
//   dateSolde: string;
//   devise: string;
//   soldeActuel: string;
// }

// const ELEMENT_DATA: AccountElement[] = [
//   { ncompte: '000110123456', libelle: 'Compte DEMO 1', dateSolde: '15/08/2015', devise: 'TND', soldeActuel: '32 501,730' },
//   { ncompte: '081150543314', libelle: 'Compte DEMO 2', dateSolde: '15/08/2015', devise: 'TND', soldeActuel: '-32 124,250' }
// ];

// @Component({
//   selector: 'app-account-overview',
//   templateUrl: './account-overview.component.html',
// })
// export class AccountOverviewComponent {

//     displayedColumns: string[] = ['ncompte', 'libelle', 'dateSolde', 'devise', 'soldeActuel'];
//     dataSource = ELEMENT_DATA;
//   }

import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { jwtDecode } from 'jwt-decode';
import { BankAccount } from 'src/app/Models/BankAccount';
import { AccountServiceService } from 'src/app/services/account-service.service';

@Component({
  selector: 'app-account-overview',
  templateUrl: './account-overview.component.html',
})
export class AccountOverviewComponent implements OnInit {
  displayedColumns: string[] = ['account_number', 'account_label', 'balance_date', 'currency', 'current_balance'];
  dataSource: BankAccount[] = [];

  userId: number;

  constructor(private accountService: AccountServiceService) {
    this.userId = this.decodeJWT();
  }

  ngOnInit(): void {
    this.fetchUserAccounts();
    console.log(this.fetchUserAccounts());
    console.log(this.userId);
  }

  fetchUserAccounts() {
    if (this.userId) {
      this.accountService.getUserAccounts(this.userId).subscribe(accounts => {
        this.dataSource = accounts;
      });
    }
  }

  decodeJWT(): number {
    const token = localStorage.getItem('authToken'); // Adjust the token retrieval method as needed
    if (token) {
      const decoded: any = jwtDecode(token);
      console.log('Decoded JWT:', decoded);
      return decoded.user_id;
    }
    return 0;
  }
}
