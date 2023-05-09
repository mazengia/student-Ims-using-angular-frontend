import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateUpdateStudentComponent} from './create-update-student.component';

describe('CreateUpdateStudentComponent', () => {
  let component: CreateUpdateStudentComponent;
  let fixture: ComponentFixture<CreateUpdateStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
