import { Routes } from '@angular/router';
import { Register } from './auth/register/register';
import { Login } from './auth/login/login';
import { Notfound } from './pages/notfound/notfound';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { Shows } from './pages/shows/shows';
import { ShowsDetails } from './pages/shows-details/shows-details';
import { Seats } from './pages/seats/seats';
import { Dashboard } from './admin/dashboard/dashboard';
import { AuthGuard } from './auth-guard';
import { adminGuard } from './admin-guard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: About },
  { path: 'contact', component: Contact },
  { path: 'shows', component: Shows, canActivate: [AuthGuard] },
  { path: 'shows/:id', component: ShowsDetails, canActivate: [AuthGuard] },
  { path: 'booking/:screening_id/:user_id', component: Seats, canActivate: [AuthGuard] }, //mustafa
  { path: 'register', component: Register },
  { path: 'login', component: Login },
  { path: 'admin/dashboard', component: Dashboard, canActivate: [AuthGuard, adminGuard] },
  { path: '**', component: Notfound },
];
