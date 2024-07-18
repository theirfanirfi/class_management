import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'classes',
        loadComponent: () =>
          import('../tab1/tab1.page').then((m) => m.Tab1Page),
      },
      {
        path: 'classes/:id',
        loadComponent: () =>
          import('../class-students-assignments/class-students-assignments.page').then((m) => m.ClassStudentsAssignmentsPage),
      },
      {
        path: 'class_assignments/:id',
        loadComponent: () =>
          import('../class-assignments/class-assignments.page').then((m) => m.ClassAssignmentsPage),
      },
      {
        path: 'class_students/:id',
        loadComponent: () =>
          import('../class-students/class-students.page').then((m) => m.ClassStudentsPage),
      },
      {
        path: 'students',
        loadComponent: () =>
          import('../tab2/tab2.page').then((m) => m.Tab2Page),
      },
      {
        path: 'assignments',
        loadComponent: () =>
          import('../tab3/tab3.page').then((m) => m.Tab3Page),
      },

      {
        path: 'assignments/:id',
        loadComponent: () =>
          import('../assignment-student-marking/assignment-student-marking.page').then((m) => m.AssignmentStudentMarkingPage),
      },

      {
        path: 'home',
        redirectTo: '/tabs/classes',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'home',
    redirectTo: '/tabs/classes',
    pathMatch: 'full',
  },
];
