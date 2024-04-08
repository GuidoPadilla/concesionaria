import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  formData = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) { }

  submitLoginForm() {
    this.authService.login(this.formData).pipe(
      tap(() => {
        console.log('Login successful');
        this.snackBar.open('Inicio de sesión exitosa', 'Close', { duration: 3000 });
        this.router.navigateByUrl('/');
      }),
      catchError((error) => {
        console.log('Error login in:', error);
        this.snackBar.open(error.error?.error || 'Algo salio mal', 'Close', { duration: 3000 });
        return [];
      })
    ).subscribe()
  }
}
