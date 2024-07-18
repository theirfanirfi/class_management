import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClassAssignmentsPage } from './class-assignments.page';

describe('ClassAssignmentsPage', () => {
  let component: ClassAssignmentsPage;
  let fixture: ComponentFixture<ClassAssignmentsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassAssignmentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
