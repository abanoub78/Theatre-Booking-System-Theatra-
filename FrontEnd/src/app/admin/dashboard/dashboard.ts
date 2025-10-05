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
  loading = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadShows();
  }

  // 🔹 تحميل العروض
  loadShows() {
    this.loading = true;
    this.http.get<any>(`${environment.apiUrl}/shows`).subscribe({
      next: (res) => {
        this.shows = res.data ?? res;
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Error loading shows:', err);
        this.loading = false;
        alert('فشل في تحميل العروض!');
      },
    });
  }

  // 🔹 حفظ عرض جديد أو تحديث عرض موجود
  handleSave(show: any) {
    const request = show.id
      ? this.http.put(`${environment.apiUrl}/shows/${show.id}`, show)
      : this.http.post(`${environment.apiUrl}/shows`, show);

    request.subscribe({
      next: () => {
        this.loadShows();
        this.editingShow = null;
        alert(show.id ? '✅ Show updated successfully' : '✅ Show added successfully');
      },
      error: (err) => {
        console.error('❌ Error saving show:', err);
        alert('حدث خطأ أثناء الحفظ!');
      },
    });
  }

  // 🔹 تعديل عرض
  editShow(show: any) {
    this.editingShow = { ...show };
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // 🔹 حذف عرض
  deleteShow(id: number) {
    if (!confirm('هل أنت متأكد من حذف هذا العرض؟')) return;

    this.http.delete(`${environment.apiUrl}/shows/${id}`).subscribe({
      next: () => {
        this.loadShows();
        alert('🗑️ تم حذف العرض بنجاح');
      },
      error: (err) => {
        console.error('❌ Error deleting show:', err);
        alert('فشل في حذف العرض!');
      },
    });
  }
}
