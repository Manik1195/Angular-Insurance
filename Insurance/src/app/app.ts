import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Route, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Authservice } from './authservice';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, RouterLinkActive, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private auth = inject(Authservice);
  constructor(private route: Router) {}
  protected readonly title = signal('Insurance');
  text: string = 'Hello';
  name: string = '';
  token = this.auth.token;
  logout() {
    this.auth.logout();
    this.route.navigateByUrl('login');
  }
}
