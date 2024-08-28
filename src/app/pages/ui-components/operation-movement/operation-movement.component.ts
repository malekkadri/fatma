import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-operation-movement',
  templateUrl: './operation-movement.component.html',
  styleUrls: ['./operation-movement.component.css']
})
export class OperationMovementComponent implements OnInit {
  operationForm: FormGroup;
  accounts = [
    '000110123456 TND COMPTE DEMO 1',
    '000220123456 TND COMPTE DEMO 2',
    '000330123456 TND COMPTE DEMO 3'
  ];
  displayOptions = [
    'Tableau',
    'Graphique'
  ];

  constructor(private fb: FormBuilder) {
    this.operationForm = this.fb.group({
      accountNumber: [''],
      displayOption: ['']
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.operationForm.value);
  }

  onReset() {
    this.operationForm.reset();
  }
}
