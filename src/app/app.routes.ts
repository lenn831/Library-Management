import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { roleGuard } from './role.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login-page',
    pathMatch: 'full',
  },
  {
    path: 'login-page',
    loadComponent: () =>
      import('./login-page/login-page.page')
        .then(m => m.LoginPagePage),
  },
  {
    path: 'student',
    loadChildren: () =>
      import('./student/student.routes')
        .then(m => m.routes),
  },
  {
    path: 'tabs',
    canActivate: [authGuard, roleGuard],
    data: { role: 'admin' },
    loadChildren: () =>
      import('./tabs/tabs.routes')
        .then(m => m.routes),
  },
  {
    path: '**',
    redirectTo: 'login-page',
  },
];