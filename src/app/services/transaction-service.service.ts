import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transaction } from '../Models/Transaction';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionServiceService {
  
  private baseUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}
  transferMoney(transactionData: any): Observable<any> {
    const authToken = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    });

    return this.http.post(`${this.baseUrl}/transactions/transfer`, transactionData, { headers });
  }

  transferMultiple(transferData: any): Observable<any> {
    const authToken = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    });

    return this.http.post(`${this.baseUrl}/transactions/transfer-multiple`, transferData, { headers });
  }

  getUserTransactions(userId: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.baseUrl}/user/${userId}/transactions`);
  }


  setupPeriodicTransfer(transferData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`
    });
    return this.http.post(`${this.baseUrl}/transactions/periodic-transfer`, transferData, { headers });
  }
}
