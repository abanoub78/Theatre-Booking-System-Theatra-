import { Component } from '@angular/core';
import { About } from '../about/about';
import { Contact } from '../contact/contact';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-home',
  imports: [RouterLink, About, Contact],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
