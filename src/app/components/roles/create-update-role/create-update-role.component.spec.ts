import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateUpdateRoleComponent} from './create-update-role.component';

describe('CreateUpdateRoleComponent', () => {
  let component: CreateUpdateRoleComponent;
  let fixture: ComponentFixture<CreateUpdateRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUpdateRoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUpdateRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
