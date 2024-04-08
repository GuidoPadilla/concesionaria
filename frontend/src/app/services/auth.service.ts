import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api';
  private loggedIn = new BehaviorSubject<boolean>(false);
  authChanged = this.loggedIn.asObservable();
  private userEmail: string | null = null;

  constructor(private http: HttpClient) { }

  signup(formData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signup`, formData).pipe(
      tap(() => {
        this.userEmail = formData.email;
        this.loggedIn.next(true);
      }),
      catchError((error) => {
        console.error('Signup error:', error);
        return throwError(error);
      })
    );
  }

  login(formData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, formData).pipe(
      tap(() => {
        this.userEmail = formData.email;
        this.loggedIn.next(true);
      }),
      catchError((error) => {
        console.log('Login error:', error);
        return throwError(error);
      })
    );
  }

  logout() {
    this.loggedIn.next(false);
    this.userEmail = null;
  }

  isLoggedIn(): boolean {
    return this.loggedIn.value;
  }

  getUserEmail(): string | null {
    return this.userEmail;
  }
}