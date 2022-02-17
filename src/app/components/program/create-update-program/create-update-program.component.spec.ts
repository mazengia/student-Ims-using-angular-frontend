import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateProgramComponent } from './create-update-program.component';

describe('CreateUpdateProgramComponent', () => {
  let component: CreateUpdateProgramComponent;
  let fixture: ComponentFixture<CreateUpdateProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateProgramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
