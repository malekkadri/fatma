// import { Injectable } from '@angular/core';
// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { Router } from '@angular/router';
// import { catchError } from 'rxjs/operators';
// import { throwError, Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   public tokenKey = 'authToken';
//   public roleKey = 'userRole';
//   private apiUrl = 'http://localhost:8000'; // Adjust as necessary

//   constructor(private http: HttpClient, public router: Router) {}

//   login(username: string, password: string): Observable<{ message: string, role: string }> {
//     return this.http.post<{ message: string, role: string }>(`${this.apiUrl}/login`, { username, password })
//       .pipe(
//         catchError(this.handleError)
//       );
//   }

//   verify2FA(username: string, code: string): Observable<{ token: string, role: string }> {
//     return this.http.post<{ token: string, role: string }>(`${this.apiUrl}/verify-2fa`, { username, code })
//       .pipe(
//         catchError(this.handleError)
//       );
//   }

//   logout() {
//     localStorage.removeItem(this.tokenKey);
//     localStorage.removeItem(this.roleKey);
//     this.router.navigate(['/authentication/login']);
//   }

//   isLoggedIn(): boolean {
//     return !!localStorage.getItem(this.tokenKey);
//   }

//   getRole(): string | null {
//     return localStorage.getItem(this.roleKey);
//   }

//   private handleError(error: HttpErrorResponse) {
//     let errorMessage = 'An unknown error occurred!';
//     if (error.error instanceof ErrorEvent) {
//       // Client-side or network error
//       errorMessage = `Error: ${error.error.message}`;
//     } else {
//       // Backend error
//       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
//     }
//     window.alert(errorMessage);
//     return throwError(errorMessage);
//   }
// }


import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public tokenKey = 'authToken';
  public roleKey = 'userRole';
  private apiUrl = 'http://localhost:8000'; // Adjust as necessary

  constructor(private http: HttpClient, public router: Router) {}

  login(username: string, password: string): Observable<{ message: string, role: string }> {
    return this.http.post<{ message: string, role: string }>(`${this.apiUrl}/login`, { username, password })
      .pipe(
        catchError(this.handleError)
      );
  }

  verify2FA(username: string, code: string): Observable<{ token: string, role: string, user_id: number }> {
    return this.http.post<{ token: string, role: string, user_id: number }>(`${this.apiUrl}/verify-2fa`, { username, code })
      .pipe(
        catchError(this.handleError)
      );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.roleKey);
    localStorage.removeItem('user_id');
    this.router.navigate(['/authentication/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getRole(): string | null {
    return localStorage.getItem(this.roleKey);
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Backend error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
