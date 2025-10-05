import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-payment',
  imports: [CommonModule, FormsModule],
  templateUrl: './payment.html',
  styleUrl: './payment.css',
})
export class Payment {
  @Input() totalAmount: number = 0;
  @Output() onPaymentCompleted = new EventEmitter<string>();

  paymentMethod: string = 'card';
  cardNumber: string = '';
  cardHolder: string = '';
  expiry: string = '';
  cvv: string = '';

  walletNumber: string = '';
  paypalEmail: string = '';

  pay() {
    if (this.paymentMethod === 'card' && (!this.cardNumber || !this.cvv)) {
      alert('Please fill all card details.');
      return;
    }
    if (this.paymentMethod === 'wallet' && !this.walletNumber) {
      alert('Please enter wallet number.');
      return;
    }
    if (this.paymentMethod === 'paypal' && !this.paypalEmail) {
      alert('Please enter PayPal email.');
      return;
    }

    alert(`✅ Payment of ${this.totalAmount} EGP done via ${this.paymentMethod.toUpperCase()}!`);
    this.onPaymentCompleted.emit(this.paymentMethod);
  }
}
