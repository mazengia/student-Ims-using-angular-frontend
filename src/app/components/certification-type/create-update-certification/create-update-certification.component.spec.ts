import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateUpdateCertificationComponent} from './create-update-certification.component';

describe('CreateUpdateProgramComponent', () => {
  let component: CreateUpdateCertificationComponent;
  let fixture: ComponentFixture<CreateUpdateCertificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateCertificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateCertificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
