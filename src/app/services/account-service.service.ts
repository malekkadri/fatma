import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BankAccount } from '../Models/BankAccount';

@Injectable({
  providedIn: 'root'
})
export class AccountServiceService {
  private baseUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  getAccounts(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/accounts`);
  }
  getUserAccounts(userId: number): Observable<BankAccount[]> {
    return this.http.get<BankAccount[]>(`${this.baseUrl}/user/${userId}/accounts`);
  }
  getCurrencies(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/currencies`);
  }
}