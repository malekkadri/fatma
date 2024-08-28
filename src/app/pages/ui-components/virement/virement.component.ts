import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountServiceService } from 'src/app/services/account-service.service';
import { TransactionServiceService } from 'src/app/services/transaction-service.service';
import { jwtDecode } from 'jwt-decode';
import { BankAccount } from 'src/app/Models/BankAccount';
import { Transaction } from 'src/app/Models/Transaction';

@Component({
  selector: 'app-virement',
  templateUrl: './virement.component.html',
  styleUrls: ['./virement.component.css']
})
export class VirementComponent implements OnInit {
  virementForm: FormGroup;
  accounts: BankAccount[] = [];
  userId: number;
  transactionDataSource: Transaction[] = [];
  transactionDisplayedColumns: string[] = ['id', 'from_account', 'to_account', 'amount', 'transaction_date'];

  virementLinks = [
    { text: 'Virement de compte à compte', link: 'http://localhost:4200/bank/virement' },
    { text: 'Virement compte à plusieurs comptes', link: 'http://localhost:4200/bank/virement-plusieurs' },
    { text: 'Virement permanent de compte à compte', link: 'http://localhost:4200/bank/virement-permanent' }
  ];

  constructor(
    private fb: FormBuilder,
    private accountService: AccountServiceService,
    private transactionService: TransactionServiceService,
    private snackBar: MatSnackBar // Inject MatSnackBar
  ) {
    this.virementForm = this.fb.group({
      sourceAccount: ['', Validators.required],
      currency: ['TND', Validators.required],
      targetAccount: ['', Validators.required],
      amount: ['', Validators.required],
      paymentReason: [''],
      executionDate: ['', Validators.required]
    });

    this.userId = this.decodeJWT();
  }

  ngOnInit(): void {
    this.fetchUserAccounts();
    this.fetchUserTransactions();
  }

  fetchUserAccounts() {
    if (this.userId) {
      this.accountService.getUserAccounts(this.userId).subscribe(
        accounts => {
          this.accounts = accounts;
        },
        error => {
          this.showSnackBar('Failed to load user accounts', 'error');
        }
      );
    }
  }

  fetchUserTransactions() {
    if (this.userId) {
      this.transactionService.getUserTransactions(this.userId).subscribe(
        transactions => {
          this.transactionDataSource = transactions;
        },
        error => {
          this.showSnackBar('Failed to load transactions', 'error');
        }
      );
    }
  }

  onSubmit() {
    if (this.virementForm.valid) {
      const formData = {
        from_account: this.virementForm.value.sourceAccount,
        to_account: this.virementForm.value.targetAccount,
        amount: parseFloat(this.virementForm.value.amount),
        currency: this.virementForm.value.currency,
        paymentReason: this.virementForm.value.paymentReason,
        executionDate: this.virementForm.value.executionDate
      };

      this.transactionService.transferMoney(formData).subscribe(
        response => {
          this.showSnackBar('Transfer successful', 'success');
          this.virementForm.reset();
          this.fetchUserTransactions(); // Refresh transactions after transfer
        },
        error => {
          this.showSnackBar('Transfer failed', 'error');
        }
      );
    } else {
      this.showSnackBar('Please fill out the form correctly', 'error');
    }
  }

  onReset() {
    this.virementForm.reset();
  }

  decodeJWT(): number {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decoded: any = jwtDecode(token);
      return decoded.user_id;
    }
    return 0;
  }

  showSnackBar(message: string, type: 'success' | 'error') {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: [type === 'success' ? 'snack-bar-success' : 'snack-bar-error'],
    });
  }
}
