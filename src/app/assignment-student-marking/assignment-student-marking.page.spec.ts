import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssignmentStudentMarkingPage } from './assignment-student-marking.page';

describe('AssignmentStudentMarkingPage', () => {
  let component: AssignmentStudentMarkingPage;
  let fixture: ComponentFixture<AssignmentStudentMarkingPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentStudentMarkingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
