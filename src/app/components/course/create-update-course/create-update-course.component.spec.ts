import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateUpdateCourseComponent} from './create-update-course.component';

describe('CreateUpdateCourseComponent', () => {
  let component: CreateUpdateCourseComponent;
  let fixture: ComponentFixture<CreateUpdateCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateCourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
