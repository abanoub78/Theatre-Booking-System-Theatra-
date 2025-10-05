import { Component, inject, OnInit } from '@angular/core';
import { SeatsService, Seat } from '../../services/seats';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Payment } from '../payment/payment';

//
// تمهيدًا للاستخدام
export interface BookingServiceItem {
  serviceId: number;
  name: string;
  price: number;
  quantity: number;
}
//
@Component({
  selector: 'app-screening-seats',
  templateUrl: './seats.html',
  imports: [CommonModule, Payment],
})
export class Seats implements OnInit {
  seats: Seat[] = [];
  reservedSeats: any[] = [];
  selectedSeats: number[] = [];
  http = inject(HttpClient);
  screening_id!: number;
  user_id!: number;
  showInvoice = false;

  constructor(
    private seatsService: SeatsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  //
  // الخدمات
  availableServices: BookingServiceItem[] = [
    { serviceId: 1, name: 'Drinks', price: 20, quantity: 0 },
    { serviceId: 2, name: 'Snacks', price: 50, quantity: 0 },
    { serviceId: 3, name: '3D Glasses', price: 30, quantity: 0 },
  ];
  //

  ngOnInit(): void {
    //

    const savedServices = this.seatsService.getServices();
    if (savedServices.length > 0) {
      this.availableServices.forEach((service) => {
        const saved = savedServices.find((s) => s.serviceId === service.serviceId);
        if (saved) {
          service.quantity = saved.quantity;
        }
      });
    }

    //

    this.route.paramMap.subscribe((params) => {
      const id = params.get('screening_id');
      if (id) {
        this.screening_id = +id;
      }
    });
    this.route.paramMap.subscribe((params) => {
      const id = params.get('user_id');
      if (id) {
        this.user_id = +id;
      }
    });
    this.seatsService.getAllSeats().subscribe((data) => {
      this.seats = data;
      console.log(this.seats);

      this.seatsService.getReservedSeats().subscribe((data) => {
        this.reservedSeats = data;
        console.log(this.reservedSeats);
      });
    });
  }
  pay(method: string) {
    const total = this.calculateTotal();
    if (this.selectedSeats.length === 0) {
      alert('❗ Please select at least one seat before payment.');
      return;
    }

    alert(`✅ Payment via ${method.toUpperCase()} successful!\nTotal paid: ${total} EGP`);
    this.selectedSeats = [];
    this.showInvoice = false;
  }

  //
  updateServiceQuantity(service: BookingServiceItem, change: number) {
    service.quantity += change;
    if (service.quantity < 0) service.quantity = 0;

    if (service.quantity > 0) {
      this.seatsService.addService({
        serviceId: service.serviceId,
        name: service.name,
        price: service.price,
        quantity: service.quantity,
      });
    } else {
      this.seatsService.removeService(service.serviceId);
    }
  }

  calculateTotal(): number {
    let seatsTotal = this.selectedSeats.length * 100; // لو سعر المقعد 100 مثلاً
    let servicesTotal = this.availableServices.reduce((sum, service) => {
      return sum + service.price * service.quantity;
    }, 0);
    return seatsTotal + servicesTotal;
  }

  ///

  isSeatReserved(seat_id: number): boolean {
    return this.reservedSeats.some((res) => res.seat_id === seat_id);
  }
  //   toggleSeat(seat_id:number):void{
  //     if (this.isSeatReserved(seat_id)) return;

  //     if (this.isSelected(seat_id)) {
  //       this.selectedSeats = this.selectedSeats.filter(id => id !== seat_id);
  //     } else {
  //       this.selectedSeats.push(seat_id);
  //     }

  // //
  // const index = this.selectedSeats.indexOf(seat_id);
  //     if (index === -1) {
  //       // إضافة المقعد
  //       this.selectedSeats.push(seat_id);
  //       this.seatsService.addSeat({ seat_id, price: 100 }); // عدل السعر حسب العرض
  //     } else {
  //       // إزالة المقعد
  //       this.selectedSeats.splice(index, 1);
  //       this.seatsService.removeSeat(seat_id);
  //     }
  // //

  //}

  toggleSeat(seat_id: number): void {
    if (this.isSeatReserved(seat_id)) return;

    if (this.isSelected(seat_id)) {
      this.selectedSeats = this.selectedSeats.filter((id) => id !== seat_id);
      this.seatsService.removeSeat(seat_id);
    } else {
      this.selectedSeats.push(seat_id);
      this.seatsService.addSeat({ seat_id, price: 100 });
    }
  }
  isSelected(seat_id: number): boolean {
    return this.selectedSeats.includes(seat_id);
  }
  // confirmSelection() {
  //   console.log(this.selectedSeats);
  //   if (this.selectedSeats.length === 0) {
  //     alert('please select one or more chair');
  //     return;
  //   }
  //   const payload = {
  //     screening_id: this.screening_id,
  //     seat_ids: this.selectedSeats,
  //     user_id: this.user_id,
  //   };
  //   this.http.post('http://127.0.0.1:8000/api/reservations', payload).subscribe({
  //     next: (res) => {
  //       alert(' done  ');
  //       this.selectedSeats = [];
  //       this.router.navigate(['']);
  //     },
  //     error: (err) => {
  //       alert(' error while booking ');
  //       console.error(err);
  //     },
  //   });
  // }
  handlePayment(method: string) {
    console.log(this.selectedSeats);
    console.log(`Payment done via ${method}`);

    if (this.selectedSeats.length === 0) {
      alert('please select one or more chair');
      return;
    }
    const payload = {
      screening_id: this.screening_id,
      seat_ids: this.selectedSeats,
      user_id: this.user_id,
    };
    this.http.post('http://127.0.0.1:8000/api/reservations', payload).subscribe({
      next: (res) => {
        alert(' done  ');
        this.selectedSeats = [];
        this.router.navigate(['']);
      },
      error: (err) => {
        alert(' error while booking ');
        console.error(err);
      },
    });
    alert(`🎉 Booking confirmed and paid with ${method}!`);
    // this.router.navigate(['/']); // go back home or success page
  }
}
