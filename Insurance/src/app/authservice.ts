import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Authservice {
  private platformId = inject(PLATFORM_ID);

  token = signal<string | null>(null);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const savedToken = localStorage.getItem('token');
      this.token.set(savedToken);
    }
  }

  setToken(token: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', token);
    }
    this.token.set(token);
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
    this.token.set(null);
  }

  isLoggedIn() {
    return !!this.token();
  }
}
