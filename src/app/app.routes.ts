import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
    canActivate: [AuthGuard]
   
  },
  {
    path: 'assignment-student-marking',
    loadComponent: () => import('./assignment-student-marking/assignment-student-marking.page').then( m => m.AssignmentStudentMarkingPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'class-assignments',
    loadComponent: () => import('./class-assignments/class-assignments.page').then( m => m.ClassAssignmentsPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'class-students-assignments',
    loadComponent: () => import('./class-students-assignments/class-students-assignments.page').then( m => m.ClassStudentsAssignmentsPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'class-students',
    loadComponent: () => import('./class-students/class-students.page').then( m => m.ClassStudentsPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'signup',
    loadComponent: () => import('./sign-up/sign-up.page').then( m => m.SignUpPage)
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
