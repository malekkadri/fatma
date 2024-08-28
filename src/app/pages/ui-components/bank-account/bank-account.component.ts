import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BankAccount } from 'src/app/Models/BankAccount';
import { BankAccountServiceService } from 'src/app/services/bank-account-service.service';
import { User, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-bank-account',
  templateUrl: './bank-account.component.html',
  styleUrls: ['./bank-account.component.scss']
})
export class BankAccountComponent implements OnInit {
  bankAccountForm: FormGroup;
  users: User[] = [];

  constructor(
    private fb: FormBuilder,
    private bankAccountService: BankAccountServiceService,
    private userService: UserService,
    private snackBar: MatSnackBar // Inject MatSnackBar
  ) {
    this.bankAccountForm = this.fb.group({
      account_number: ['', Validators.required],
      account_label: ['', Validators.required],
      balance_date: ['', Validators.required],
      currency: ['', Validators.required],
      current_balance: ['', Validators.required],
      user_id: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.userService.getUsers().subscribe(
      users => {
        this.users = users;
      },
      error => {
        this.showSnackBar('Failed to load users', 'error');
      }
    );
  }

  onSubmit() {
    if (this.bankAccountForm.valid) {
      const newAccount: BankAccount = this.bankAccountForm.value;
      this.bankAccountService.addBankAccount(newAccount).subscribe(
        account => {
          this.showSnackBar('Bank account created successfully', 'success');
          this.bankAccountForm.reset();
        },
        error => {
          this.showSnackBar('Failed to create bank account', 'error');
        }
      );
    } else {
      this.showSnackBar('Please fill out the form correctly', 'error');
    }
  }

  showSnackBar(message: string, type: 'success' | 'error') {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: [type === 'success' ? 'snack-bar-success' : 'snack-bar-error'],
    });
  }
}
