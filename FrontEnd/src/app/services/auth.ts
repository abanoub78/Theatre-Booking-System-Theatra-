// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { environment } from '../../environments/environment';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { tap } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   private loggedIn = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));

//   // 👈 getter بدل property
//   get isLoggedIn$(): Observable<boolean> {
//     return this.loggedIn.asObservable();
//   }

//   constructor(private http: HttpClient) {}

//   login(data: { email: string; password: string }): Observable<any> {
//     return this.http.post(`${environment.apiUrl}/login`, data).pipe(
//       tap((res: any) => {
//         localStorage.setItem('token', res.token);
//         this.loggedIn.next(true);
//       })
//     );
//   }

//   logout() {
//     localStorage.removeItem('token');
//     this.loggedIn.next(false);
//   }
//   logouppppt() {
//     localStorage.removeItem('token');
//     this.loggedIn.next(false);
//   }
// }
