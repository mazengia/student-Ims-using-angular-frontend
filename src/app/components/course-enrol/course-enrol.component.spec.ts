import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseEnrolComponent } from './course-enrol.component';

describe('CourseEnrolComponent', () => {
  let component: CourseEnrolComponent;
  let fixture: ComponentFixture<CourseEnrolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseEnrolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseEnrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
