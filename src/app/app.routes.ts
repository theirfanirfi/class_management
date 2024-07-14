import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  // {
  //   path: 'class-details',
  //   loadComponent: () => import('./class-details/class-details.page').then( m => m.ClassDetailsPage)
  // },
  // {
  //   path: 'student-details',
  //   loadComponent: () => import('./student-details/student-details.page').then( m => m.StudentDetailsPage)
  // },
];
