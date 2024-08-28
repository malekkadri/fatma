import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BankAccount } from '../Models/BankAccount';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BankAccountServiceService {
  private baseUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  addBankAccount(account: BankAccount): Observable<BankAccount> {
    return this.http.post<BankAccount>(`${this.baseUrl}/accounts`, account);
  }
}
