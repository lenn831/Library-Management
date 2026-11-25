import { Routes } from '@angular/router';
import { roleGuard } from '../role.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [roleGuard],
    data: { role: 'student' },
    loadComponent: () =>
      import('./student.page').then(m => m.StudentPage),
  },
];