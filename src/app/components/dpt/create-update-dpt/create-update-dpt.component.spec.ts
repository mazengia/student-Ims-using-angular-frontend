import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateUpdateDptComponent} from './create-update-dpt.component';

describe('CreateUpdateDptComponent', () => {
  let component: CreateUpdateDptComponent;
  let fixture: ComponentFixture<CreateUpdateDptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateDptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateDptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
