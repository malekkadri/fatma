import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BankAccount } from 'src/app/Models/BankAccount';
import { TransactionServiceService } from 'src/app/services/transaction-service.service';
import { AccountServiceService } from 'src/app/services/account-service.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-virement-plusieurs',
  templateUrl: './virement-plusieurs.component.html',
  styleUrls: ['./virement-plusieurs.component.css']
})
export class VirementPlusieursComponent implements OnInit {
  virementForm: FormGroup;
  currencies = ['TND', 'USD', 'EUR'];
  userId: number;
  accounts: BankAccount[] = [];
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
      sourceAccount: ['', Validators.required],
      currency: ['', Validators.required],
      targetAccounts: this.fb.array([this.createTargetAccount()]),
      paymentReason: ['', Validators.required],
      executionDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.userId = this.decodeJWT();
    this.fetchUserAccounts();
  }

  createTargetAccount(): FormGroup {
    return this.fb.group({
      targetAccount: ['', Validators.required],
      amount: ['', Validators.required]
    });
  }

  get targetAccounts(): FormArray {
    return this.virementForm.get('targetAccounts') as FormArray;
  }

  addTargetAccount(): void {
    this.targetAccounts.push(this.createTargetAccount());
  }

  removeTargetAccount(index: number): void {
    if (this.targetAccounts.length > 1) {
      this.targetAccounts.removeAt(index);
    } else {
      this.showSnackBar('At least one target account is required', 'error');
    }
  }

  onSubmit(): void {
    if (this.virementForm.valid) {
      const formData = this.virementForm.value;
      const transferData = {
        from_account: formData.sourceAccount,
        transfers: formData.targetAccounts.map((t: { targetAccount: string; amount: string }) => ({
          to_account: t.targetAccount,
          amount: parseFloat(t.amount)
        })),
        currency: formData.currency,
        paymentReason: formData.paymentReason,
        executionDate: formData.executionDate
      };

      this.transactionService.transferMultiple(transferData).subscribe({
        next: (response) => {
          this.showSnackBar('Transfer successful', 'success');
          this.virementForm.reset();
          this.addTargetAccount(); // Reset the target accounts to one after successful transfer
        },
        error: (error) => {
          this.showSnackBar('Transfer failed', 'error');
        }
      });
    } else {
      this.showSnackBar('Please fill out the form correctly', 'error');
    }
  }

  onReset(): void {
    this.virementForm.reset();
    this.targetAccounts.clear();
    this.addTargetAccount();
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
