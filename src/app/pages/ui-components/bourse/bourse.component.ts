import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-bourse',
  templateUrl: './bourse.component.html',
  styleUrls: ['./bourse.component.css']
})
export class BourseComponent implements OnInit {
  virementForm: FormGroup;
  stockData = [
    { nom: 'ADWYA', ouverture: 5.95, haut: 5.95, variation: '0.00%' },
    { nom: 'AETECH', ouverture: 0.21, haut: 0.21, variation: '0.00%' },
    { nom: 'AIR LIQUIDE TUNISIE', ouverture: 84.00, haut: 84.00, variation: '0.00%' },
    { nom: 'AMEN BANK', ouverture: 42.80, haut: 43.75, variation: '2.22%' },
    { nom: 'AMI', ouverture: 1.61, haut: 1.61, variation: '0.00%' },
    { nom: 'AMS', ouverture: 0.95, haut: 0.95, variation: '0.00%' },
    { nom: 'ARAB TUNISIAN BANK', ouverture: 3.11, haut: 3.12, variation: '-0.32%' },
    { nom: 'ARAB TUNISIAN LEASE', ouverture: 3.89, haut: 3.91, variation: '0.26%' },
    { nom: 'ARTES', ouverture: 6.27, haut: 6.30, variation: '-1.12%' },
    { nom: 'ASSAD', ouverture: 0.70, haut: 0.70, variation: '1.49%' },
    { nom: 'ASSURANCES MAGHREBIA', ouverture: 52.40, haut: 52.40, variation: '0.76%' },
    { nom: 'ASTREE', ouverture: 44.90, haut: 44.90, variation: '0.00%' },
    { nom: 'ATTIJARI LEASING', ouverture: 19.35, haut: 19.85, variation: '2.58%' },
    { nom: 'BANQUE ATTIJARI DE TUNIS', ouverture: 53.40, haut: 53.40, variation: '0.00%' },
    { nom: 'BANQUE DE TUNISIE', ouverture: 5.11, haut: 5.14, variation: '0.00%' },
    { nom: 'BANQUE NATIONALE AGRICOLE', ouverture: 8.15, haut: 8.17, variation: '0.25%' },
    { nom: 'BEST LEASE', ouverture: 2.24, haut: 2.30, variation: '2.68%' },
    { nom: 'BH ASSURANCE', ouverture: 47.25, haut: 47.25, variation: '0.00%' },
    { nom: 'BH BANK', ouverture: 13.70, haut: 13.72, variation: '0.15%' },
    { nom: 'BH LEASING', ouverture: 4.11, haut: 4.17, variation: '-0.48%' },
    { nom: 'BIAT', ouverture: 99.97, haut: 100.00, variation: '0.03%' },
    { nom: 'BTE (ADP)', ouverture: 4.89, haut: 4.89, variation: '0.00%' },
    { nom: 'CARTHAGE CEMENT', ouverture: 2.00, haut: 2.03, variation: '0.00%' },
    { nom: 'CELLCOM', ouverture: 1.85, haut: 1.85, variation: '0.00%' },
    { nom: 'CEREALIS', ouverture: 13.30, haut: 13.30, variation: '0.00%' },
    { nom: 'CIL', ouverture: 21.50, haut: 22.37, variation: '4.05%' },
    { nom: 'CIMENTS DE BIZERTE', ouverture: 0.54, haut: 0.54, variation: '-20.90%' },
    { nom: 'CITY CARS', ouverture: 12.60, haut: 12.60, variation: '-0.79%' },
    { nom: 'DELICE HOLDING', ouverture: 14.10, haut: 14.10, variation: '0.00%' },
    { nom: 'ELBENE', ouverture: 2.28, haut: 2.28, variation: '10.14%' },
    { nom: 'ELECTROSTAR', ouverture: 0.31, haut: 0.31, variation: '-3.23%' },
    { nom: 'ENNAKL AUTOMOBILES', ouverture: 10.70, haut: 10.70, variation: '0.00%' },
    { nom: 'ESSOUKNA', ouverture: 1.68, haut: 1.75, variation: '4.17%' },
    { nom: 'EURO-CYCLES', ouverture: 12.69, haut: 12.75, variation: '0.47%' },
    { nom: 'GIF FILTER', ouverture: 0.41, haut: 0.42, variation: '2.44%' },
    { nom: 'HANNIBAL LEASE', ouverture: 7.48, haut: 7.48, variation: '0.00%' },
    { nom: 'HEXABYTE', ouverture: 7.55, haut: 7.55, variation: '0.00%' },
    { nom: 'ICF', ouverture: 70.89, haut: 75.14, variation: '5.80%' },
    { nom: 'LAND\'OR', ouverture: 9.28, haut: 9.28, variation: '0.00%' },
    { nom: 'MAGASIN GENERAL', ouverture: 7.49, haut: 7.49, variation: '0.00%' },
    { nom: 'MAGHREBIA VIE', ouverture: 6.00, haut: 6.00, variation: '-0.17%' },
    { nom: 'MEUBLES INTERIEURS', ouverture: 6.20, haut: 6.20, variation: '-0.32%' },
    { nom: 'MIP', ouverture: 0.00, haut: 0.00, variation: '0.00%' },
    { nom: 'MONOPRIX', ouverture: 3.98, haut: 3.98, variation: '0.00%' },
    { nom: 'MPBS', ouverture: 8.00, haut: 8.08, variation: '1.00%' },
    { nom: 'NEW BODY LINE', ouverture: 4.95, haut: 4.95, variation: '-0.20%' },
    { nom: 'OFFICE PLAST', ouverture: 1.04, haut: 1.07, variation: '-0.93%' },
    { nom: 'ONE TECH', ouverture: 9.10, haut: 9.10, variation: '0.00%' },
    { nom: 'PLACEMENTS DE TUNISIE - SICAF', ouverture: 48.50, haut: 48.51, variation: '0.02%' },
    { nom: 'POULINA GROUP HOLDING', ouverture: 8.90, haut: 8.90, variation: '-1.12%' },
    { nom: 'SAH', ouverture: 9.37, haut: 9.46, variation: '0.85%' },
    { nom: 'SANIMED', ouverture: 1.17, haut: 1.17, variation: '0.00%' },
    { nom: 'SERVICOM', ouverture: 0.21, haut: 0.22, variation: '4.76%' },
    { nom: 'SFBT', ouverture: 12.15, haut: 12.30, variation: '0.99%' },
    { nom: 'SIAME', ouverture: 3.54, haut: 3.55, variation: '0.00%' },
    { nom: 'SIMPAR', ouverture: 34.40, haut: 34.40, variation: '0.00%' },
    { nom: 'SIPHAT', ouverture: 5.67, haut: 5.89, variation: '3.88%' },
    { nom: 'SITS', ouverture: 1.81, haut: 1.81, variation: '-8.47%' },
    { nom: 'SMART TUNISIE', ouverture: 15.97, haut: 15.97, variation: '-1.69%' },
    { nom: 'SOCIETE CHIMIQUE ALKIMIA', ouverture: 17.00, haut: 17.76, variation: '4.47%' },
    { nom: 'SOMOCER', ouverture: 0.47, haut: 0.47, variation: '0.00%' },
    { nom: 'SOPAT', ouverture: 2.05, haut: 2.05, variation: '0.00%' },
    { nom: 'SOTEMAIL', ouverture: 1.12, haut: 1.12, variation: '-15.15'},
    { nom: 'STAR', ouverture: 3.17, haut: 3.17, variation: '0.00%' },
    { nom: 'STB BANK', ouverture: 6.50, haut: 6.50, variation: '0.00%' },
    { nom: 'STEQ', ouverture: 3.82, haut: 3.82, variation: '0.00%' },
    { nom: 'STIP', ouverture: 3.90, haut: 3.90, variation: '-2.01%' },
    { nom: 'SYPHAX AIRLINES', ouverture: 0.73, haut: 0.73, variation: '0.00%' },
    { nom: 'TAWASOL', ouverture: 5.30, haut: 5.36, variation: '-0.57%' },
    { nom: 'TELNET HOLDING', ouverture: 5.52, haut: 5.52, variation: '-1.27%' },
    { nom: 'TPR', ouverture: 9744.15, haut: 9784.22, variation: '0.26%' },
    { nom: 'TUNINDEX', ouverture: 9.47, haut: 9.47, variation: '-0.74%' },
    { nom: 'TUNINVEST - SICAR', ouverture: 6.60, haut: 6.66, variation: '0.45%' },
    { nom: 'TUNIS RE', ouverture: 0.37, haut: 0.38, variation: '2.70%' },
    { nom: 'TUNISAIR', ouverture: 0.37, haut: 0.38, variation: '2.70%' },
    { nom: 'TUNISIAN BOND INDEX', ouverture: 202.15, haut: 202.15, variation: '0.01%' },
    { nom: 'TUNISIE LEASING & FACTORING', ouverture: 15.00, haut: 15.00, variation: '0.00%' },
    { nom: 'TUNISIE VALEURS', ouverture: 17.48, haut: 17.48, variation: '0.00%' },
    { nom: 'UADH', ouverture: 0.52, haut: 0.53, variation: '1.92%' },
    { nom: 'UBCI', ouverture: 21.60, haut: 21.60, variation: '0.00%' },
    { nom: 'UIB', ouverture: 23.52, haut: 23.53, variation: '0.04%' },
    { nom: 'UNIMED', ouverture: 7.01, haut: 7.03, variation: '0.29%' },
    { nom: 'WIFAK INT BANK', ouverture: 8.90, haut: 8.90, variation: '-0.11%' }
  ];

  accounts = [
    '000110123456 TND COMPTE DEMO 1',
    '000220123456 TND COMPTE DEMO 2',
    '000330123456 TND COMPTE DEMO 3'
  ];

  currencies = ['TND', 'USD', 'EUR'];

  targetAccounts = [
    '000110123456 TND COMPTE DEMO 1',
    '000220123456 TND COMPTE DEMO 2',
    '000330123456 TND COMPTE DEMO 3'
  ];

  constructor(private fb: FormBuilder) {
    this.virementForm = this.fb.group({
      sourceAccount: [''],
      currency: [''],
      targetAccount: [''],
      amount: [''],
      paymentReason: [''],
      executionDate: ['']
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.virementForm.value);
  }

  onReset() {
    this.virementForm.reset();
  }
}
