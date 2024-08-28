import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditDemandRequest, CreditDemandResponse } from '../Models/CreditDemand';

@Injectable({
  providedIn: 'root'
})
export class CreditDemandService {
  private baseUrl = 'http://localhost:8000'; // Update with your backend URL

  constructor(private http: HttpClient) {}

  createCreditDemand(request: CreditDemandRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/create-credit-demand`, request);
  }

  getUserCreditDemands(userId: number): Observable<CreditDemandResponse[]> {
    return this.http.get<CreditDemandResponse[]>(`${this.baseUrl}/user/${userId}/credit-demands`);
  }


  getAllCreditDemands(): Observable<CreditDemandResponse[]> {
    return this.http.get<CreditDemandResponse[]>(`${this.baseUrl}/credit-demands`);
  }
  
  validateCreditDemand(id: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/validate-credit-demand/${id}`, {});
  }
  
}
