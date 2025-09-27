import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ShowSchedule {
  id: number;
  date: string;
  time: string;
}

export interface Show {
  id: number;
  title: string;
  description: string;
  price: number;
  posterUrl: string;
  schedules: ShowSchedule[]; // هنا هتضاف المواعيد
}

@Injectable({
  providedIn: 'root',
})
export class ShowService {
  private apiUrl = 'http://127.0.0.1:8000/api/shows'; // Laravel API endpoint

  constructor(private http: HttpClient) {}

  getShows(): Observable<{ data: Show[] }> {
    return this.http.get<{ data: Show[] }>(this.apiUrl);
  }

  getShow(id: number): Observable<{ data: Show }> {
    return this.http.get<{ data: Show }>(`${this.apiUrl}/${id}`);
  }

  // getShow(id: number): Observable<Show> {
  //   return this.http.get<Show>(`${this.apiUrl}/${id}`);
  // }
}
