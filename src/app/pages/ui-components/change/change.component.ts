import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-change',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.css']
})
export class ChangeComponent implements OnInit {
  virementForm: FormGroup;

  // Populate stockData array with the relevant data
  stockData = [
    { designation: 'SICAV L\'ÉPARGNANT', gestionnaire: 'STB MANAGER', valeurLiquidative: '101,947' },
    { designation: 'POSTE OBLIGATAIRE SICAV TANIT', gestionnaire: 'SIFIB-BH', valeurLiquidative: '103,168' },
    { designation: 'SICAV BH OBLIGATAIRE', gestionnaire: 'SIFIB-BH', valeurLiquidative: '102,132' },
    { designation: 'UNIVERS OBLIGATIONS SICAV', gestionnaire: 'SCIF', valeurLiquidative: '104,102' },
    { designation: 'SICAV RENDEMENT', gestionnaire: 'SBT', valeurLiquidative: '102,049' },
    { designation: 'MAXULA PLACEMENT SICAV', gestionnaire: 'MAXULA Bourse', valeurLiquidative: '102,826' },
    { designation: 'FIDELITY OBLIGATIONS SICAV', gestionnaire: 'MAC SA', valeurLiquidative: '105,004' },
    { designation: 'INTERNATIONALE OBLIGATAIRE SICAV', gestionnaire: 'UIB FINANCE', valeurLiquidative: '106,070' },
    { designation: 'FINA O SICAV', gestionnaire: 'FINACORP', valeurLiquidative: '103,618' },
    { designation: 'CAP OBLIG SICAV', gestionnaire: 'COFIB CAPITAL FINANCE', valeurLiquidative: '103,578' },
    { designation: 'GENERALE OBLIG SICAV', gestionnaire: 'CGI', valeurLiquidative: '101,602' },
    { designation: 'MILLENIUM OBLIGATAIRE SICAV', gestionnaire: 'CGF', valeurLiquidative: '104,526' },
    { designation: 'SICAV PATRIMOINE OBLIGATAIRE', gestionnaire: 'BIAT Asset Management', valeurLiquidative: '102,623' },
    { designation: 'SICAV TRESOR', gestionnaire: 'BIAT Asset Management', valeurLiquidative: '102,426' },
    { designation: 'PLACEMENT OBLIGATAIRE SICAV', gestionnaire: 'BNA Capitaux', valeurLiquidative: '103,640' },
    { designation: 'SICAV AXIS TRÉSORERIE', gestionnaire: 'AXIS Gestion', valeurLiquidative: '106,272' },
    { designation: 'TUNISO-EMIRATIE SICAV', gestionnaire: 'AUTO GREE', valeurLiquidative: '103,200' },
    { designation: 'ATTIJARI OBLIGATAIRE SICAV', gestionnaire: 'ATTIJARI Gestion', valeurLiquidative: '102,108' },
    { designation: 'AMEN TRESOR SICAV', gestionnaire: 'Amen Invest', valeurLiquidative: '105,392' },
    { designation: 'AMEN PREMIÈRE SICAV', gestionnaire: 'Amen Invest', valeurLiquidative: '103,372' },
    { designation: 'SANADETT SICAV', gestionnaire: 'AFC', valeurLiquidative: '107,820' },
    { designation: 'FCP MAGHREBIA PRUDENCE', gestionnaire: 'UFI', valeurLiquidative: '1,385' },
    { designation: 'FCP SALAMETT CAP', gestionnaire: 'FCP', valeurLiquidative: '13,439' },
    { designation: 'TUNISIE SICAV', gestionnaire: 'Tunisie Valeurs', valeurLiquidative: '100,700' },
    { designation: 'TUNISIE-SICAV', gestionnaire: 'Tsie.valeurs', valeurLiquidative: '115,307' },
    { designation: 'SICAV-RENDEMENT', gestionnaire: 'SBT', valeurLiquidative: '102,449' },
    { designation: 'FCP MAGHREBIA SELECT ACTIONS', gestionnaire: 'UFI', valeurLiquidative: '1,070' },
    { designation: 'FCP MAGHREBIA MODERE', gestionnaire: 'UFI', valeurLiquidative: '1,985' },
    { designation: 'FCP MAGHREBIA DYNAMIQUE', gestionnaire: 'UFI', valeurLiquidative: '2,276' },
    { designation: 'FCP VALEURS QUIETUDE 2018', gestionnaire: 'Tunisie Valeurs', valeurLiquidative: '5,005,656' },
    { designation: 'FCP VALEURS QUIETUDE 2017', gestionnaire: 'Tunisie Valeurs', valeurLiquidative: '5,129,901' },
    { designation: 'AIRLINES FCP VALEURS CEA', gestionnaire: 'Tunisie Valeurs', valeurLiquidative: '15,833' },
    { designation: 'FCP CEA MAXULA', gestionnaire: 'MAXULA Bourse', valeurLiquidative: '122,606' },
    { designation: 'FCP FINA 60', gestionnaire: 'FINACORP', valeurLiquidative: '1,212,232' },
    { designation: 'FCP SECURITE', gestionnaire: 'BNA Capitaux', valeurLiquidative: '128,624' },
    { designation: 'FCP OPTIMA', gestionnaire: 'BNA Capitaux', valeurLiquidative: '102,075' },
    { designation: 'FCP AMEN PERFORMANCE', gestionnaire: 'Amen Invest', valeurLiquidative: '106,195' },
    { designation: 'FCP AXIS CAPITAL PRUDENT', gestionnaire: 'AXIS Gestion', valeurLiquidative: '2,303,327' },
    { designation: 'FCP CAPITALISATION ET GARANTIE', gestionnaire: 'ALLIANCE ASSET MANAGEMENT', valeurLiquidative: '1,418,358' },
    { designation: 'FCP VALEURS MIXTES', gestionnaire: 'Tunisie Valeurs', valeurLiquidative: '103,443' },
    { designation: 'FCP VALEURS AL KAOUTHER', gestionnaire: 'Tunisie Valeurs', valeurLiquidative: '91,155' },
    { designation: 'FCP KOUNOUZ', gestionnaire: 'TSI', valeurLiquidative: '132,077' },
    { designation: 'FCP INDICE MAXULA', gestionnaire: 'MAXULA Bourse', valeurLiquidative: '92,528' },
    { designation: 'FCP MAXULA STABILITY', gestionnaire: 'MAXULA Bourse', valeurLiquidative: '110,960' },
    { designation: 'FCP MAXULA CROISSANCE PRUDENCE', gestionnaire: 'MAXULA Bourse', valeurLiquidative: '118,676' },
    { designation: 'FCP MAXULA CROISSANCE EQUILIBREE', gestionnaire: 'MAXULA Bourse', valeurLiquidative: '122,724' },
    { designation: 'FCP MAXULA CROISSANCE DYNAMIQUE', gestionnaire: 'MAXULA Bourse', valeurLiquidative: '110,914' },
    { designation: 'FCP AXIS PLACEMENT EQUILIBRE', gestionnaire: 'AXIS Gestion', valeurLiquidative: '568,052' },
    { designation: 'FCP AXIS ACTIONS DYNAMIQUE', gestionnaire: 'AXIS Gestion', valeurLiquidative: '159,089' },
    { designation: 'SICAV-PLUS', gestionnaire: 'Tsie. valeurs', valeurLiquidative: '50,664' }
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
