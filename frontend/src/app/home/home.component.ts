import { Component, OnInit } from '@angular/core';
import { CarService } from '../services/car.service';
import { Car } from '../models/car.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  cars: Car[] = [];

  constructor(private carService: CarService, private router: Router) { }

  ngOnInit(): void {
    this.carService.getCars().subscribe({
      next: (cars) => {
        this.cars = cars.map((car, index) => ({ ...car, id: index + 1 }));
      },
      error: (error) => {
        console.error('Error fetching cars:', error);
      }
    });
  }

  navigateToCarDetail(carId: number): void {
    this.router.navigate(['/car-detail', carId]);
  }
}
