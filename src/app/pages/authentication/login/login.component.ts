import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class AppSideLoginComponent {
  username: string = '';
  password: string = '';
  twoFactorCode: string = '';
  twoFactorRequired: boolean = false;

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  login() {
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        if (response.message === '2FA code sent') {
          this.twoFactorRequired = true;
          this.showSnackBar('2FA code sent to your email.', 'info');
        } else {
          this.handleLoginSuccess(response);
        }
      },
      (error) => {
        this.showSnackBar('Login failed. Please check your credentials.', 'error');
        console.error('Login error:', error);
      }
    );
  }

  verify2FA() {
    this.authService.verify2FA(this.username, this.twoFactorCode).subscribe(
      (response) => {
        this.showSnackBar('2FA verification successful!', 'success');
        this.handleLoginSuccess(response);
      },
      (error) => {
        this.showSnackBar('2FA verification failed. Please try again.', 'error');
        console.error('2FA verification error:', error);
      }
    );
  }

  private handleLoginSuccess(response: any) {
    localStorage.setItem(this.authService.tokenKey, response.token);
    localStorage.setItem(this.authService.roleKey, response.role);
    localStorage.setItem('user_id', response.user_id.toString());
    this.router.navigate([response.role === 'admin' ? '/admin/dashboard' : '/bank/compte']);
  }

  private showSnackBar(message: string, type: 'success' | 'error' | 'info') {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: [`snackbar-${type}`],
    });
  }
}
