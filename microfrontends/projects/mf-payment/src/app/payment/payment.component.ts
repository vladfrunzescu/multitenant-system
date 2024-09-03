import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent {
  cardName: string = '';
  cardNumber: string = '';
  expiryDate: string = '';
  cvv: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    if (this.isFormValid()) {
      console.log('Payment Details:', {
        cardName: this.cardName,
        cardNumber: this.cardNumber,
        expiryDate: this.expiryDate,
        cvv: this.cvv,
      });

      alert('Payment successful!');
    }
  }

  private isFormValid(): boolean {
    return (
      this.cardName.trim().length > 0 &&
      this.cardNumber.match(/^\d{16}$/) !== null &&
      this.expiryDate.match(/(0[1-9]|1[0-2])\/(\d{2})/) !== null &&
      this.cvv.match(/^\d{3}$/) !== null
    );
  }
}
