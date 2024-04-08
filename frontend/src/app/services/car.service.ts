import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Car } from '../models/car.model';
import { catchError, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CarService {

  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  quoteCar(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/quote`, data);
  }

  hookCar(email: string | null, carId: number): Observable<any> {
    console.log("CLIENTE ID", email)
    return this.http.post<any>(`${this.apiUrl}/hook`, { email, carId }).pipe(
      tap(),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  getCars(): Observable<Car[]> {
    const url = `${this.apiUrl}/cars`;
    return this.http.get<Car[]>(url);
  }

  getCarById(carId: number): Observable<Car> {
    const url = `${this.apiUrl}/cars/${carId}`;
    return this.http.get<Car>(url);
  }
}