import { Routes } from '@angular/router';
import { Register } from './auth/register/register';
import { Login } from './auth/login/login';
import { Notfound } from './pages/notfound/notfound';
import { Home } from './pages/home/home';
import { Shows } from './pages/shows/shows';
import { ShowsDetails } from './pages/shows-details/shows-details';
import { Seats } from './pages/seats/seats';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'shows', component: Shows },
  { path: 'shows/:id', component: ShowsDetails },
  { path: 'booking', component: Seats },
  { path: 'register', component: Register },
  { path: 'login', component: Login },
  { path: '**', component: Notfound },
];
