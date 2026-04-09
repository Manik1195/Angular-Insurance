import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Authservice } from './authservice';
import { isPlatformBrowser } from '@angular/common';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  // ⭐ If not browser → allow navigation (very important)
  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  const token = localStorage.getItem('token');

  if (token) {
    return true;
  }

  router.navigateByUrl('/login');
  return false;
};
