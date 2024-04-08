import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-quote-form',
  templateUrl: './quote-form.component.html',
  styleUrls: ['./quote-form.component.scss']
})
export class QuoteFormComponent {
  paymentMethod: string = '';
  numberOfPayments: number = 1;
  phoneNumber: string = '';

  constructor(private dialogRef: MatDialogRef<QuoteFormComponent>) { }

  submitForm() {
    const quoteDetails = {
      paymentMethod: this.paymentMethod,
      numberOfPayments: this.numberOfPayments,
      phoneNumber: this.phoneNumber
    };
    this.dialogRef.close(quoteDetails);
  }
}
