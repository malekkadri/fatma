import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-bank-search',
  templateUrl: './bank-search.component.html',
  styleUrls: ['./bank-search.component.css']
})
export class BankSearchComponent implements OnInit {
  searchForm: FormGroup;
  accounts = [
    '000110123456 TND COMPTE DEMO 1',
    '000220123456 TND COMPTE DEMO 2',
    '000330123456 TND COMPTE DEMO 3'
  ];
  movements = [
    'Tous Les Mouvements',
    'Crédit',
    'Débit'
  ];

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      accountNumber: [''],
      movementType: [''],
      debitMin: [''],
      debitMax: [''],
      creditMin: [''],
      creditMax: [''],
      startDate: [''],
      endDate: ['']
    });
  }

  ngOnInit(): void {}

  onSearch() {
    console.log(this.searchForm.value);
  }

  onReset() {
    this.searchForm.reset();
  }
}
