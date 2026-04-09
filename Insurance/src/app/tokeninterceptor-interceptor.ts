import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';

export const tokeninterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);

  let token: string | null = null;

  // ⭐ VERY IMPORTANT — only browser can access localStorage
  if (isPlatformBrowser(platformId)) {
    token = localStorage.getItem('token');
  }

  // ⭐ Only attach header if token exists
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(req);
};
