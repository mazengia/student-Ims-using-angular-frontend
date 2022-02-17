import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DptComponent } from './dpt.component';

describe('DptComponent', () => {
  let component: DptComponent;
  let fixture: ComponentFixture<DptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
