import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateEnrolledStudentComponent } from './create-update-enrolled-student.component';

describe('CreateUpdateEnrolledStudentComponent', () => {
  let component: CreateUpdateEnrolledStudentComponent;
  let fixture: ComponentFixture<CreateUpdateEnrolledStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateEnrolledStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateEnrolledStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
