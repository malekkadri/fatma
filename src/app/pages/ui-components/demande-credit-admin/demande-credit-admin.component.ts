import { Component, OnInit } from '@angular/core';
import { CreditDemandResponse } from 'src/app/Models/CreditDemand';
import { CreditDemandService } from 'src/app/services/credit-demand.service';

@Component({
  selector: 'app-demande-credit-admin',
  templateUrl: './demande-credit-admin.component.html',
  styleUrls: ['./demande-credit-admin.component.scss']
})
export class DemandeCreditAdminComponent implements OnInit {
  creditDemands: CreditDemandResponse[] = [];

  constructor(private creditDemandService: CreditDemandService) {}

  ngOnInit(): void {
    this.fetchAllCreditDemands();
  }

  fetchAllCreditDemands() {
    this.creditDemandService.getAllCreditDemands().subscribe(demands => {
      this.creditDemands = demands;
    });
  }

  validateCreditDemand(id: number) {
    this.creditDemandService.validateCreditDemand(id).subscribe(
      () => {
        console.log('Credit demand validated successfully');
        this.fetchAllCreditDemands(); // Refresh the list of credit demands
      },
      error => {
        console.error('Credit demand validation failed', error);
      }
    );
  }
}
