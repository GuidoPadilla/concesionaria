import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  signUp(data: any) {
    return this.http.post(`${this.apiUrl}/signup`, data);
  }

  quoteCar(data: any) {
    return this.http.post(`${this.apiUrl}/quote`, data);
  }

  hookCar(data: any) {
    return this.http.post(`${this.apiUrl}/hook`, data);
  }
}