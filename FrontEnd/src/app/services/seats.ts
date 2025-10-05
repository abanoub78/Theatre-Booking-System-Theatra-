import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Seat {
  id: number;
  seat_title: string;
  seat_degree: string;
}
@Injectable({
  providedIn: 'root'
})
export class SeatsService {

constructor(private http: HttpClient) { 
    this.loadFromSession();
  }

//

  private showId: number | null = null;
  private seats: any[] = [];
  private services: any[] = [];


  // ✅ عند بدء التطبيق، حاول ترجع البيانات من sessionStorage
  private loadFromSession() {
    const saved = sessionStorage.getItem('booking');
    if (saved) {
      const data = JSON.parse(saved);
      this.showId = data.showId;
      this.seats = data.seats || [];
      this.services = data.services || [];
    }
  }

  // ✅ احفظ البيانات الحالية في sessionStorage
  private saveToSession() {
    const data: any = {
      showId: this.showId!,
      seats: this.seats,
      services: this.services
    };
    sessionStorage.setItem('booking', JSON.stringify(data));
  }

  setShow(id: number) {
    this.showId = id;
    this.saveToSession();
  }

  addSeat(seat: any) {
    this.seats.push(seat);
    this.saveToSession();
  }

  removeSeat(seat_id: number) {
    this.seats = this.seats.filter(s => s.seat_id !== seat_id);
    this.saveToSession();
  }

  addService(service: any) {
    const index = this.services.findIndex(s => s.serviceId === service.serviceId);
    if (index !== -1) {
      this.services[index].quantity += service.quantity;
    } else {
      this.services.push(service);
    }
    this.saveToSession();
  }

  getSeats(): Seat[] {
    return this.seats;
  }

  getServices(): any[] {
    return this.services;
  }

  getBookingData(): any {
    return {
      showId: this.showId!,
      seats: this.seats,
      services: this.services
    };
  }

  clearBooking() {
    this.showId = null;
    this.seats = [];
    this.services = [];
    sessionStorage.removeItem('booking');
  }

  removeService(serviceId: number) {
  this.services = this.services.filter(s => s.serviceId !== serviceId);
  this.saveToSession();
}
//


















  getAllSeats(): Observable<Seat[]> {
    return this.http.get<Seat[]>('http://127.0.0.1:8000/api/seats');
  }
  getReservedSeats(): Observable<any[]> {
    return this.http.get<any[]>(`http://127.0.0.1:8000/api/reservations`);
  }
}