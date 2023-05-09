import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StudentEnrolComponent} from './student-enrol.component';

describe('StudentEnrolComponent', () => {
  let component: StudentEnrolComponent;
  let fixture: ComponentFixture<StudentEnrolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentEnrolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentEnrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
