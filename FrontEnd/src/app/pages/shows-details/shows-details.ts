import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ShowService, Show, ShowSchedule } from '../../services/show';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shows-details',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './shows-details.html',
  styleUrl: './shows-details.css',
})
// export class ShowsDetails implements OnInit {
//   loading = true;
//   show: Show | null = null;
//   selectedSchedule: ShowSchedule | null = null;

//   constructor(private showService: ShowService, private route: ActivatedRoute) {}

//   ngOnInit(): void {
//     const id = Number(this.route.snapshot.paramMap.get('id'));

//     this.showService.getShow(id).subscribe({
//       next: (res) => {
//         this.show = res.data; // ناخد الـ data بس
//         this.loading = false;
//       },
//       error: (err) => {
//         console.error('Error fetching show:', err);
//         this.loading = false;
//       },
//     });
//   }
// }
export class ShowsDetails {
  show!: Show;
  loading = true;
  selectedSchedule: ShowSchedule | null = null;

  constructor(
    private route: ActivatedRoute,
    private showService: ShowService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.showService.getShow(id).subscribe({
      next: (res) => {
        this.show = res.data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      },
    });
  }

  bookTicket() {
    if (this.show && this.selectedSchedule) {
      this.router.navigate(['/booking', this.show.id, this.selectedSchedule.id]);
    }
  }
}
