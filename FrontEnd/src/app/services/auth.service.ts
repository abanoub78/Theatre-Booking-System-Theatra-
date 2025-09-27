import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));

  get isLoggedIn$(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  constructor(private http: HttpClient) {}

  register(user: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  }): Observable<any> {
    return this.http.post(`${environment.apiUrl}/register`, user);
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${environment.apiUrl}/login`, credentials).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
        this.loggedIn.next(true);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
  }
}
