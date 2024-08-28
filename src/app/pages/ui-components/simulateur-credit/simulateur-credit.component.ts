import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreditSimulationRequest, CreditSimulationResponse } from 'src/app/Models/CreditSimulation';
import { AccountServiceService } from 'src/app/services/account-service.service';
import { CreditSimulatorService } from 'src/app/services/credit-simulator.service';
import { jwtDecode } from 'jwt-decode';
import { BankAccount } from 'src/app/Models/BankAccount';

@Component({
  selector: 'app-simulateur-credit',
  templateUrl: './simulateur-credit.component.html',
  styleUrls: ['./simulateur-credit.component.css']
})
export class SimulateurCreditComponent implements OnInit {
  creditForm: FormGroup;
  products = [
    'Crédits Directs aux Particuliers et aux Professionnels',
    'PRET AUTO - Crédit Direct Acquisition véhicule',
    'PRET PERSO - Crédit Direct Dépenses Courantes',
    'PRET IMMO - Crédit Direct Aménagement Logement Hypothécaire',
    'PRET PERSO - Crédit Direct Aménagement',
    'PRET IMMO - Crédit Direct Acquisition Logement',
    'PRET IMMO - Crédit Direct Construction',
    'PRET IMMO - Crédit Direct Achat Terrain',
    'PRET PERSO - Crédit Direct Aménagement Hypothécaire'
  ];
  periodicities = ['Mensuelle', 'Trimestrielle', 'Semestrielle', 'Annuelle'];
  defaultInterestRate = 12.97; // Default interest rate as a number
  simulationResult: CreditSimulationResponse | null = null;
  accounts: BankAccount[] = [];

  constructor(
    private fb: FormBuilder,
    private creditSimulatorService: CreditSimulatorService,
    private accountService: AccountServiceService,
    private snackBar: MatSnackBar // Inject MatSnackBar
  ) {
    this.creditForm = this.fb.group({
      account: ['', Validators.required],
      product: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]],
      periodicity: ['', Validators.required],
      duration: ['', [Validators.required, Validators.min(1)]],
      interestRate: [this.defaultInterestRate, Validators.required],
      firstDueDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchUserAccounts();
  }

  onSubmit() {
    const userId = this.decodeJWT();

    if (this.creditForm.valid) {
      const formValue = this.creditForm.value;
      const request: CreditSimulationRequest = {
        user_id: userId,
        account_number: formValue.account,
        product: formValue.product,
        amount: formValue.amount,
        periodicity: formValue.periodicity,
        duration: formValue.duration,
        interest_rate: formValue.interestRate,
        first_due_date: new Date(formValue.firstDueDate)
      };

      this.creditSimulatorService.simulateCredit(request).subscribe(
        (response: CreditSimulationResponse) => {
          this.simulationResult = response;
          this.showSnackBar('Simulation réussie', 'success');
          // Update interest rate in the form if the response includes it
          if (response.interest_rate !== undefined) {
            this.creditForm.patchValue({
              interestRate: response.interest_rate
            });
          }
        },
        (error) => {
          this.showSnackBar('Échec de la simulation', 'error');
        }
      );
    } else {
      this.showSnackBar('Veuillez remplir correctement le formulaire', 'error');
    }
  }

  onReset() {
    this.creditForm.reset({
      interestRate: this.defaultInterestRate
    });
    this.simulationResult = null;
  }

  fetchUserAccounts() {
    const userId = this.decodeJWT();
    if (userId) {
      this.accountService.getUserAccounts(userId).subscribe(
        accounts => {
          this.accounts = accounts;
        },
        error => {
          this.showSnackBar('Échec du chargement des comptes', 'error');
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
    this.snackBar.open(message, 'Fermer', {
      duration: 3000,
      panelClass: [type === 'success' ? 'snack-bar-success' : 'snack-bar-error'],
    });
  }
}
