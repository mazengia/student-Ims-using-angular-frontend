import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DepartmentService} from "../../../services/department.service";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {NzDrawerRef} from "ng-zorro-antd/drawer";
import {finalize, first} from "rxjs/operators";

@Component({
  selector: 'app-create-update-department',
  templateUrl: './create-update-department.component.html',
  styleUrls: ['./create-update-department.component.sass']
})
export class CreateUpdateDepartmentComponent implements OnInit {
  isAddMode = true;
  loading = false;
  submitted = false;
  @Input() value: number;
  departmentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private departmentService: DepartmentService,
    private notification: NzNotificationService,
    private drawerRef: NzDrawerRef<string>
  ) {
    this.departmentForm = this.fb.group({
      name: ['', [Validators.required]],
      code: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.isAddMode = !this.value;
    if (this.value) {
      this.loadDepartmentById();
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.departmentForm.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.saveDepartment();
    } else {
      this.updateDepartment();
    }
  }

  saveDepartment(): void {
    this.resetForm();
    this.departmentService.addDepartment(this.departmentForm.value)
      .pipe(finalize(() => {
        this.drawerRef.close()
      }))
      .subscribe(
        (data) => {
          this.createNotification(
            'success',
            'Department',
            'Department Successfully Created'
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
    for (const key in this.departmentForm.controls) {
      if (this.departmentForm.controls.hasOwnProperty(key)) {
        this.departmentForm.controls[key].markAsDirty();
        this.departmentForm.controls[key].updateValueAndValidity();
      }
    }
  }

  private loadDepartmentById() {
    this.departmentService
      .findDepartmentById(this.value)
      .pipe(first())
      .subscribe((res) => {
        if (!this.isAddMode) {
          this.departmentForm.patchValue(res);
        }
      });
  }

  updateDepartment(): void {

    this.resetForm();
    this.departmentService
      .updateDepartment(this.value, this.departmentForm.value)
      .subscribe(
        data => {
          this.createNotification(
            'success',
            'Department',
            'Department Successfully Updated'
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
