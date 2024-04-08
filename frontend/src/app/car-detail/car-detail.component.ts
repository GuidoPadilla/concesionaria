import { Component, Input } from '@angular/core';
import { Car } from '../models/car.model';
import { AuthService } from '../services/auth.service';
import { CarService } from '../services/car.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { QuoteFormComponent } from '../quote-form/quote-form.component';
import { of } from 'rxjs';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.scss']
})
export class CarDetailComponent {
  car: Car | undefined;

  constructor(private authService: AuthService, private route: ActivatedRoute, private carService: CarService, private snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const carId = Number(params['id']);
      this.carService.getCarById(carId).pipe(
        tap((car: Car) => {
          this.car = car;
        }),
        catchError(() => {
          this.car = undefined;
          return of(null);
        })
      ).subscribe();
    });
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  requestQuote() {
    const dialogRef = this.dialog.open(QuoteFormComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result.carId = this.car?.id;
        this.carService.quoteCar(result).pipe(
          tap((response) => {
            console.log('Quote sent successfully:', response);
            this.snackBar.open('Cotización exitosa pronto se contactaran con usted', 'Close', { duration: 3000 });
          }),
          catchError((error) => {
            this.snackBar.open(error.error?.error || 'La cotización fallo por alguna razón', 'Close', { duration: 3000 });
            throw error;
          })
        ).subscribe();
      }
    });
  }

  hookCar() {
    if (this.authService.isLoggedIn() && this.car?.id) {
      const userEmail: string | null = this.authService.getUserEmail();

      this.carService.hookCar(userEmail, this.car.id).pipe(
        tap((response) => {
          this.car!.availableQuantity--;
          this.snackBar.open('Enganche exitoso', 'Close', { duration: 3000 });
        }),
        catchError((error) => {
          this.snackBar.open(error.error?.error || 'Error enganchando carro', 'Close', { duration: 3000 });
          throw error;
        })
      ).subscribe();
    } else {
      this.snackBar.open('Inicie sesión para enganchar este carro.', 'Close', { duration: 3000 });
    }
  }
}
