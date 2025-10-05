import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  schedules: ShowSchedule[];
}

@Injectable({
  providedIn: 'root',
})
export class ShowService {
  private apiUrl = 'http://127.0.0.1:8000/api/shows';

  constructor(private http: HttpClient) {}

  getShows(): Observable<{ data: Show[] }> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    });

    return this.http.get<{ data: Show[] }>(this.apiUrl, { headers });
  }

  getShow(id: number): Observable<{ data: Show }> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    });

    return this.http.get<{ data: Show }>(`${this.apiUrl}/${id}`, { headers });
  }
}
