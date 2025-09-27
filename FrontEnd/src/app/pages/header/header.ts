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

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit() {
    this.auth.isLoggedIn$.subscribe((status: boolean) => {
      this.isLoggedIn = status;
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
