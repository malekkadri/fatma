import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BankAccount } from 'src/app/Models/BankAccount';
import { AccountServiceService } from 'src/app/services/account-service.service';
import { TransactionServiceService } from 'src/app/services/transaction-service.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-virement-permanent',
  templateUrl: './virement-permanent.component.html',
  styleUrls: ['./virement-permanent.component.css']
})
export class VirementPermanentComponent implements OnInit {
  virementForm: FormGroup;
  accounts: BankAccount[] = [];
  currencies = ['TND', 'USD', 'EUR'];
  periodicities = ['Mensuel', 'Trimestriel', 'Semestriel', 'Annuel'];
  userId: number;
  virementLinks = [
    { text: 'Virement de compte à compte', link: 'http://localhost:4200/bank/virement' },
    { text: 'Virement compte à plusieurs comptes', link: 'http://localhost:4200/bank/virement-plusieurs' },
    { text: 'Virement permanent de compte à compte', link: 'http://localhost:4200/bank/virement-permanent' }
  ];
  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionServiceService,
    private accountService: AccountServiceService,
    private snackBar: MatSnackBar // Inject MatSnackBar
  ) {
    this.virementForm = this.fb.group({
      executionDay: ['', Validators.required],
      periodicity: ['', Validators.required],
      firstTransferDate: ['', Validators.required],
      lastTransferDate: ['', Validators.required],
      sourceAccount: ['', Validators.required],
      currency: ['', Validators.required],
      targetAccount: ['', Validators.required],
      amount: ['', Validators.required],
      paymentReason: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.userId = this.decodeJWT();
    this.fetchUserAccounts();
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

  onSubmit() {
    if (this.virementForm.valid) {
      const transferData = this.virementForm.value;
      transferData.executionDay = parseInt(transferData.executionDay);
      transferData.firstTransferDate = new Date(transferData.firstTransferDate);
      transferData.lastTransferDate = new Date(transferData.lastTransferDate);
      transferData.amount = parseFloat(transferData.amount);

      this.transactionService.setupPeriodicTransfer(transferData).subscribe({
        next: (response) => {
          this.showSnackBar('Setup successful', 'success');
          this.virementForm.reset();
        },
        error: (error) => {
          this.showSnackBar('Setup failed', 'error');
        }
      });
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
