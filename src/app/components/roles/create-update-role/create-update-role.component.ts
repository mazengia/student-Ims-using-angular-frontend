import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzDrawerRef} from 'ng-zorro-antd/drawer';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {RolesService} from '../../../services/roles.service';
import {finalize, first} from 'rxjs/operators';

@Component({
  selector: 'app-create-update-role',
  templateUrl: './create-update-role.component.html',
  styleUrls: ['./create-update-role.component.scss']
})
export class CreateUpdateRoleComponent implements OnInit {
  isAddMode = true;
  loading = false;
  submitted = false;
  @Input() value: number;
  roleForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private rolesService: RolesService,
    private notification: NzNotificationService,
    private drawerRef: NzDrawerRef<string>
  ) {
    this.roleForm = this.fb.group({
      name: ['', [Validators.required, Validators.required]]
    });
  }

  ngOnInit(): void {
    this.isAddMode = !this.value;
    if (this.value) {
      this.loadRoleById();
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.roleForm.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.saveRoles();
    } else {
      this.updateRoles();
    }
  }

  saveRoles(): void {
    this.resetForm();
    this.rolesService.addRoles(this.roleForm.value)
      .pipe(finalize(() => {
        this.drawerRef.close()
      }))
      .subscribe(
        (data) => {
          this.createNotification(
            'success',
            'Role',
            'Role Successfully Created'
          );
        },
        (error) => {
          console.log('error = ', error)
          this.createNotification(
            'error',
            'Error',
            error.error.message);
        }
      );
  }

  resetForm(): void {
    for (const key in this.roleForm.controls) {
      if (this.roleForm.controls.hasOwnProperty(key)) {
        this.roleForm.controls[key].markAsDirty();
        this.roleForm.controls[key].updateValueAndValidity();
      }
    }
  }

  private loadRoleById() {
    this.rolesService
      .findRolesById(this.value)
      .pipe(first())
      .subscribe((res) => {
        if (!this.isAddMode) {
          this.roleForm.patchValue(res);
        }
      });
  }

  updateRoles(): void {

    this.resetForm();
    this.rolesService
      .updateRoles(this.value, this.roleForm.value)
      .subscribe(
        data => {
          this.createNotification(
            'success',
            'Role',
            'Role Successfully Updated'
          );
        },
        error => {
          console.log(error)
          this.createNotification(
            'error',
            'Error',
            error.message);
        }
      );
  }

  createNotification(type: string, title: string, message: string): void {
    this.notification.create(type, title, message);
  }
}
