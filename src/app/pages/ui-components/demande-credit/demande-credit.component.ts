import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreditDemandResponse } from 'src/app/Models/CreditDemand';
import { CreditDemandService } from 'src/app/services/credit-demand.service';
import { AccountServiceService } from 'src/app/services/account-service.service';
import { CreditDemandModalComponent } from './credit-demand-modal.component'; // Import the modal component
import { BankAccount } from 'src/app/Models/BankAccount';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-demande-credit',
  templateUrl: './demande-credit.component.html',
  styleUrls: ['./demande-credit.component.css']
})
export class DemandeCreditComponent implements OnInit {
  creditDemands: CreditDemandResponse[] = [];
  accounts: BankAccount[] = [];
  userId: number;

  constructor(
    private creditDemandService: CreditDemandService,
    private accountService: AccountServiceService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog // Inject MatDialog
  ) {}

  ngOnInit(): void {
    this.userId = this.decodeJWT();
    this.fetchUserAccounts();
    this.fetchUserCreditDemands();
  }

  openCreditDemandModal(): void {
    const dialogRef = this.dialog.open(CreditDemandModalComponent, {
      width: '500px',
      data: { accounts: this.accounts, userId: this.userId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showSnackBar('Demande de crédit créée avec succès', 'success');
        this.fetchUserCreditDemands(); // Refresh the list of credit demands
      }
    });
  }

  fetchUserAccounts() {
    if (this.userId) {
      this.accountService.getUserAccounts(this.userId).subscribe(
        accounts => {
          this.accounts = accounts;
        },
        error => {
          this.showSnackBar('Échec du chargement des comptes', 'error');
        }
      );
    }
  }

  fetchUserCreditDemands() {
    if (this.userId) {
      this.creditDemandService.getUserCreditDemands(this.userId).subscribe(
        demands => {
          this.creditDemands = demands;
        },
        error => {
          this.showSnackBar('Échec du chargement des demandes de crédit', 'error');
        }
      );
    }
  }

  decodeJWT(): number {
    const token = localStorage.getItem('authToken'); // Adjust the token retrieval method as needed
    if (token) {
      const decoded: any = jwtDecode(token);
      return decoded.user_id;
    }
    return 0;
  }

  showSnackBar(message: string, type: 'success' | 'error') {
    this.snackBar.open(message, 'Fermer', {
      duration: 3000,
      panelClass: [type === 'success' ? 'snack-bar-success' : 'snack-bar-error'],
    });
  }
}
