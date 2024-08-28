import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreditSimulationRequest, CreditSimulationResponse } from '../Models/CreditSimulation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreditSimulatorService {
  private baseUrl = 'http://localhost:8000'; // Update with your backend URL

  constructor(private http: HttpClient) {}

  simulateCredit(request: CreditSimulationRequest): Observable<CreditSimulationResponse> {
    return this.http.post<CreditSimulationResponse>(`${this.baseUrl}/simulate-credit`, request);
  }
}
