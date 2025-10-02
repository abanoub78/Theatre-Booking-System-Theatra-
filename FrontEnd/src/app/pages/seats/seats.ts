import { Component, inject, OnInit } from '@angular/core';
import { SeatsService, Seat } from '../../services/seats';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-screening-seats',
  templateUrl: './seats.html',
  imports: [CommonModule],
})
export class Seats implements OnInit {
  seats: Seat[] = [];
  reservedSeats: any[] = [];
  selectedSeats: number[] = []; 
  http =inject(HttpClient);
  screening_id!: number; 
  user_id!: number; 
  constructor(private seatsService: SeatsService , private route: ActivatedRoute,  private router: Router) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
    const id = params.get('screening_id');
    if (id) {
      this.screening_id = +id;
    }
  });
  this.route.paramMap.subscribe(params => {
    const id = params.get('user_id');
    if (id) {
      this.user_id = +id;
    }
  });
    this.seatsService.getAllSeats().subscribe((data) => {
      this.seats = data;
      console.log(this.seats);

      this.seatsService.getReservedSeats().subscribe(data => {
        this.reservedSeats = data;
        console.log(this.reservedSeats);
      });
    });
  }
  isSeatReserved(seat_id: number): boolean {
    return this.reservedSeats.some(res => res.seat_id === seat_id);
  }
  toggleSeat(seat_id:number):void{
    if (this.isSeatReserved(seat_id)) return;

    if (this.isSelected(seat_id)) {
      this.selectedSeats = this.selectedSeats.filter(id => id !== seat_id);
    } else {
      this.selectedSeats.push(seat_id);
    }
  }
  isSelected(seat_id: number): boolean {
    return this.selectedSeats.includes(seat_id);
  }
  confirmSelection() {
    console.log(this.selectedSeats);
    if (this.selectedSeats.length === 0) {
      alert('please select one or more chair');
      return;
    }
    const payload = {
      screening_id: this.screening_id,
      seat_ids: this.selectedSeats,
      user_id: this.user_id
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
      }
    });
  }
}