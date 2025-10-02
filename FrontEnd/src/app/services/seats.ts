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
  private apiUrl = 'http://127.0.0.1:8000/api/seats';
  constructor(private http: HttpClient) { }
  getAllSeats(): Observable<Seat[]> {
    return this.http.get<Seat[]>(this.apiUrl);
  }
  getReservedSeats(): Observable<any[]> {
    return this.http.get<any[]>(`http://127.0.0.1:8000/api/reservations`);
  }
}