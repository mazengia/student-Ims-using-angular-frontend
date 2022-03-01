import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DepartmentService} from "../../../services/department.service";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {NzDrawerRef} from "ng-zorro-antd/drawer";
import {finalize, first} from "rxjs/operators";
import {DptService} from "../../../services/dpt.service";
import {Dpt} from "../../../model/dpt";

@Component({
  selector: 'app-create-update-student',
  templateUrl: './create-update-student.component.html',
  styleUrls: ['./create-update-student.component.sass']
})
export class CreateUpdateStudentComponent implements OnInit {
  isAddMode = true;
  loading = false;
  submitted = false;
  pageSize = 10;
  pageNumber = 1;
  dpts: Dpt[]=[];
  @Input() value: number;
  addStudentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private departmentService: DepartmentService,
    private notification: NzNotificationService,
    private dptService: DptService,
    private drawerRef: NzDrawerRef<string>
  ) {

    this.addStudentForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
      dpt: this.fb.group({
        id: [null, [Validators.required]]
      }),
      email: ['', Validators.required],
      username: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.isAddMode = !this.value;
    if (this.value) {
      this.loadDepartmentById();
    }
    this.loadDpts();
  }

  onSubmit() {
    this.submitted = true;
    if (this.addStudentForm.invalid) {
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
    this.departmentService.addDepartment(this.addStudentForm.value)
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
    for (const key in this.addStudentForm.controls) {
      if (this.addStudentForm.controls.hasOwnProperty(key)) {
        this.addStudentForm.controls[key].markAsDirty();
        this.addStudentForm.controls[key].updateValueAndValidity();
      }
    }
  }

  private loadDepartmentById() {
    this.departmentService
      .findDepartmentById(this.value)
      .pipe(first())
      .subscribe((res) => {
        if (!this.isAddMode) {
          this.addStudentForm.patchValue(res);
        }
      });
  }

  updateDepartment(): void {

    this.resetForm();
    this.departmentService
      .updateDepartment(this.value, this.addStudentForm.value)
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
  loadDpts(reset: boolean = false) {
    if (reset) {
      this.pageNumber = 1;
    }
    this.loading = true;
    this.dptService.getDpt(this.pageNumber - 1, this.pageSize).subscribe(
      res => {
        this.loading = false;
        this.dpts = res._embedded.dptDTOList;
      },
      error => {
        console.log("error = ", error)
      }
    )

  }
}
