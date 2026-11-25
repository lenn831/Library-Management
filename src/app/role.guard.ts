import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService, UserRole } from './services/auth.service';

export const roleGuard: CanActivateFn = route => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const requiredRole = route.data['role'] as UserRole | undefined;

  if (!auth.isLoggedIn()) {
    return router.parseUrl('/login-page');
  }

  if (!requiredRole || auth.getRole() === requiredRole) {
    return true;
  }

  return router.parseUrl(
    auth.getRole() === 'student' ? '/student' : '/tabs/tab1'
  );
};