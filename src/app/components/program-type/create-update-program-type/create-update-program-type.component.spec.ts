import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateUpdateProgramTypeComponent} from './create-update-program-type.component';

describe('CreateUpdateProgramTypeComponent', () => {
  let component: CreateUpdateProgramTypeComponent;
  let fixture: ComponentFixture<CreateUpdateProgramTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateProgramTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateProgramTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
