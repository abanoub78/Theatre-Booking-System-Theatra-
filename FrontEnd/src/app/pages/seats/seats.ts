import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Seat {
  id: number;
  number: string;
  status: 'booked' | 'available';
}

@Component({
  selector: 'app-seats',
  imports: [CommonModule],
  templateUrl: './seats.html',
  styleUrl: './seats.css',
})
export class Seats {
  seats: Seat[] = [
    { id: 1, number: 'A1', status: 'booked' },
    { id: 2, number: 'A2', status: 'available' },
    { id: 3, number: 'A3', status: 'available' },
    { id: 4, number: 'A4', status: 'booked' },
    { id: 5, number: 'B1', status: 'available' },
    { id: 6, number: 'B2', status: 'available' },
    { id: 7, number: 'B3', status: 'booked' },
    { id: 8, number: 'B4', status: 'available' },
  ];
}
