import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ShowService, Show } from '../../services/show';

@Component({
  selector: 'app-shows',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './shows.html',
  styleUrl: './shows.css',
})
export class Shows implements OnInit {
  shows: Show[] = [];
  loading = true;

  constructor(private showService: ShowService) {}

  ngOnInit(): void {
    this.showService.getShows().subscribe({
      next: (res) => {
        this.shows = res.data; // ✅ ناخد الداتا من جوا الـ key
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching shows:', err);
        this.loading = false;
      },
    });
  }
}
