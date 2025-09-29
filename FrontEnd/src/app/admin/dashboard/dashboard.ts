import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ShowForm } from '../show-form/show-form';
import { ShowList } from '../show-list/show-list';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ShowForm, ShowList],
  templateUrl: '../dashboard/dashboard.html',
  styleUrl: '../dashboard/dashboard.css',
})
export class Dashboard implements OnInit {
  shows: any[] = [];
  editingShow: any = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadShows();
  }

  loadShows() {
    this.http.get<any>(`${environment.apiUrl}/shows`).subscribe({
      next: (res) => (this.shows = res.data ?? res),
      error: (err) => console.error('❌ Error loading shows:', err),
    });
  }

  handleSave(show: any) {
    if (show.id) {
      // Update
      this.http.put(`${environment.apiUrl}/shows/${show.id}`, show).subscribe({
        next: () => {
          this.loadShows();
          this.editingShow = null;
          alert('✅ Show updated successfully');
        },
      });
    } else {
      // Add
      this.http.post(`${environment.apiUrl}/shows`, show).subscribe({
        next: () => {
          this.loadShows();
          alert('✅ Show added successfully');
          this.editingShow = null; // علشان الفورم يرجع فارغ
        },
      });
    }
  }

  editShow(show: any) {
    this.editingShow = { ...show };
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  deleteShow(id: number) {
    this.http.delete(`${environment.apiUrl}/shows/${id}`).subscribe({
      next: () => this.loadShows(),
    });
  }
}
