import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClassStudentsAssignmentsPage } from './class-students-assignments.page';

describe('ClassStudentsAssignmentsPage', () => {
  let component: ClassStudentsAssignmentsPage;
  let fixture: ComponentFixture<ClassStudentsAssignmentsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassStudentsAssignmentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
