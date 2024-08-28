import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreditDemandService } from 'src/app/services/credit-demand.service';
import { CreditDemandRequest } from 'src/app/Models/CreditDemand';

@Component({
  selector: 'app-credit-demand-modal',
  templateUrl: './credit-demand-modal.component.html',
})
export class CreditDemandModalComponent {
  creditDemandForm: FormGroup;
  products = [
    'Credits directs aux particuliers et aux Professionnels',
    'Pret auto credit direct acquisition véhicule',
    'prêt perso credit direct depenses courantes',
    'prêt immo credit direct amenagement logement hypothecaire',
    'prêt perso credit direct amenagement',
    'prêt immo credit direct acquisition logement',
    'prêt immo credit direct construction',
    'pret immo credit direct achat terrain',
    'prêt perso credit direct amenagement hypothecaire'
  ];
  periodicities = ['Mensuelle', 'Trimestrielle', 'Semestrielle', 'Annuelle'];

  constructor(
    private fb: FormBuilder,
    private creditDemandService: CreditDemandService,
    public dialogRef: MatDialogRef<CreditDemandModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { accounts: any[], userId: number } // Inject data passed to the modal
  ) {
    this.creditDemandForm = this.fb.group({
      account: ['', Validators.required],
      product: ['', Validators.required],
      salary: ['', [Validators.required, Validators.min(1)]],
      retenue: ['', [Validators.required, Validators.min(1)]],
      duration: ['', [Validators.required, Validators.min(1)]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      periodicity: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.creditDemandForm.valid) {
      const formValue = this.creditDemandForm.value;
      const request: CreditDemandRequest = {
        user_id: this.data.userId,
        account_number: formValue.account,
        product: formValue.product,
        salary: formValue.salary,
        retenue: formValue.retenue,
        duration: formValue.duration,
        start_date: new Date(formValue.startDate),
        end_date: new Date(formValue.endDate),
        periodicity: formValue.periodicity
      };

      this.creditDemandService.createCreditDemand(request).subscribe(
        response => {
          this.dialogRef.close(true); // Close the modal and pass a success flag
        },
        error => {
          this.dialogRef.close(false); // Close the modal and pass a failure flag
        }
      );
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
