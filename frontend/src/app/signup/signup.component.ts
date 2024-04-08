import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  formData = {
    name: '',
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private snackBar: MatSnackBar, private router: Router) { }

  submitForm() {
    this.authService.signup(this.formData)
      .pipe(
        tap(() => {
          console.log('Signup successful');
          this.snackBar.open('Registro exitoso', 'Close', { duration: 3000 });
          this.router.navigateByUrl('/');
        }),
        catchError((error) => {
          console.log('Error signing up:', error);
          this.snackBar.open(error.error?.error || 'Algo salio mal', 'Close', { duration: 3000 });
          return [];
        })
      )
      .subscribe()
  }
}
