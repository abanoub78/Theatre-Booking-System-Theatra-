import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const token = localStorage.getItem('token');
  const is_admin = localStorage.getItem('is_admin');

  if (is_admin === '1') {
    return true;
  } else {
    router.navigate(['/']); // يرجعه للـ Home
    return false;
  }
};
