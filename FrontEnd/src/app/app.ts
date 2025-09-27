import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { Header } from './pages/header/header';
import { Footer } from './pages/footer/footer';
import { Home } from './pages/home/home';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, Footer, Home],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('FrontEnd');
}

export const appConfig = {
  providers: [provideHttpClient()],
};
