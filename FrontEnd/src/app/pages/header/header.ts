import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class Header implements OnInit {
  isLoggedIn = false;
  isAdmin = false;
  username = '';

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit() {
    this.auth.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;

      if (status) {
        const user = this.auth.getUser();
        this.username = user.username;
        this.isAdmin = user.isAdmin;
      } else {
        this.username = '';
        this.isAdmin = false;
      }
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
